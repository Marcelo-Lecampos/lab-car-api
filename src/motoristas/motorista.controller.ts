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
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';

@Controller('motoristas')
@ApiTags('motoristas')
export class MotoristaController {
  constructor(private service: MotoristaService) {} // criar MotoristaService
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'size',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
  })
  @Get()
  @ApiOperation({
    summary: 'Retorna uma lista de motorista',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma lista de motorista',
  })
  public async findMotoristas(
    @Query('page') page = 1,
    @Query('size') size = 20,
    @Query('name') name,
  ) {
    return await this.service.findMotoristas(page, size, name);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo motorista',
  })
  @ApiResponse({
    status: 200,
    description: 'Cria um novo motorista',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe este CPF cadastrado',
  })
  public async createMotorista(
    @Body() motorista: Motorista,
  ): Promise<NestResponse> {
    const motoristaCriado = await this.service.createMotorista(motorista);
    if (motoristaCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({
          Location: `motoristas/${motoristaCriado.motorista.nome}`,
        })
        .withBody(motoristaCriado)
        .build();
    }
    throw new ConflictException({
      statusCode: 409,
      message: 'Já existe este CPF cadastrado',
    });
  }

  @ApiParam({
    name: 'cpf',
    required: true,
    type: String,
  })
  @Get(':cpf')
  @ApiOperation({
    summary: 'Busca um motorista pelo cpf',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca um motorista pelo cpf',
  })
  @ApiResponse({
    status: 409,
    description: 'Motorista não encontrado',
  })
  public async getMotoristaPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motorista = await this.service.searchCpf(cpf);
    if (motorista) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `motoristas/${motorista}` })
        .withBody(motorista)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Motorista não encontrado',
      });
    }
  }

  @ApiParam({
    name: 'cpf',
    required: true,
    type: String,
  })
  @Put(':cpf')
  @ApiOperation({
    summary: 'Atualiza um motorista pelo cpf',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualiza um motorista pelo cpf',
  })
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
        .withHeaders({
          Location: `motoristas/${motoristaAtualizado.motorista}`,
        })
        .withBody(motoristaAtualizado)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'CPF invalido',
    });
  }

  @ApiParam({
    name: 'cpf',
    required: true,
    type: String,
  })
  @Patch('bloquear/:cpf')
  @ApiOperation({
    summary:
      'Através do cpf altera o status do motorista para bloqueado/desbloqueado',
  })
  @ApiResponse({
    status: 200,
    description:
      'Através do cpf altera o status do motorista para bloqueado/desbloqueado',
  })
  @ApiResponse({
    status: 409,
    description: 'Motorista não encontrado',
  })
  public async bloquearMotorista(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const motoristaBloqueado = await this.service.bloquearMotorista(cpf);
    if (motoristaBloqueado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `motoristas/${motoristaBloqueado.motorista}` })
        .withBody(motoristaBloqueado)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Motorista não encontrado',
      });
    }
  }

  @ApiParam({
    name: 'cpf',
    required: true,
    type: String,
  })
  @Delete(':cpf')
  @ApiOperation({
    summary: 'Busca pelo cpf um motorista e o deleta',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca pelo cpf um motorista e o deleta',
  })
  @ApiResponse({
    status: 409,
    description:
      'Operação não permitida pois o motorista possui viagens ou motorista não encontrado',
  })
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
        message:
          'Operação não permitida pois o motorista possui viagens ou motorista não encontrado',
      });
    }
  }
}
