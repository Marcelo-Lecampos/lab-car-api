import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/database';
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
      throw new ConflictException({
        statusCode: 409,
        message: 'Já existe este CPF cadastrado',
      });
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

  public async searchByCpf(cpf: string): Promise<Motorista> {
    const motoristas = await this.database.getMotoristas();
    const motorista = motoristas.find((motorista) => motorista.cpf === cpf);
    if (motorista) {
      return motorista;
    } else {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Driver not found',
      });
    }
  }
}
