const Model = require('../models/FavoriteTvShow'),
	TvShow = require('../models/TvShow'),
	 ObjectId = require('mongodb').ObjectID,
	mongoose = require('mongoose'),
	 {
		resolveQuerys,
		resolveOptions,
		response,
		resolveDocs
	 } = require('../utils');


class FavoriteTvShow {

	async store(req, res) {
		const json = req.body,
			 [checkShow, checkFavoriteShow] = await Promise.all([
				TvShow.count({ id: json.tv_show_id }),
				Model.count({ tv_show_id: json.tv_show_id, user_id: json.user_id })
			]);
 
		if(!Boolean(checkShow)) return res.status(404).send({ errors: [{ "msg": "Favorite Tv Shows not found!" }] });
		if(Boolean(checkFavoriteShow))  return res.status(422).send({ errors: [{ "msg": "Favorite Tv Shows already added!" }] });

		const tvShow = await Model.create({
				...json
			});
 
		response(res, resolveDocs(tvShow), { errors: [{ "msg": "TV show not create!" }] });
	}

	async index(req, res) {
		const options = resolveOptions(req.query),
				query = resolveQuerys(req.query),
		 		tvShows = await Model.paginate({...query}, options) 
			  
		response(res, tvShows, { errors: [{ "msg": "no Favorite Tv Shows found!" }] });

	}

	async show(req, res) {
		const { user_id } = req.params,
			{ page = 1, limit = 10 } = req.query,
			options = {
				page: page,
				limit: limit
			};
                                  
		const tvShow = await Model.paginate({ user_id }, options).catch(e => console.log(e))
 
		response(res, tvShow, { errors: [{ "msg": "no Favorite Tv Show found!" }] });
	}


	async update(req, res) {
		const { _id } = req.params,
		 doc = req.body,
		 tvShow = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);
 
		response(res, resolveDocs(tvShow), { errors: [{ "msg": "Could not update!" }] });
	}

	async destroy(req, res) {
		const { _id } = req.params,
		tvShow = await Model.deleteOne({ _id });

		response(res, resolveDocs(tvShow), { errors: [{ "msg": "Unable to remove!" }] });
	}


}


module.exports = new FavoriteTvShow()