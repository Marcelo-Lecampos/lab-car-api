import { Module } from '@nestjs/common';
import { Database } from 'src/database/database';
import { MotoristaController } from './motorista.controller';
import { MotoristaService } from './motorista.service';

@Module({
  controllers: [MotoristaController],
  providers: [MotoristaService, Database],
})
export class MotoristaModule {}
