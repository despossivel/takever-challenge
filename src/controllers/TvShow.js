const Model = require('../models/TvShow');
const mongoose = require('mongoose');


class TvShow {

	async store(req, res) {
		const json = req.body,
			tvShow = await Model.create({
				...json
			});
 
			res.status(200).send(tvShow);

	}

	async index(req, res) {
		const { genre, page = 1, limit = 10 } = req.query;
 
		let query = {}
	  
		if(genre){
			query = { genres: { "$in" : typeof genre == 'object' ? genre : [genre]} };
		}

		const options = {
			page: page,
			limit: limit
		  };
   		
		  const tvShows = await Model.paginate({...query},options) 
			 
			res.status(200).send(tvShows);

	}

	async show(req, res) {
		const { _id } = req.params,
		 tvShow = await Model.findById({ _id }).catch(e => console.log(e))

		!Boolean(tvShow) ? res.status(404).send({ errors: [{ "msg": "Tv Show not found!" }] }) :
			res.status(200).send(tvShow);
	}


	async update(req, res) {
		const { _id } = req.params;
		const doc = req.body;
 
		const tvShow = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);

		tvShow.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Could not update!" }] }) :
			res.status(200).send(tvShow);
	}

	async destroy(req, res) {
		const { _id } = req.params;
		const tvShow = await Model.deleteOne({ _id });
		tvShow.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Unable to remove!" }] }) :
			res.status(200).send(tvShow);
	}


}


module.exports = new TvShow()