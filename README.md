# PredialX 

Projeto desenvolvido visando facilitar o regitro de colaboradoes e ordens de serviço dentro de uma empresa.

## 🚀 Começando

Primeiro clone esse repositório seguindo as intruções descritas no link abaixo:
```
https://docs.github.com/pt/enterprise-cloud@latest/repositories/creating-and-managing-repositories/cloning-a-repository
```

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.

### 📋 Pré-requisitos

Para utilizar esta aplicação é necessário ter instalado em sua máquina:

```
Node.JS v16.13.1.
NPM v8.1.2 
Yarn v1.22.17
React.JS
```

### 🔧 Executando o projeto

Abra a pasta clonada no seu editor de código ou diretamente no terminal do seu sistema e siga as intruções abaixo.

⚙️ Para rodar o backend:

```
Pelo terminal abra a pasta node-localdata-os;
Rode no terminal o comando: npm install;
Ao terminar rode no terminal o comando: npm run start
```

⚙️ Para rodar o frontend:

```
Pelo terminal abra a pasta node-localdata-os/front;
Rode no terminal o comando: npm install;
Ao terminar rode no terminal o comando: yarn start
```

Para conferir as telas e a aplicação rodando acesse:

```
http://localhost:3000/
```

### ⌨️ Demonstração do projeto

Faça o login conforme o usuário cadastrado no pasta data/contributors.json:

```
email: charlene@predialx.com
password: 123456
```

Pelo menu de navegação confira as telas:

* http://localhost:3000/clients - Para cadastro e edição de clientes 🤓
* http://localhost:3000/contributors - Para cadastro e edição de colaboradores 🖇️
* http://localhost:3000/orders - Para registro de ordens de serviço ✒️
* http://localhost:3000/orderslist - Para listagem das ordens de serviço 📄


## 📌 Importante

Para a aplicação rodar perfeitamente é necessário acionar os terminais do backend e do frontend separadamente, porém ao mesmo tempo. 

## 🛠️ Construído com

* [React](https://pt-br.reactjs.org/) - O framework usado
* [Node.JS](https://nodejs.org/en/) - Utilizado para o backend
* [Yarn](https://yarnpkg.com/) - Utilizado para gerenciar dependências
* [Bootstrap](https://getbootstrap.com/) - Usado para estilização da página
* [Axios, Cors, Express, Nodemon](https://www.npmjs.com/package/) - Pacotes NPM utilizados para comunicação de API