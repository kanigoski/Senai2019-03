"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));
var port = 3000;
var users = [];
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
    var newUser = {};
    users.map(function (i) {
        if (i.userName == req.body.userName) {
            newUser = {
                response: 400,
                message: "Usuário já existe!"
            };
        }
    });
    if (Object.keys(newUser).length === 0) {
        newUser = { "response": 201, "message": "Usuário criado com sucesso!" };
        users.push({
            userName: req.body.userName,
            password: req.body.password,
            name: req.body.name,
        });
    }
    ;
    res.send(newUser);
});
app.get('/cidades', function (req, res) {
    res.send([
        {
            "id": 1,
            "name": "Jaraguá do Sul"
        },
        {
            "id": 2,
            "name": "Joinville"
        },
        {
            "id": 3,
            "name": "Blumenau"
        },
        {
            "id": 4,
            "name": "Pomerode"
        },
    ]);
});
app.get('/bairros/:id', function (req, res) {
    var list = [];
    var values = [
        {
            "id": 1,
            "codCidade": 1,
            "name": "Jaraguá 99",
            "value": 1.5
        },
        {
            "id": 2,
            "codCidade": 1,
            "name": "Bairro 2",
            "value": 2.5
        },
        {
            "id": 3,
            "codCidade": 2,
            "name": "Teste 1",
            "value": 3.5
        },
        {
            "id": 4,
            "codCidade": 2,
            "name": "Teste 2",
            "value": 4.5
        }
    ];
    values.map(function (i) {
        if (i.codCidade == req.params.id) {
            list.push(i);
        }
    });
    res.send(list);
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
