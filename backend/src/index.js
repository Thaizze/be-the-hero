const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();

//Em produção passar qual endereço vai poder acessar a aplicação
//Ex: http://www.meusite.com
/*
    app.use(cors({
        origen: 'http://www.meusite.com'
    }));
*/

app.use(cors());
app.use(express.json());
app.use(routes);

/** Rotas e Recusrsos **/

/**
 *  Métodos HTTP:
 *  GET: Buscar uma informação do back-end
 *  POST: Criar uma informação no back-end
 *  PUT: Alterar uma informação no back-end
 *  DELETE: Deletar uma informação no back-end
*/

/** 
 * Tipos de parâmetros:
 * Query params: Parâmetros nomeados enviados na rota após "?" (Filtros,paginação)
 * Route Params: Parâmetros utilizados pra identificar recursos | /users -> o users é o recurso | busca dados de um único recurso
 * Request Body: Corpo da requisição, utilizado pra criar ou alterar recursos 
*/

/**
 * Bancos de Dados:
 * SQL: MySQL, SQLite, PostgresSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB
*/

/**
 * Instalar Bancos de Dados:
 * Driver: Pacote Oficial pra node - EX: SELECT * FROM users
 * Query Builder: Escrever as querys com JS - EX: table('users').select('*').where()
*/
 



app.listen(3333);