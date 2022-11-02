import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './core/http/transform-response-interceptor';
import { Database } from './database/dataBase';
import { MotoristaModule } from './motoristas/motorista.module';
import { AgeValidator } from './utils/ageValidator';
import { CpfValidador } from './utils/cpf-validador';
import { AgeValidateConstraint } from './utils/isAgeCheck';
import { CpfValidadorConstraint } from './utils/isCpfCheck';

@Module({
  imports: [MotoristaModule],
  controllers: [],
  providers: [
    Database,
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
