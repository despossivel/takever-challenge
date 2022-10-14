const Model = require('../models/FavoriteTvShow'),
	TvShow = require('../models/TvShow'),
	 ObjectId = require('mongodb').ObjectID,
	mongoose = require('mongoose'),
	 {
		resolveQuerys
	 } = require('../utils');


class FavoriteTvShow {

	async store(req, res) {

	
		const json = req.body;
		const checkShow =  await TvShow.count({
			id: json.tv_show_id
		})

		const checkFavoriteShow =  await Model.count({
			tv_show_id: json.tv_show_id,
			user_id: json.user_id
		})


		console.log(checkFavoriteShow)

		if(!Boolean(checkShow)) return res.status(404).send({ errors: [{ "msg": "Favorite Tv Shows not found!" }] });

		if(Boolean(checkFavoriteShow))  return res.status(422).send({ errors: [{ "msg": "Favorite Tv Shows already added!" }] });

		const tvShow = await Model.create({
				...json
			});
 
			res.status(200).send(tvShow);

	}

	async index(req, res) {
		const { page = 1, limit = 10 } = req.query,
				options = {
					page: page,
					limit: limit
				},
				query = resolveQuerys(req.query),
		 		tvShows = await Model.paginate({...query}, options) 
			 
		!Boolean(tvShows) ? res.status(404).send({ errors: [{ "msg": "Favorite Tv Shows not found!" }] }) :
			res.status(200).send(tvShows);

	}

	async show(req, res) {
		const { user_id } = req.params,
			{ page = 1, limit = 10 } = req.query,
			options = {
				page: page,
				limit: limit
			};
                                  
 
		const tvShow = await Model.paginate({ user_id }, options).catch(e => console.log(e))

		!Boolean(tvShow) ? res.status(404).send({ errors: [{ "msg": "Favorite Tv Show not found!" }] }) :
			res.status(200).send(tvShow);
	}


	async update(req, res) {
		const { _id } = req.params,
		 doc = req.body,
		 tvShow = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);

		tvShow.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Could not update!" }] }) :
			res.status(200).send(tvShow);
	}

	async destroy(req, res) {
		const { _id } = req.params,
		tvShow = await Model.deleteOne({ _id });

		tvShow.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Unable to remove!" }] }) :
			res.status(200).send(tvShow);
	}


}


module.exports = new FavoriteTvShow()