import { NestResponse } from '../core/http/nest-response';
import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Post,
  Query,
  Param,
  ConflictException,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ViagemService } from './viagens.service';
import { Viagem } from './viagens.entity';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist';

@Controller('viagens')
@ApiTags('viagens')
export class ViagemController {
  constructor(private service: ViagemService) {}

  @ApiQuery({
    name: 'motoristaID',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'motoristaID',
    required: false,
    type: Number,
  })
  @Get()
  @ApiOperation({
    summary: 'Busca uma viagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca uma viagem',
  })
  public async findViagens(
    @Query('motoristaID') motoristaID,
    @Query('distancia') distancia,
  ) {
    return await this.service.findViagens(motoristaID, distancia);
  }

  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
  })
  @Get(':id')
  @ApiOperation({
    summary: 'Busca uma viagem por id',
  })
  @ApiResponse({
    status: 200,
    description: 'Busca uma viagem por id',
  })
  public async getViagemById(@Param('id') id: string): Promise<NestResponse> {
    const viagem = await this.service.searchById(id);
    if (viagem) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `viagens/${viagem.id}` })
        .withBody(viagem)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Id is not found',
    });
  }

  @Post('passageiroID')
  @ApiOperation({
    summary: 'Cria uma viagem usando id do passageiro',
  })
  @ApiResponse({
    status: 200,
    description: 'Cria uma viagem usando id do passageiro',
  })
  public async createViagem(@Body() viagem: Viagem): Promise<NestResponse> {
    const ViagemCriado = await this.service.createViagem(viagem);
    if (ViagemCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({ Location: `viagens/${ViagemCriado.viagemBody}` })
        .withBody(ViagemCriado)
        .build();
    }
    throw new ConflictException({
      statusCode: 409,
      message: 'Operação invalida.',
    });
  }

  @ApiQuery({
    name: 'motoristaID',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'viagemID',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'changeStatus',
    required: false,
    type: Number,
  })
  @Patch('adicionar/')
  @ApiOperation({
    summary: 'Adiciona ao passageiro e ao motorista uma viagem',
  })
  @ApiResponse({
    status: 200,
    description: 'Adiciona ao passageiro e ao motorista uma viagem',
  })
  public async updateViagemStatus(
    @Query('motoristaID') motoristaID,
    @Query('viagemID') viagemID,
    @Query('changeStatus') changeStatus,
  ): Promise<any> {
    const statusChange = await this.service.updateViagemStatus(
      motoristaID,
      viagemID,
      changeStatus,
    );
    if (statusChange) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `viagens/${changeStatus}` })
        .withBody(statusChange)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Status já foi alterado e não pode ser mais alterado',
    });
  }
}
