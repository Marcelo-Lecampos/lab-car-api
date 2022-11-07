import { HttpStatus, Injectable } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { ViagemDB } from 'src/database/viagemDB/viagemDB';
import { MotoristaDB } from 'src/database/motoristaDB/motoristaDB';
import { Viagem } from './viagens.entity';
import { ViagemStatus } from './viagens.enum';

@Injectable()
export class ViagemService {
  constructor(
    private viagemDB: ViagemDB,
    private passageiroDB: PassageiroDB,
    private motoristaDB: MotoristaDB,
  ) {}

  public async createViagem(viagem: Viagem): Promise<Viagem> {
    const viagemBody = viagem;
    const viagensDB = await this.viagemDB.getViagens();
    const viagensSameID = viagensDB.filter(
      (viagemDB) => viagemDB.id === viagemBody.id,
    ); // verifica se o id já existe
    const passageirosDB = await this.passageiroDB.getPassageiros();
    const passageirosCheckID = passageirosDB.find(
      (passageiro) => passageiro.id === viagemBody.id,
    );
    // Se houver ViagemStatus.CREATED || ViagemStatus.ACCEPTED no viagensDB && passageirosCheckID,então escreva no DB, caso seja false, retorne null
    const viagensCheckStatus = viagensSameID.filter(
      (viagemDB) =>
        viagemDB.ViagemStatus === ViagemStatus.CREATED ||
        viagemDB.ViagemStatus === ViagemStatus.ACCEPTED,
    );
    if (viagensCheckStatus.length === 0 && passageirosCheckID) {
      viagemBody.ViagemStatus = ViagemStatus.CREATED;
      viagemBody.distancia = Math.floor(Math.random() * 10) + 1;
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

  public async findViagens(
    motoristaID: string,
    distancia: number,
  ): Promise<Viagem[]> {
    const distanciaQuery = distancia || '';
    const motoristaIDQuery = motoristaID || '';
    const viagensDB = await this.viagemDB.getViagens();

    if (distanciaQuery && motoristaIDQuery) {
      const distanciaFiltro = viagensDB.filter(
        (viagem) =>
          Math.round(Math.abs(viagem.distancia)) <= Number(distanciaQuery),
      );
      console.log('distanciaFiltro', distanciaFiltro);
      return distanciaFiltro;
    }

    return viagensDB;
  }

  public async updateViagemStatus(
    // toDO: testar
    motoristaID: string,
    viagemID: string,
    changeStatus: number,
  ) {
    const viagemDB = await this.viagemDB.getViagens();
    const motoristaDB = await this.motoristaDB.getMotoristas();
    const passageiroDB = await this.passageiroDB.getPassageiros();

    const findViagem = viagemDB.find((viagem) => viagem.id === viagemID);

    const findMotorista = motoristaDB.find(
      (motorista) => motorista.id === motoristaID,
    );
    const findPassageiro = passageiroDB.find(
      (viagem) => viagem.id === viagemID,
    );

    const passageiroCheckLength = findPassageiro.viagens.length === 0;
    const motoristaCheckLength = findMotorista.viagens.length === 0;

    const atualizarStatus = (findViagem.ViagemStatus = Number(changeStatus));
    if (
      motoristaCheckLength &&
      passageiroCheckLength &&
      findViagem &&
      atualizarStatus <= 2
    ) {
      if (atualizarStatus === 1) {
        findMotorista.viagens.push(findViagem);
        findPassageiro.viagens.push(findViagem);

        const motoristaIndex = motoristaDB.indexOf(findMotorista);
        motoristaDB[motoristaIndex] = findMotorista;
        await this.motoristaDB.writeMotoristas(motoristaDB);

        const passageiroIndex = passageiroDB.indexOf(findPassageiro);
        passageiroDB[passageiroIndex] = findPassageiro;
        await this.passageiroDB.writePassageiros(passageiroDB);
        const ViagemAtualizado = findViagem;
        const success = {
          message: 'Status da Viagem atualizado com sucesso',
          statusCode: HttpStatus.OK,
          ViagemAtualizado,
        };

        return success;
      }
      return findViagem;
    }

    return null;
  }
}
