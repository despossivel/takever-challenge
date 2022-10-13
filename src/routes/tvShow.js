 const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/tvShow'),
    TvShow = require('../controllers/TvShow');

route.post('/tv/show/create', middleware.create, TvShow.store)
route.get('/tv/show/get', middleware.index, TvShow.index)
route.get('/tv/show/:_id', middleware.update, TvShow.show)
route.put('/tv/show/:_id', middleware.update, TvShow.update)
route.delete('/tv/show/:_id', middleware.destroy, TvShow.destroy)

// route.post('/upload/logo', middleware.logo, Uploads.logo)

module.exports = route;