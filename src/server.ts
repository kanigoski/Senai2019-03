import express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

const app: express.Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

const port: number = 3000;

app.get('/', function (req, res) {
    res.send({
        "Teste": "olá Mundo"
    });
});

app.listen(port, function () {
console.log(`Example app listening on port ${port}!`);
});