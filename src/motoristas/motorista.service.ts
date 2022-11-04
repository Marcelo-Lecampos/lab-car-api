import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Database } from 'src/database/motoristaDB/dataBase';
import { Motorista } from './motorista.entity';

@Injectable()
export class MotoristaService {
  constructor(private database: Database) {}

  public async createMotorista(motorista: Motorista): Promise<Motorista> {
    const allMotoristas = await this.database.getMotoristas();

    const CPFexist = allMotoristas.find(
      (findMotorista) => findMotorista.cpf === motorista.cpf,
    );
    if (CPFexist) {
      return null;
    }
    motorista.bloqueado = false;
    await this.database.writeMotorista(motorista);
    return motorista;
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

  public async searchCpf(cpf: string): Promise<Motorista> {
    const motoristas = await this.database.getMotoristas();
    const motorista = motoristas.find((motorista) => motorista.cpf === cpf);
    if (motorista) {
      return motorista;
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
      await this.database.writeMotoristas(motoristas);
      return motorista;
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
      return motoristaCPF;
    } else {
      throw new NotFoundException({
        message: 'Driver not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}
