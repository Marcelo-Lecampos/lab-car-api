import { Injectable } from '@nestjs/common';
import { CpfValidador } from './cpf-validador';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';

@Injectable()
@ValidatorConstraint()
export class CpfValidadorConstraint implements ValidatorConstraintInterface {
  constructor(private cpfValidador: CpfValidador) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return this.cpfValidador.cpf(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'CPF não é valido';
  }
}
export function isCpfCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: CpfValidadorConstraint,
    });
  };
}
