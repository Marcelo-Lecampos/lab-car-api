import { Injectable } from '@nestjs/common';
@Injectable()

/*
criar um lógica que randomiza um número inteiro de 1 a 10 e atribuir a uma const chamada kmRandom;
*/
export class Distance {
  public distance(km: number) {
    const kmRandom = Math.floor(Math.random() * 10) + 1;
    if (km < kmRandom) {
      return true;
    } else {
      return false;
    }
  }
}
