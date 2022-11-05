import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { Passageiro } from './passageiro.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PassageiroService {
  constructor(private database: PassageiroDB) {}

  public async createPassageiro(passageiro: Passageiro): Promise<Passageiro> {
    const allPassageiros = await this.database.getPassageiros();

    const CPFexist = allPassageiros.find(
      (findPassageiro) => findPassageiro.cpf === passageiro.cpf,
    );
    if (CPFexist) {
      return null;
    }
    passageiro.id = uuidv4();
    await this.database.writePassageiro(passageiro);
    return passageiro;
  }

  public async findPassageiros(page, size, name) {
    const startPage = page < 1 ? 1 : page;
    const passageiros = await this.database.getPassageiros();
    const PassageiroName = name ? name : '';

    if (PassageiroName) {
      const PassageirosSearch = passageiros.filter((passageiro) =>
        passageiro.nome.toUpperCase().includes(PassageiroName.toUpperCase()),
      );
      return PassageirosSearch;
    }
    return passageiros.slice((startPage - 1) * size, startPage * size);
  }

  public async searchCpf(cpf: string): Promise<Passageiro> {
    const passageiros = await this.database.getPassageiros();
    const passageiro = passageiros.find((passageiro) => passageiro.cpf === cpf);
    if (passageiro) {
      return passageiro;
    } else {
      null;
    }
  }
  public async updatePassageiro(
    cpf: string,
    passageiro: Passageiro,
  ): Promise<Passageiro> | null {
    const passageiros = await this.database.getPassageiros();
    const passageiroCPF = passageiros.find(
      (passageiroFind) => passageiroFind.cpf === cpf,
    );
    const cpfPass = passageiro.cpf === cpf;
    const cpfExist = passageiros.find(
      (passageiroFind) => passageiroFind.cpf === passageiro.cpf,
    );
    if (!!passageiroCPF && (!!cpfPass || !cpfExist)) {
      const passageiroIndex = passageiros.indexOf(passageiroCPF);
      passageiros[passageiroIndex] = passageiro;
      await this.database.writePassageiros(passageiros);
      return passageiro;
    } else if (passageiroCPF) {
      return null;
    } else {
      return null;
    }
  }
}
