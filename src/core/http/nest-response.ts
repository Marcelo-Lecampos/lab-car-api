export class NestResponse {
  status: number;
  headers: any;
  body: any;

  constructor(response: NestResponse) {
    Object.assign(this, response);
    console.log(this); // this aqui é o objeto que está sendo instanciado e response é o objeto que está sendo passado como parâmetro
  }
}
