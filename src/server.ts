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

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Aula2019'
});

function execSQLQuery(sqlQry, res){   
    connection.query(sqlQry, function(error, results, fields){
        if(error) {
            res.json({error});
        } else {
            res.json(results);
        }
        connection.end();
    });
}

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