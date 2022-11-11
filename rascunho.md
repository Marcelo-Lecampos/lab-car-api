## Endpoints Viagens 

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