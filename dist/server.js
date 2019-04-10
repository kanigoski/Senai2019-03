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
app.get('/', function (req, res) {
    res.send({
        "Teste": "olá Mundo"
    });
});
app.listen(port, function () {
    console.log("Example app listening on port " + port + "!");
});
