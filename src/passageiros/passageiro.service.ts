import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Database } from 'src/database/passageiroDB/dataBase';
import { Passageiro } from './passageiro.entity';
// import { Database } from 'src/database/motoristaDB/dataBase';
// import { Passageiro } from './passageiro.entity';

@Injectable()
export class PassageiroService {
  constructor(private database: Database) {}

  public async createPassageiro(passageiro: Passageiro): Promise<Passageiro> {
    const allPassageiros = await this.database.getPassageiros();

    const CPFexist = allPassageiros.find(
      (findPassageiro) => findPassageiro.cpf === passageiro.cpf,
    );
    if (CPFexist) {
      throw new ConflictException({
        statusCode: 409,
        message: 'Já existe este CPF cadastrado',
      });
    }
    passageiro.bloqueado = false;
    await this.database.writePassageiro(passageiro);
    return passageiro;
  }

  public async findPassageiros(page, size, name) {
    const startPage = page < 1 ? 1 : page;
    const passageiros = await this.database.getPassageiros();
    const passageiroName = name ? name : '';

    if (passageiroName) {
      const passageirosSearch = passageiros.filter((passageiro) =>
        passageiro.nome.toUpperCase().includes(passageiroName.toUpperCase()),
      );
      return passageirosSearch;
    }
    return passageiros.slice((startPage - 1) * size, startPage * size);
  }

  public async searchCpf(cpf: string): Promise<Passageiro> {
    const passageiros = await this.database.getPassageiros();
    const passageiro = passageiros.find((passageiro) => passageiro.cpf === cpf);
    if (passageiro) {
      return passageiro;
    } else {
      throw new NotFoundException({
        message: 'Driver not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
  public async updatePassageiro(cpf: string, passageiro: Passageiro) {
    const passageiros = await this.database.getPassageiros();
    const passageiroCPF = passageiros.find(
      (passageiro) => passageiro.cpf === cpf,
    );
    if (passageiroCPF) {
      const passageiroIndex = passageiros.indexOf(passageiroCPF);
      passageiros[passageiroIndex] = passageiro;
      passageiro.bloqueado = false;
      await this.database.writePassageiros(passageiros);
      return passageiro;
    } else {
      throw new NotFoundException({
        message: 'Driver not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
  public async bloquearMotorista(cpf: string) {
    const passageiros = await this.database.getPassageiros();
    const passageiroCPF = passageiros.find(
      (passageiro) => passageiro.cpf === cpf,
    );
    if (passageiroCPF) {
      const passageiroIndex = passageiros.indexOf(passageiroCPF);
      passageiros[passageiroIndex].bloqueado =
        !passageiros[passageiroIndex].bloqueado;
      await this.database.writePassageiros(passageiros);
      return passageiroCPF;
    } else {
      throw new NotFoundException({
        message: 'Driver not found',
        statusCode: HttpStatus.NOT_FOUND,
      });
    }
  }
}
