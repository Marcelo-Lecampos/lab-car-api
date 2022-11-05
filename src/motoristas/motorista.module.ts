import { Module } from '@nestjs/common';
import { MotoristaDB } from 'src/database/motoristaDB/motoristaDB';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';

@Module({
  controllers: [MotoristaController],
  providers: [MotoristaService, MotoristaDB],
})
export class MotoristaModule {}
