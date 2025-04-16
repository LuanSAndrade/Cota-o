# **API de Cotação**

Bem-vindo à **API de Cotação**, uma aplicação RESTful simples e funcional que permite consultar cotações de moedas em relação ao Real, registrar valores manualmente e exibir um histórico de cotações registradas. Este projeto foi desenvolvido utilizando **Node.js**, **Express** e **Axios**, e conta com um frontend básico em HTML, CSS e JavaScript para facilitar a interação.

---

## **Índice**

1. [Clonando o Repositório](#clonando-o-repositório)
2. [Instalando as Dependências](#instalando-as-dependências)
3. [Configurando o Ambiente (`.env`)](#configurando-o-ambiente-env)
4. [Iniciando o Projeto](#iniciando-o-projeto)
5. [Rotas da API](#rotas-da-api)
6. [Testando a API](#testando-a-api)
7. [Exemplo de Frontend](#exemplo-de-frontend)

---

## **Clonando o Repositório**

Primeiramente, você precisa clonar este repositório para sua máquina local. Utilize o comando abaixo:

```bash
git clone https://github.com/LuanSAndrade/Cota-o.git
cd Cota-o
```

# **Instalando as Dependências**

```bash
npm install
```

Isso instalará pacotes como Express, Axios, dotenv, entre outros, necessários para rodar o projeto.

# **Configurando o Ambiente (.env)**

Este projeto utiliza um arquivo .env para armazenar variáveis de ambiente, como a chave de acesso à API pública. Siga os passos abaixo:

1. No diretório raiz do projeto, crie um arquivo chamado .env.

2. Adicione o seguinte conteúdo ao arquivo .env:

ACCESS_KEY=SuaAPIKeyAqui {tem um exemplo de como deve ser em .envexemple}

> Substitua SuaAPIKeyAqui pela chave de acesso obtida na API pública ExchangeRate (se necessário).

# **Iniciando o Projeto**

Após configurar tudo, você pode iniciar o servidor com o seguinte comando:

```bash
node index.js
```

O servidor estará rodando em: http://localhost:5000
A aplicação em front-end estará rodando em http://127.0.0.1:5500/index.html (rodar primeiramente o servidor)

## **Rotas da API**

| **Método** | **Rota**     | **Descrição**                                                 |
| ---------- | ------------ | ------------------------------------------------------------- |
| **GET**    | `/cotacao`   | Busca cotações em tempo real com base e símbolo.              |
| **POST**   | `/cotacao`   | Registra manualmente uma cotação (salva no cache em memória). |
| **GET**    | `/historico` | Retorna o histórico de cotações registradas.                  |
| **GET**    | `/moedas`    | Retorna a lista de moedas disponíveis na API pública.         |

---
