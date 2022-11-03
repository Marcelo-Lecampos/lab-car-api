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
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Motorista } from './motorista.entity';
import { MotoristaService } from './motorista.service';

@Controller('motoristas')
export class MotoristaController {
  constructor(private service: MotoristaService) {} // criar MotoristaService

  @Get()
  public async findMotoristas(
    @Query('page') page = 1,
    @Query('size') size = 20,
    @Query('name') name,
  ) {
    return await this.service.findMotoristas(page, size, name);
  }

  @Post()
  public async createMotorista(
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaCriado = await this.service.createMotorista(motorista);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({ Location: `motoristas/${motoristaCriado.nome}` })
      .withBody(motoristaCriado)
      .build();
  }

  @Get(':cpf')
  public async getMotoristaPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motorista = await this.service.searchCpf(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `motoristas/${motorista.cpf}` })
      .withBody(motorista)
      .build();
  }
  @Put(':cpf')
  public async updateMotorista(
    @Param('cpf') cpf: string,
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaAtualizado = await this.service.updateMotorista(
      cpf,
      motorista,
    );
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `motoristas/${motoristaAtualizado.cpf}` })
      .withBody(motoristaAtualizado)
      .build();
  }
  // criar um pat que muda o bloqueado para true
  @Patch(':cpf/bloquear')
  public async bloquearMotorista(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motoristaBloqueado = await this.service.bloquearMotorista(cpf);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.OK)
      .withHeaders({ Location: `motoristas/${motoristaBloqueado.cpf}` })
      .withBody(motoristaBloqueado)
      .build();
  }
}
