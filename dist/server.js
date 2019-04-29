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
function execSQLQuery(sqlQry, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'prova'
    });
    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('executou!');
    });
}
app.put('/sabor', function (req, res) {
    var sSQL = "INSERT INTO sabor (id_tamanho, descricao, preco) VALUES\n        ('" + req.body.id_tamanho + "', '" + req.body.descricao + "', " + req.body.preco + ")";
    console.log(sSQL);
    execSQLQuery(sSQL, res);
});
app.get('/sabor/:id', function (req, res) {
    execSQLQuery("SELECT\n                    tamanho.descricao AS tamanho,\n                    sabor.descricao AS sabor,\n                    sabor.preco \n                FROM sabor\n                    INNER JOIN tamanho\n                        ON tamanho.id_tamanho = sabor.id_tamanho\n                WHERE tamanho.id_tamanho = " + req.params.id + "\n                ", res);
});
app.get('/tamanho', function (req, res) {
    execSQLQuery("SELECT\n                    tamanho.id_tamanho AS codTamanho,\n                    tamanho.descricao AS tamanho\n                FROM tamanho\n                ", res);
});
//--------------------------------------------------------------------------------------------------
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
