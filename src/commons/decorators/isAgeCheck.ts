import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidatorConstraint,
} from 'class-validator';
import { AgeValidator } from '../../utils/ageValidator';

@Injectable()
@ValidatorConstraint()
export class AgeValidateConstraint implements ValidatorConstraintInterface {
  constructor(private ageValidador: AgeValidator) {}
  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return this.ageValidador.date(value);
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return 'Idade mínima de 18 anos é necessária';
  }
}
export function isAgeCheck(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: AgeValidateConstraint,
    });
  };
}
