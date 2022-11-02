import {
  isBoolean,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsString,
  MaxLength,
} from 'class-validator';
import { isCpfCheck } from 'src/utils/isCpfCheck';

// ToDO: Falta testar e implementar os Decorators;

export class Motorista {
  @IsNotEmpty()
  @MaxLength(50)
  nome: string;

  @IsString()
  @IsNotEmpty()
  dataNascimento: Date; // ToDo: fazer uma validação para verificar se têm mais de 18 anos
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
