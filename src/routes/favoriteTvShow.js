 const { Router } = require('express'),
    route = new Router(),
    middleware = require('../middlewares/routes/favoriteTvShow'),
    FavoriteTvShow = require('../controllers/FavoriteTvShow');

route.post('/favorite/tv/show/create', middleware.create, FavoriteTvShow.store)
route.get('/favorite/tv/show/get', middleware.index, FavoriteTvShow.index)
route.get('/favorite/tv/show/:user_id', middleware.show, FavoriteTvShow.show)
// route.put('/favorite/tv/show/:_id', middleware.update, FavoriteTvShow.update)
route.delete('/favorite/tv/show/:_id', middleware.destroy, FavoriteTvShow.destroy)
 
module.exports = route;