import { Injectable } from '@nestjs/common';
import { writeFile, readFile } from 'fs/promises';
import { Motorista } from 'src/motoristas/motorista.entity';

@Injectable()
export class MotoristaDB {
  private FILENAME = 'src/database/motoristaDB/motoristas.json';

  public async getMotoristas(): Promise<Motorista[]> {
    const motoristasInFile = await readFile(this.FILENAME, 'utf-8');
    const motorista = JSON.parse(motoristasInFile);
    return motorista;
  }

  public async writeMotorista(motorista: Motorista) {
    let motoristas: Motorista[] = await this.getMotoristas();
    if (!motoristas) {
      motoristas = [];
    }
    await writeFile(this.FILENAME, JSON.stringify([...motoristas, motorista]));
  }

  public async writeMotoristas(motoristas: Motorista[]) {
    await writeFile(this.FILENAME, JSON.stringify(motoristas));
  }
}
