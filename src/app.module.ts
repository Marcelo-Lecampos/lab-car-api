import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
// import { MotoristaDB } from './database/motoristaDB/motoristaDB';
import { MotoristaModule } from './motoristas/motorista.module';
import { AgeValidator } from './utils/ageValidator';
import { CpfValidador } from './utils/cpf-validador';
import { AgeValidateConstraint } from './commons/decorators/isAgeCheck';
import { CpfValidadorConstraint } from './commons/decorators/isCpfCheck';
import { PassageiroModule } from './passageiros/passageiro.module';
import { ViagemModule } from './viagens/viagens.module';

@Module({
  imports: [MotoristaModule, PassageiroModule, ViagemModule],
  controllers: [],
  providers: [
    // MotoristaDB,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    CpfValidador,
    CpfValidadorConstraint,
    AgeValidator,
    AgeValidateConstraint,
  ],
})
export class AppModule {}
