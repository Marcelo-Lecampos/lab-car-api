import { Module } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { ViagemDB } from 'src/database/viagemDB/viagemDB';
import { MotoristaDB } from 'src/database/motoristaDB/motoristaDB';
import { ViagemController } from './viagens.controller';
import { ViagemService } from './viagens.service';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService, ViagemDB, PassageiroDB, MotoristaDB],
})
export class ViagemModule {}
