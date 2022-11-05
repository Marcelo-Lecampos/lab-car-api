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
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { ViagemService } from './viagens.service';
import { Viagem } from './viagens.entity';

@Controller('viagens')
export class ViagemController {
  constructor(private service: ViagemService) {}

  @Get()
  public async findViagens(
    @Query('page') page = 1,
    @Query('size') size = 10,
    @Query('name') name,
  ) {
    return await this.service.findViagens(page, size, name);
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

  @Post()
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

  @Put(':id')
  public async updateViagem(
    @Param('id') id: string,
    @Body() viagem: Viagem,
  ): Promise<NestResponse> {
    const Update = await this.service.updateViagem(id, viagem);
    if (Update) {
      return new NestResponseBuilder()
        .withStatus(HttpStatus.OK)
        .withHeaders({ Location: `viagens/${Update.id}` })
        .withBody(Update)
        .build();
    }
    throw new NotFoundException({
      statusCode: HttpStatus.NOT_FOUND,
      message: 'Id is not found',
    });
  }
}
