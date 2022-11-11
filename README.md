# 🚘 LAB-CAR-API

Esté projeto foi desenvolvido no curso DevinHouse como primeiro projeto avaliativo backend.
Foram utilizados conhecimentos básicos de Rest Api typescript e nest. 

## Referência

 - [DevinHouse](https://devinhouse.tech/)
    
- [Swagger](http://127.0.0.1:3000/swagger#)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ✔ Endpoint Motorista 

### Post Cadastrar Motorista

```
POST http://localhost:3000/motoristas/

{
	"nome": "Motorista Tester",
	"dataNascimento": "2004/11/07",
	"cpf": "05031229621",
	"placa": "MNW-2234",
	"modelo": "Ford-T"
}
```
**Resultado:**
```
{
  "message": "Motorista Criado",
  "statusCode": 200,
  "motorista": {
    "nome": "Motorista Tester",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": false,
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00",
    "viagens": []
  }
}
```
### Buscar Motoristas:

```
GET: http://localhost:3000/motoristas/

```
**Resultado:**
```
[
  {
    "nome": "Motorista Tester",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": false,
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00",
    "viagens": []
  }
]
```
### Buscar Motoristas com Query:

```
GET: http://localhost:3000/motoristas/?page=1&size=5&name=Tester

```
**Resultado:**
```
[
  {
    "nome": "Motorista Tester",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": false,
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00",
    "viagens": []
  }
]
```
### Buscar motorista pelo CPF:

```
GET: http://localhost:3000/motoristas/05031229621
```

**Resultado:**
```
{
  "message": "Motorista Encontrado",
  "statusCode": 200,
  "motorista": {
    "nome": "Motorista Tester",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": false,
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00",
    "viagens": []
  }
}

```

### Atualizar Motorista Pelo CPF:

```
PUT: http://localhost:3000/motoristas/05031229621

Body: 
{
    "nome": "Motorista Tester 2",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T"
}
```

**Resultado:**
```
{
  "message": "Motorista Atualizado",
  "statusCode": 200,
  "motorista": {
    "nome": "Motorista Tester 2",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": false,
    "viagens": [],
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00"
  }
}

```

### Bloquear motoristas pelo CPF:

```
PATCH: http://localhost:3000/motoristas/bloquear/05031229621

```

**Resultado:**
```
{
  "message": "Motorista Status alterado com sucesso",
  "statusCode": 200,
  "motorista": {
    "nome": "Motorista Tester 2",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": true,
    "viagens": [],
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00"
  }
}
```
### Delete motorista pelo CPF:
```
Obs: Só pode ser deletado usuários que não possuem registros de viagens.
```

```
DELETE: http://localhost:3000/motoristas/05031229621

```

**Resultado:**
```
{
  "message": "Motorista Deletado",
  "statusCode": 200,
  "motoristaDeletado": {
    "nome": "Motorista Tester 2",
    "dataNascimento": "2004/11/07",
    "cpf": "05031229621",
    "placa": "MNW-2234",
    "modelo": "Ford-T",
    "bloqueado": true,
    "viagens": [],
    "id": "55dfbf4a-3fbe-47d5-a997-261254dcfe00"
  }
}
```

## ✔ Endpoint Passageiro 

### Post Cadastrar Passageiro

```
POST http://localhost:3000/passageiros/

Body:
{
	"nome": "Passageiro Tester",
	"dataNascimento": "2004/11/04",
	"cpf": "05031229621",
	"endereço":{
	  "rua": "Laranjas",
    "numero": 44,
    "bairro": "centro",
    "cidade": "fundo do mar",
    "estado": "oceano do meio",
    "cep": "389954"
	}
}
```
**Resultado:**
```
{
  "message": "Passageiro Criado",
  "statusCode": 201,
  "passageiro": {
    "nome": "Passageiro Tester",
    "dataNascimento": "2004/11/04",
    "cpf": "05031229621",
    "endereço": {
      "rua": "Laranjas",
      "numero": 44,
      "bairro": "centro",
      "cidade": "fundo do mar",
      "estado": "oceano do meio",
      "cep": "389954"
    },
    "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
    "viagens": []
  }
}

```
### Buscar Passageiros:

```
GET: http://localhost:3000/passageiros/

```
**Resultado:**
```
[
  {
    "nome": "Passageiro Tester",
    "dataNascimento": "2004/11/04",
    "cpf": "05031229621",
    "endereço": {
      "rua": "Laranjas",
      "numero": 44,
      "bairro": "centro",
      "cidade": "fundo do mar",
      "estado": "oceano do meio",
      "cep": "389954"
    },
    "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
    "viagens": []
  }
]
```
### Buscar Passageiros com Query:

```
GET: http://localhost:3000/passageiros/?page=1&size=5&name=Tester

```
**Resultado:**
```
[
  {
    "nome": "Passageiro Tester",
    "dataNascimento": "2004/11/04",
    "cpf": "05031229621",
      "rua": "Laranjas",
      "numero": 44,
      "bairro": "centro",
      "cidade": "fundo do mar",
      "estado": "oceano do meio",
      "cep": "389954"
    },
    "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
    "viagens": []
  }
]

```
### Buscar passageiros pelo CPF:

```
GET: http://localhost:3000/passageiros/05031229621
```

**Resultado:**
```
{
  "message": "Passageiro Encontrado",
  "statusCode": 200,
  "passageiro": {
    "nome": "Passageiro Tester",
    "dataNascimento": "2004/11/04",
    "cpf": "05031229621",
    "endereço": {
      "rua": "Laranjas",
      "numero": 44,
      "bairro": "centro",
      "cidade": "fundo do mar",
      "estado": "oceano do meio",
      "cep": "389954"
    },
    "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
    "viagens": []
  }
}

```

### Atualizar Passageiro Pelo CPF:

```
PUT: http://localhost:3000/passageiros/05031229621

Body: 
{
	"nome": "Passageiro Tester modificado",
	"dataNascimento": "2004/11/04",
	"cpf": "05031229621",
	"endereço":{
	  "rua": "Laranjas",
    "numero": 44,
    "bairro": "centro",
    "cidade": "fundo do mar",
    "estado": "oceano do meio",
    "cep": "389954"
	}
}

```

**Resultado:**
```
{
  "nome": "Passageiro Tester modificado",
  "dataNascimento": "2004/11/04",
  "cpf": "05031229621",
  "endereço": {
    "rua": "Laranjas",
    "numero": 44,
    "bairro": "centro",
    "cidade": "fundo do mar",
    "estado": "oceano do meio",
    "cep": "389954"
  },
  "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
  "viagens": []
}
```

### Delete passageiros pelo CPF:
```
Obs: Só pode ser deletado usuários que não possuem registros de viagens.
```

```
DELETE: http://localhost:3000/passageiros/05031229621

```

**Resultado:**
```
{
  "message": "Passageiro Deletado",
  "statusCode": 200,
  "passageiroDeletado": {
    "nome": "Passageiro Tester modificado",
    "dataNascimento": "2004/11/04",
    "cpf": "05031229621",
    "endereço": {
      "rua": "Laranjas",
      "numero": 44,
      "bairro": "centro",
      "cidade": "fundo do mar",
      "estado": "oceano do meio",
      "cep": "389954"
    },
    "id": "77ef4841-c8dd-48dc-81e9-872849b5fc4a",
    "viagens": []
  }
}
```

## ✔ Endpoint Viagens 

### Post Cadastrar Viagem

```
Deve ser passado o "id do passageiro" dentro do Body no campo id
```

```
POST http://localhost:3000/viagens/passageiroID

Body:
{
"id": "bde61fdf-b73d-48c9-87a7-712218d1886a",
"origem":"tester",
"destino": "narnia"
}
```
**Resultado:**
```
{
  "status": 201,
  "message": "Viagem criada com sucesso",
  "viagemBody": {
    "id": "bde61fdf-b73d-48c9-87a7-712218d1886a",
    "origem": "tester",
    "destino": "narnia",
    "ViagemStatus": 0
  }
}

```

### Buscar Viagens:

```
GET: http://localhost:3000/viagens/


```

**Resultado:**
```
[
  {
    "id": "bde61fdf-b73d-48c9-87a7-712218d1886a",
    "origem": "tester",
    "destino": "narnia",
    "ViagemStatus": 0,
    "distancia": 7
  }
]
```
### Buscar Viagens dentro de um raio utilizando Query :

```
Obs: O valor do raio deve ser passado como Query na URL juntamento com o id do motorista.
```

```
POST: http://localhost:3000/viagens/?distancia=9&motoristaID=f71a2053-c037-4ae9-b0e7-87fc5fc258fb

```

**Resultado:**
```
[
  {
    "id": "bde61fdf-b73d-48c9-87a7-712218d1886a",
    "origem": "tester",
    "destino": "narnia",
    "ViagemStatus": 0,
    "distancia": 7
  }
]
```
### Alterar o status da viagem e adicionar a viagem ao motorista e passageiro com Query:

```
Deve ser passado no query o id do motorista, id da viagem e o status da viagem (0-2).
```

```
http://localhost:3000/viagens/adicionar/?motoristaID=5756bd47-fade-4fb4-8588-ce18bc08d7b7&viagemID=bde61fdf-b73d-48c9-87a7-712218d1886a&changeStatus=1

```

**Resultado:**
```
{
  "message": "Status da Viagem atualizado com sucesso",
  "statusCode": 200,
  "ViagemAtualizado": {
    "id": "bde61fdf-b73d-48c9-87a7-712218d1886a",
    "origem": "tester",
    "destino": "narnia",
    "ViagemStatus": 1,
    "distancia": 7
  }
}
```