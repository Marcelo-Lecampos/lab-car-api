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

export class Motorista {
  id: string;

  @IsNotEmpty()
  @MaxLength(50)
  nome: string;

  @IsString()
  @IsNotEmpty()
  @Contains('/')
  @NotContains('-')
  @MinLength(10)
  @isAgeCheck()
  dataNascimento: Date;

  @IsNotEmpty()
  @IsString()
  // @isCpfCheck()
  cpf: string;
  @IsNotEmpty()
  @IsString()
  placa: string;
  @IsNotEmpty()
  modelo: string;

  bloqueado: boolean;

  viagens: any[];
}
