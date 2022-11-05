import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Passageiro } from 'src/passageiros/passageiro.entity';

@Injectable()
export class PassageiroDB {
  private FILENAME = 'src/database/passageiroDB/passageiros.json';

  public async getPassageiros(): Promise<Passageiro[]> {
    const passageirosInFile = await readFile(this.FILENAME, 'utf-8');
    const passageiros = JSON.parse(passageirosInFile);
    return passageiros;
  }

  public async writePassageiro(passageiro: Passageiro) {
    let passageiros: Passageiro[] = await this.getPassageiros();
    if (!passageiros) {
      passageiros = [];
    }
    await writeFile(
      this.FILENAME,
      JSON.stringify([...passageiros, passageiro]),
    );
  }

  public async writePassageiros(passageiros: Passageiro[]) {
    await writeFile(this.FILENAME, JSON.stringify(passageiros));
  }
}
