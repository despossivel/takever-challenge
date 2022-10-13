const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/user'),
    User = require('../controllers/user');

route.get('/users', middleware.index, User.index)
route.get('/user/:_id', middleware.show, User.show)
route.post('/user', middleware.store, User.store)
route.put('/user/:_id', middleware.update, User.update)
route.delete('/user/:_id', middleware.destroy, User.destroy)

module.exports = route;