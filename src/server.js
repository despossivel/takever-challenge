require('dotenv').config({
    path: process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env'
})

console.log(process.env.NODE_ENV == 'dev' ? '.env.dev' : process.env.NODE_ENV == 'test' ? '.env.test' : '.env')

require('./config/connection');

const express = require('express'),
        bodyParser = require('body-parser'),
        cors = require('cors'),
        path = require('path'),
        app = express(),
        routes = require('./routes')
 
 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
app.use('/static', express.static('./public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.use('/docs-api', express.static(path.resolve(__dirname, '..', 'public', 'docs',)));

// pegar rotas indefinidas e responder com 404
app.use(function (req, res, next) {
    res.status(404).send("Desculpe, não consigo encontrar isso!")
});

// detectar erros do servidor e responder com 500
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Algo quebrou!')
})

module.exports = app;