import { Injectable } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { ViagemDB } from 'src/database/viagemDB/viagemDB';
import { Viagem } from './viagens.entity';
import { ViagemStatus } from './viagens.enum';

@Injectable()
export class ViagemService {
  constructor(private viagemDB: ViagemDB, private passageiroDB: PassageiroDB) {}

  public async createViagem(viagem: Viagem): Promise<Viagem> {
    const viagemBody = viagem;
    const viagensDB = await this.viagemDB.getViagens();
    const viagensCheckID = viagensDB.filter(
      (viagemDB) => viagemDB.id === viagemBody.id,
    );
    const passageirosDB = await this.passageiroDB.getPassageiros();
    const passageirosCheckID = passageirosDB.find(
      (passageiro) => passageiro.id === viagemBody.id,
    );
    // Se houver ViagemStatus.CREATED || ViagemStatus.ACCEPTED no viagensDB && passageirosCheckID,então escreva no DB, caso seja false, retorne null
    const viagensCheckStatus = viagensCheckID.filter(
      (viagemDB) =>
        viagemDB.ViagemStatus === ViagemStatus.CREATED ||
        viagemDB.ViagemStatus === ViagemStatus.ACCEPTED,
    );
    if (viagensCheckStatus.length === 0 && passageirosCheckID) {
      viagemBody.ViagemStatus = ViagemStatus.CREATED;
      await this.viagemDB.writeViagem(viagemBody);
      return viagemBody;
    } else {
      return null;
    }
  }

  public async updateViagem(id: string, viagem: Viagem) {
    const allViagens = await this.viagemDB.getViagens();
    const viagemExiste = allViagens.find((pass) => pass.id === id);
    const idPass = viagem.id === id;
    const idExist = allViagens.find((pass) => pass.id === viagem.id);
    if (!!viagemExiste && (!!idPass || !idExist)) {
      const travelIndex = allViagens.indexOf(viagemExiste);
      allViagens[travelIndex] = viagem;
      await this.viagemDB.writeViagens(allViagens);
      return viagem;
    } else if (viagemExiste) {
      return null;
    } else {
      return null;
    }
  }

  public async searchById(id: string): Promise<Viagem> {
    const viagens = await this.viagemDB.getViagens();
    const viagem = viagens.find((viagem) => viagem.id === id);
    if (viagem) {
      return viagem;
    } else {
      return null;
    }
  }

  public async findViagens(page: number, size: number, name: string) {
    const startPage = page < 1 ? 1 : page;
    const sizePage = size < 0 ? 1 : size;
    const viagemNome = name || '';
    const viagens = await this.viagemDB.getViagens();

    if (viagemNome) {
      const viagemSearch = viagens.filter((viagem) =>
        viagem.origem.toUpperCase().includes(viagemNome.toUpperCase()),
      );
      return viagemSearch;
    }

    return viagens.slice((startPage - 1) * sizePage, startPage * sizePage);
  }
}
