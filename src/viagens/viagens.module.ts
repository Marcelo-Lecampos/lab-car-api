import { Module } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { ViagemDB } from 'src/database/viagemDB/viagemDB';
import { ViagemController } from './viagens.controller';
import { ViagemService } from './viagens.service';

@Module({
  controllers: [ViagemController],
  providers: [ViagemService, ViagemDB, PassageiroDB],
})
export class ViagemModule {}
