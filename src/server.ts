import express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const mysql = require('mysql');

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

const port: number = 3000;
let users: any[] = [];

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'prova'
    });
    
    connection.query(sqlQry, function(error, results, fields){
        if(error) 
            res.json(error);
        else
            res.json(results);
            connection.end();
            console.log('executou!');

    });
}

app.put('/sabor', function (req, res) {
    const sSQL = `INSERT INTO sabor (id_tamanho, descricao, preco) VALUES
        ('${req.body.id_tamanho}', '${req.body.descricao}', ${req.body.preco})`;

    console.log(sSQL);

    execSQLQuery(sSQL, res)
});

app.get('/sabor/:id', function (req, res) {
    execSQLQuery(`SELECT
                    tamanho.descricao AS tamanho,
                    sabor.descricao AS sabor,
                    sabor.preco 
                FROM sabor
                    INNER JOIN tamanho
                        ON tamanho.id_tamanho = sabor.id_tamanho
                WHERE tamanho.id_tamanho = ${req.params.id}
                `, res);
});

app.get('/tamanho', function (req, res) {
    execSQLQuery(`SELECT
                    tamanho.id_tamanho AS codTamanho,
                    tamanho.descricao AS tamanho
                FROM tamanho
                `, res);
});


//--------------------------------------------------------------------------------------------------

app.post('/logon', function (req, res) {
    let searchUser = {};

    users.map(i => {
        if (i.userName == req.body.userName && i.password == req.body.password) {
            searchUser = {
                response: 200,
                userName: i.name
            };
        }
    });

    if (Object.keys(searchUser).length === 0) {
        searchUser = {
            response: 404,
            message: "Usuário ou senha incorreto!"
        }
    }

    res.send(searchUser);
});

app.put('/create', function (req, res) {
    const sSQL = 
    `
        INSERT INTO usuario (nome, usuario, senha) VALUES
        ('${req.body.name}', '${req.body.userName}', '${req.body.password}')
    `
    execSQLQuery(sSQL, res)
})

app.get('/cidades', function (req, res) {
    execSQLQuery('SELECT * FROM cidade', res);
});

app.get('/bairros/:id', function (req, res) {
    const sSQL =
        `
        SELECT 
            bairro.nome AS nomeBairro,
            cidade.nome AS nomeCidade
        FROM bairro 
            INNER JOIN cidade
                ON cidade.id_cidade = bairro.id_cidade
        WHERE cidade.id_cidade = ${req.params.id}
        `
    execSQLQuery(sSQL, res);
});

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});