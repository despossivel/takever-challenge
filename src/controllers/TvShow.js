const Model = require('../models/TvShow'),
	 mongoose = require('mongoose'),
	 {
		resolveQuerys
	 } = require('../utils');


class TvShow {

	async store(req, res) {
		const json = req.body,
			tvShow = await Model.create({
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
			 
		!Boolean(tvShows) ? res.status(404).send({ errors: [{ "msg": "Tv Shows not found!" }] }) :
			res.status(200).send(tvShows);

	}

	async show(req, res) {
		const { _id } = req.params,
		 tvShow = await Model.findById({ _id }).catch(e => console.log(e))

		!Boolean(tvShow) ? res.status(404).send({ errors: [{ "msg": "Tv Show not found!" }] }) :
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


module.exports = new TvShow()