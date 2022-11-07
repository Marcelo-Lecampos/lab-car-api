import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ViagemStatus } from './viagens.enum';

export class Viagem {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  origem: string;

  @IsString()
  @IsNotEmpty()
  destino: string;

  ViagemStatus: ViagemStatus;

  @Exclude()
  distancia: number;
}
