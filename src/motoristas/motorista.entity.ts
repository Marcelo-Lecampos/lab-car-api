import {
  Contains,
  isBoolean,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { isAgeCheck } from 'src/utils/isAgeCheck';
import { isCpfCheck } from 'src/utils/isCpfCheck';

// ToDO: Falta testar e implementar os Decorators;

export class Motorista {
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
}
