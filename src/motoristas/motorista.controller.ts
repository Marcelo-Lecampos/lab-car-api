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
  Delete,
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
    if (motoristaCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({ Location: `motoristas/${motoristaCriado.nome}` })
        .withBody(motoristaCriado)
        .build();
    }
    throw new ConflictException({
      statusCode: 409,
      message: 'Já existe este CPF cadastrado',
    });
  }

  @Get(':cpf')
  public async getMotoristaPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motorista = await this.service.searchCpf(cpf);
    if (motorista) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `motoristas/${motorista.cpf}` })
        .withBody(motorista)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Motorista não encontrado',
      });
    }
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
    if (motoristaAtualizado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `motoristas/${motoristaAtualizado.cpf}` })
        .withBody(motoristaAtualizado)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'CPF invalido',
    });
  }

  @Patch('bloquear/:cpf')
  public async bloquearMotorista(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motoristaBloqueado = await this.service.bloquearMotorista(cpf);
    if (motoristaBloqueado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `motoristas/${motoristaBloqueado.cpf}` })
        .withBody(motoristaBloqueado)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Motorista não encontrado',
      });
    }
  }
  @Delete(':cpf')
  public async deleteMotorista(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motoristaDeletado = await this.service.deleteMotorista(cpf);
    if (motoristaDeletado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({
          Location: `motoristas/${motoristaDeletado.motoristaDeletado.cpf}`,
        })
        .withBody(motoristaDeletado)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Operação não permitida ou motorista não encontrado',
      });
    }
  }
}
