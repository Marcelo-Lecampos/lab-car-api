import {
  Contains,
  IsNotEmpty,
  isObject,
  IsString,
  MaxLength,
  MinLength,
  NotContains,
  IsObject,
} from 'class-validator';
import { isAgeCheck } from 'src/commons/decorators/isAgeCheck';
import { isCpfCheck } from 'src/commons/decorators/isCpfCheck';
import { ApiProperty } from '@nestjs/swagger';
export class Passageiro {
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

  //criar rua com um objeto de strings
  @ApiProperty()
  @IsObject()
  endereço: {
    rua: string;
    numero: number;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };

  @ApiProperty()
  viagens: any[];
}
