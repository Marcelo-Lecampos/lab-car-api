import { NestResponse } from './../core/http/nest-response';
import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Query,
  Param,
  Put,
  Patch,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Passageiro } from './passageiro.entity';
import { PassageiroService } from './passageiro.service';

@Controller('passageiros')
export class PassageiroController {
  constructor(private service: PassageiroService) {} // criar PassageiroService

  @Get()
  public async findPassageiros(
    @Query('page') page = 1,
    @Query('size') size = 20,
    @Query('name') name,
  ) {
    return await this.service.findPassageiros(page, size, name);
  }

  @Post()
  public async createPassageiro(
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroCriado = await this.service.createPassageiro(passageiro);
    if (passageiroCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({ Location: `passageiros/${passageiroCriado.nome}` })
        .withBody(passageiroCriado)
        .build();
    }
    throw new ConflictException({
      statusCode: 409,
      message: 'Já existe este CPF cadastrado',
    });
  }

  @Get(':cpf')
  public async getPassageiroPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const passageiro = await this.service.searchCpf(cpf);
    if (passageiro) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `passageiros/${passageiro.cpf}` })
        .withBody(passageiro)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Passageiro não encontrado',
      });
    }
  }
  @Put(':cpf')
  public async updatePassageiro(
    @Param('cpf') cpf: string,
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroAtualizado = await this.service.updatePassageiro(
      cpf,
      passageiro,
    );
    if (passageiroAtualizado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `passageiros/${passageiroAtualizado.cpf}` })
        .withBody(passageiroAtualizado)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'CPF invalido',
    });
  }
}
