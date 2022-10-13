const { Router } = require('express'),
    route = new Router();

route.get('/', (req, res) => res.render('index'))

module.exports = route;