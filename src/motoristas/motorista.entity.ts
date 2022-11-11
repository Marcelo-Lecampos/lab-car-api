import { Exclude } from 'class-transformer';
import {
  Contains,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { isAgeCheck } from 'src/commons/decorators/isAgeCheck';
import { isCpfCheck } from 'src/commons/decorators/isCpfCheck';
import { ApiProperty } from '@nestjs/swagger';

export class Motorista {
  @ApiProperty()
  id: string;

  @IsNotEmpty()
  @MaxLength(50)
  @ApiProperty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Contains('/')
  @NotContains('-')
  @MinLength(10)
  @isAgeCheck()
  @ApiProperty()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  // @isCpfCheck()
  @ApiProperty()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  placa: string;

  @IsNotEmpty()
  @ApiProperty()
  modelo: string;

  @ApiProperty()
  bloqueado: boolean;

  @ApiProperty()
  viagens: any[];
}
