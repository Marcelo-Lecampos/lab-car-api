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
  ConflictException,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { Passageiro } from './passageiro.entity';
import { PassageiroService } from './passageiro.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger/dist';

@Controller('passageiros')
@ApiTags('passageiros')
export class PassageiroController {
  constructor(private service: PassageiroService) {} // criar PassageiroService

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
    summary: 'Retorna uma lista de passageiro',
  })
  @ApiResponse({
    status: 200,
    description: 'Retorna uma lista de passageiro',
  })
  public async findPassageiros(
    @Query('page') page = 1,
    @Query('size') size = 20,
    @Query('name') name,
  ) {
    return await this.service.findPassageiros(page, size, name);
  }

  @Post()
  @ApiOperation({
    summary: 'Cria um novo passageiro',
  })
  @ApiResponse({
    status: 200,
    description: 'Cria um novo passageiro',
  })
  @ApiResponse({
    status: 409,
    description: 'Já existe este CPF cadastrado',
  })
  public async createPassageiro(
    @Body() passageiro: Passageiro,
  ): Promise<NestResponse> {
    const passageiroCriado = await this.service.createPassageiro(passageiro);
    if (passageiroCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({ Location: `passageiros/${passageiroCriado.passageiro}` })
        .withBody(passageiroCriado)
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
    summary: 'Busca um passageiro pelo cpf',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca um passageiro pelo cpf',
  })
  @ApiResponse({
    status: 409,
    description: 'Motorista não encontrado',
  })
  public async getPassageiroPorCpf(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const passageiro = await this.service.searchCpf(cpf);
    if (passageiro) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `passageiros/${passageiro}` })
        .withBody(passageiro)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Passageiro não encontrado',
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
    summary: 'Atualiza um passageiro pelo cpf',
  })
  @ApiResponse({
    status: 200,
    description: 'Atualiza um passageiro pelo cpf',
  })
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

  @ApiParam({
    name: 'cpf',
    required: true,
    type: String,
  })
  @Delete(':cpf')
  @ApiOperation({
    summary: 'Busca pelo cpf um passageiro e o deleta',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca pelo cpf um passageiro e o deleta',
  })
  @ApiResponse({
    status: 409,
    description:
      'Operação não permitida pois o passageiro possui viagens ou passageiro não encontrado',
  })
  public async deletePassageiro(
    @Param('cpf') cpf: string,
  ): Promise<NestResponse> {
    const passageiroDeletado = await this.service.deletePassageiro(cpf);
    if (passageiroDeletado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({
          Location: `passageiros/${passageiroDeletado.passageiroDeletado.cpf}`,
        })
        .withBody(passageiroDeletado)
        .build();
    } else {
      throw new ConflictException({
        statusCode: 409,
        message: 'Operação não permitida ou passageiro não encontrado',
      });
    }
  }
}
