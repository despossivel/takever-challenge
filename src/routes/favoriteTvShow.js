 const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/favoriteTvShow'),
    TvShow = require('../controllers/FavoriteTvShow');

route.post('/favorite/tv/show/create', middleware.create, TvShow.store)
route.get('/favorite/tv/show/get', middleware.index, TvShow.index)
route.get('/favorite/tv/show/:user_id', middleware.show, TvShow.show)
// route.put('/favorite/tv/show/:_id', middleware.update, TvShow.update)
route.delete('/favorite/tv/show/:_id', middleware.destroy, TvShow.destroy)
 
module.exports = route;