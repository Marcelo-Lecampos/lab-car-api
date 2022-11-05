import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Viagem } from 'src/viagens/viagens.entity';

@Injectable()
export class ViagemDB {
  private FILENAME = 'src/database/passageiroDB/passageiros.json';

  public async getViagens(): Promise<Viagem[]> {
    const viagensInFile = await readFile(this.FILENAME, 'utf-8');
    const viagens = JSON.parse(viagensInFile);
    return viagens;
  }

  public async writeViagem(viagem: Viagem) {
    let viagens: Viagem[] = await this.getViagens();
    if (!viagens) {
      viagens = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...viagens, viagem]));
  }

  public async writeViagens(viagens: Viagem[]) {
    await writeFile(this.FILENAME, JSON.stringify(viagens));
  }
}
