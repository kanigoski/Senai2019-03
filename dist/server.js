"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
var port = 3000;
var users = [];
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Aula2019'
});
function execSQLQuery(sqlQry, res) {
    connection.query(sqlQry, function (error, results, fields) {
        if (error) {
            res.json({ error: error });
        }
        else {
            res.json({ response: 200, message: 'Usuário criado com sucesso!' });
        }
        connection.end();
    });
}
app.post('/logon', function (req, res) {
    var searchUser = {};
    users.map(function (i) {
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
        };
    }
    res.send(searchUser);
});
app.put('/create', function (req, res) {
    var sSQL = "\n        INSERT INTO usuario (nome, usuario, senha) VALUES\n        ('" + req.body.name + "', '" + req.body.userName + "', '" + req.body.password + "')\n    ";
    execSQLQuery(sSQL, res);
});
app.get('/cidades', function (req, res) {
    execSQLQuery('SELECT * FROM cidade', res);
});
app.get('/bairros/:id', function (req, res) {
    var sSQL = "\n        SELECT \n            bairro.nome AS nomeBairro,\n            cidade.nome AS nomeCidade\n        FROM bairro \n            INNER JOIN cidade\n                ON cidade.id_cidade = bairro.id_cidade\n        WHERE cidade.id_cidade = " + req.params.id + "\n        ";
    execSQLQuery(sSQL, res);
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
