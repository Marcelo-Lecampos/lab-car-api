import { Module } from '@nestjs/common';
import { PassageiroDB } from 'src/database/passageiroDB/passageiroDB';
import { PassageiroController } from './passageiro.controller';
import { PassageiroService } from './passageiro.service';

@Module({
  controllers: [PassageiroController],
  providers: [PassageiroService, PassageiroDB],
})
export class PassageiroModule {}
