import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { MotoristaDB } from 'src/database/motoristaDB/motoristaDB';
import { Motorista } from './motorista.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MotoristaService {
  constructor(private database: MotoristaDB) {}

  public async createMotorista(motorista: Motorista) {
    const allMotoristas = await this.database.getMotoristas();

    const CPFexist = allMotoristas.find(
      (findMotorista) => findMotorista.cpf === motorista.cpf,
    );
    if (CPFexist) {
      return null;
    }
    motorista.bloqueado = false;
    motorista.id = uuidv4();
    motorista.viagens = [];
    await this.database.writeMotorista(motorista);
    const success = {
      message: 'Motorista Criado',
      statusCode: HttpStatus.OK,
      motorista,
    };
    return success;
  }

  public async findMotoristas(page, size, name) {
    const startPage = page < 1 ? 1 : page;
    const motoristas = await this.database.getMotoristas();
    const motoristaName = name ? name : '';

    if (motoristaName) {
      const motoristasSearch = motoristas.filter((motorista) =>
        motorista.nome.toUpperCase().includes(motoristaName.toUpperCase()),
      );
      return motoristasSearch;
    }
    return motoristas.slice((startPage - 1) * size, startPage * size);
  }

  public async searchCpf(cpf: string) {
    const motoristas = await this.database.getMotoristas();
    const motorista = motoristas.find((motorista) => motorista.cpf === cpf);
    if (motorista) {
      const success = {
        message: 'Motorista Encontrado',
        statusCode: HttpStatus.OK,
        motorista,
      };
      return success;
    } else {
      null;
    }
  }
  public async updateMotorista(cpf: string, motorista: Motorista) {
    const motoristas = await this.database.getMotoristas();
    const motoristaCPF = motoristas.find(
      (motoristaFind) => motoristaFind.cpf === cpf,
    );
    const cpfPass = motorista.cpf === cpf;
    const cpfExist = motoristas.find(
      (motoristaFind) => motoristaFind.cpf === motorista.cpf,
    );
    if (!!motoristaCPF && (!!cpfPass || !cpfExist)) {
      const motoristaIndex = motoristas.indexOf(motoristaCPF);
      motoristas[motoristaIndex] = motorista;
      motorista.bloqueado = motoristaCPF.bloqueado;
      motorista.viagens = motoristaCPF.viagens;
      motorista.id = motoristaCPF.id;
      await this.database.writeMotoristas(motoristas);
      const success = {
        message: 'Motorista Atualizado',
        statusCode: HttpStatus.OK,
        motorista,
      };
      return success;
    } else if (motoristaCPF) {
      return null;
    } else {
      return null;
    }
  }
  public async bloquearMotorista(cpf: string) {
    const motoristas = await this.database.getMotoristas();
    const motoristaCPF = motoristas.find((motorista) => motorista.cpf === cpf);
    if (motoristaCPF) {
      const motoristaIndex = motoristas.indexOf(motoristaCPF);
      motoristas[motoristaIndex].bloqueado =
        !motoristas[motoristaIndex].bloqueado;
      await this.database.writeMotoristas(motoristas);
      const motorista = motoristaCPF;
      const success = {
        message: 'Motorista Status alterado com sucesso',
        statusCode: HttpStatus.OK,
        motorista,
      };
      return success;
    } else {
      throw new NotFoundException({
        message: 'Driver not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
  public async deleteMotorista(cpf: string) {
    const motoristas = await this.database.getMotoristas();
    const motoristaDeletado = motoristas.find(
      (motorista) => motorista.cpf === cpf,
    );
    if (motoristaDeletado && motoristaDeletado.viagens.length === 0) {
      const motoristaIndex = motoristas.indexOf(motoristaDeletado);
      motoristas.splice(motoristaIndex, 1);
      await this.database.writeMotoristas(motoristas);
      const success = {
        message: 'Motorista Deletado',
        statusCode: HttpStatus.OK,
        motoristaDeletado,
      };
      return success;
    }
    return null;
  }
}
