const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/public'),
    Public = require('../controllers/Public');

route.get('/public/confirm/account/:_id', middleware.update, Public.update)
route.get('/public/forgot/password/:email', middleware.show, Public.show)

module.exports = route;