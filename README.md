# Construção de uma API node usando o Express e o jwt para autenticação

Este repositório é referente a um desafio técnico onde haviam exigências de um cadastro com validação de usuários e uma autenticação por meio de token.

O banco de dados utilizado neste projeto é o MongoDB online, caso queira usar localmente faça as configurações necessárias..

## Como usar o projeto
Faça o clone do projeto com o seguinte comando:
~~~
git clone https://github.com/NascimentoFrancisco/api-express-jwt.git
~~~
Antes de tudo configure o arquivo `.env` em seu projeto dessa forma:
~~~
PORT=8080
DATABASE_URL= Url do banco de dados MongoDB
JWT_SECRET= Faça uma chave secreta
JWT_SECRET_REFRESH= Faça outra chave secreta

~~~
**OBS:** Altere a porta na url caso esteja usando a configuração no docker use a porta `8080`, caso contrário use a porta `8000`.

### Com doker
Agora tendo o docker instaldo em sua máquina faça os seguintes passos:

Faça a construção da imagem:
~~~
docker build -t node-api-docker:v1.0.0 .
~~~

Agora execute o seguinte comando para rodar o contêiner:
~~~
docker run -p 8080:8080 node-api:v1.0.o
~~~

## Sem o Docker
Baixe as dependências:
~~~
npm install
~~~

E por fim execute a aplicação:
~~~
npm run dev
~~~
Esta aplicação está executando com o nodemon, por isso o comando está `npm run dev`.

Agora abra o Postman ou outro app similar e teste as urls da API:

## Urls e dados da API
## Cadastro de usuários:

Requisição `POST` na url: `http://localhost:8080/user`

Com a seguinte estrutra `json`:
~~~ json
{
    "name": "Teste dos testes",
    "email": "teste@gmail.com",
    "password": "12345",
    "phone": [
        {
            "number":"988888888", 
            "ddd":"99"
        }
    ]
}
~~~
### Sucesso:
~~~ json
{
    "name": "Teste dos testes",
    "email": "teste@gmail.com",
    "phone": [
        {
            "number": "988888888",
            "ddd": "99",
            "_id": "id do objeto"
        }
    ],
    "_id": "id do objeto",
    "create_at": "2023-11-27T18:16:40.990Z",
    "updated_at": "2023-11-27T18:16:40.991Z",
    "__v": 0
}
~~~

### Erros

Email já cadastrado:
~~~ json
{
    "mensagem": "E-mail já existente"
}
~~~
## Autenticação

Requisição `POST` na url: `http://localhost:8000/auth`
Informações a serem enviadas:
~~~ json
{
    "email":"email do usuário",
    "password": "senha"
}
~~~

### Sucesso:
~~~ json
{
    "accessToken": "Token de acesso",
    "refreshToken": "RefreshToken para atualizar o accessToken"
}
~~~

### Erros:
Dados vazios:
~~~json
{
    "mensagem": "Todos os campos são obrigatórios"
}
~~~
Dados inválidos:
~~~ json
{
    "mensagem": "Email ou senha inválidos"
}
~~~

## Resgatar informações do usuário:
Requisição `GET` na url: `http://localhost:8080/get-user`

Esteja ciente que aqui é preciso enviar o `token de acesso` para obter as informações do usuário, assim use a configuração de `Bearer Token` como autenticação.

### sucesso:
~~~ json
{
    "name": "Teste dos testes",
    "email": "teste@gmail.com",
    "phone": [
        {
            "number": "988888888",
            "ddd": "99",
            "_id": "id do objeto"
        }
    ],
    "_id": "id do objeto",
    "create_at": "2023-11-27T18:16:40.990Z",
    "updated_at": "2023-11-27T18:16:40.991Z",
    "__v": 0
}
~~~

### Erros:
Não autorizado:
~~~ json
{
    "mensagem": "Não autorizado"
}
~~~
Token Expirado:
~~~ json
{
    "mensagem": "Tempo de 30 minutos expirado"
}
~~~
