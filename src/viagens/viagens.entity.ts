import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ViagemStatus } from './viagens.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Viagem {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  origem: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  destino: string;

  @ApiProperty()
  ViagemStatus: ViagemStatus;

  @Exclude()
  @ApiProperty()
  distancia: number;
}
