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

@Controller('viagens')
export class ViagemController {
  constructor(private service: ViagemService) {}

  @Get()
  public async findViagens(
    @Query('motoristaID') motoristaID,
    @Query('distancia') distancia,
  ) {
    return await this.service.findViagens(motoristaID, distancia);
  }

  @Get(':id')
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
  public async createViagem(@Body() viagem: Viagem): Promise<NestResponse> {
    const ViagemCriado = await this.service.createViagem(viagem);
    if (ViagemCriado) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.CREATED)
        .withHeaders({ Location: `viagens/${ViagemCriado.id}` })
        .withBody(ViagemCriado)
        .build();
    }
    throw new ConflictException({
      statusCode: 409,
      message: 'Operação invalida.',
    });
  }

  @Patch('adicionar/')
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
      message: 'Parece que ocorreu um erro',
    });
  }
}
