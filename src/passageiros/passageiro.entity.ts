import {
  Contains,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
} from 'class-validator';
import { isAgeCheck } from 'src/commons/decorators/isAgeCheck';

export class Passageiro {
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

  //criar rua com um objeto de strings
  endereço: {
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
}
