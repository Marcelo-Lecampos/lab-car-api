import { NestResponse } from '../core/http/nest-response';
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
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { PassageiroService } from './passageiro.service';
import { Passageiro } from './passageiro.entity';

@Controller('passageiros')
export class PassageiroController {
  constructor(private service: PassageiroService) {}
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
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `passageiro/${passageiroCriado.nome}` })
      .withBody(passageiroCriado)
      .build();
  }

  @Get(':cpf')
  public async getPassageiroPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const passageiro = await this.service.searchCpf(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `passageiro/${passageiro.cpf}` })
      .withBody(passageiro)
      .build();
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
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `passageiro/${passageiroAtualizado.cpf}` })
      .withBody(passageiroAtualizado)
      .build();
  }

  // @Patch(':cpf/bloquear')
  // public async bloquearMotorista(
  //   @Param('cpf') cpf: string,
  // ): Promise<NestResponse> {
  //   const motoristaBloqueado = await this.service.bloquearMotorista(cpf);
  //   return new NestResponseBuilder()
  //     .withStatus(HttpStatus.OK)
  //     .withHeaders({ Location: `passageiro/${motoristaBloqueado.cpf}` })
  //     .withBody(motoristaBloqueado)
  //     .build();
  // }
}
