 const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/mostPopular'),
    MostPopular = require('../controllers/MostPopular');

route.post('/most/popular/create', middleware.create, MostPopular.store)
route.get('/most/popular/get', middleware.index, MostPopular.index)
route.get('/most/popular/:_id', middleware.update, MostPopular.show)
route.put('/most/popular/:_id', middleware.update, MostPopular.update)
route.delete('/most/popular/:_id', middleware.destroy, MostPopular.destroy)

module.exports = route;