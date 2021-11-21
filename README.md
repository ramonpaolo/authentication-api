# Authentication API
![GitHub top language](https://img.shields.io/github/languages/top/ramonpaolo/authentication-api)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ramonpaolo/authentication-api)
![GitHub](https://img.shields.io/github/license/ramonpaolo/authentication-api)

# 📑 Sobre o projeto

###  Link Projeto: https://eloquent-ride-90e6b3.netlify.app [![Netlify Status](https://api.netlify.com/api/v1/badges/c467b4ed-74fd-4043-bdc9-40d016e8f870/deploy-status)](https://app.netlify.com/sites/eloquent-ride-90e6b3/deploys)

É uma aplicação web full-stack, para authenticação do usuário e gerenciamento de rotas utilizando ReactJs e Express.

### Como Funciona ?
A aplicação consiste em uma rota home, onde irá aparecer se o usuário está logado ou não. Caso não esteja, irá aparecer dois botões, um para logar, e outro para se registrar. Ambos terão a opção de marcar se desejam se o login fique na sessão ou seja gravado no nevagador, para fazer login automático mesmo após fechar a janela. Caso o usuário esteja logado, irá aparecer na página home, um botão para se deslogar.

É utilizado a lib React para o desenvolvimento Front-End junto com Bootstrap para estilização da página.
Também foi utilizado o banco de dados sqlite junto com sequelize, para uma fácil manipulação do banco de dados.
Para dar uma segurança maior, é utilizado a lib bcrypt para gerar um hash da senha do usuário, ao salvar no banco de dados.
Tanto no Login, como no Cadastro, é retornado um JWT que será salvo e lido no navegador do usuário.

---

### 🧪 Testes feitos utilizando Jest
  
---

# 🚀 Tecnologias Utilizadas

## Front end

- HTML / CSS
- ReactJs ⚛️
- Bootstrap 5
- TypeScript

## Back End

- ExpressJs
- JsonWebToken(JWT)
- Typescript
- Sequelize
- Jest
- Sqlite

---

# 📁 Como executar o projeto?

Pré-requesitos: NodeJs 14.0 LTS

```bash
# clonar repositório
$ git clone https://github.com/devsuperior/authentication-api

# entrar na pasta do projeto
$ cd authentication-api/

# crie o arquivo .env
$ touch .env

# abra o arquivo .env
$ nano .env

# insira a 'váriavel' jwt_key
$ jwt_key='ojn23459uasfdu'
```

## Front End

```bash
# entrar na pasta front-end
$ cd front-end/

# instalar as depêndencias:
$ npm install

# iniciar o front-end:
$ npm start
```

## Back End

```bash
# entrar na pasta server
$ cd server/

# instalar as depêndencias:
$ npm install

# iniciar o server:
$ npm start
```