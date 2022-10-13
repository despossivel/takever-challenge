const Model = require('../models/MostPopular');
const mongoose = require('mongoose');


class MostPopular {

		
	async store(req, res) {
		const json = req.body,
			mostPopular = await Model.create({
				...json
			});
 
			res.status(200).send(mostPopular);

	}

	async index(req, res) {
		const { page = 1, limit = 10 } = req.query,
		 options = {
			page: page,
			limit: limit
		  };
   		
		  const mostPopulars = await Model.paginate({},options) 

		res.status(200).send(mostPopulars);
	}

	async show(req, res) {
		const { _id } = req.params,
		mostPopular = await Model.findById({ _id }).catch(e => console.log(e));

		!Boolean(mostPopular) ? res.status(404).send({ errors: [{ "msg": "Most Popular not found!" }] }) :
			res.status(200).send(mostPopular);
	}



	async update(req, res) {
		const { _id } = req.params;
		const doc = req.body;
 
		const mostPopular = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);

		mostPopular.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Could not update!" }] }) :
			res.status(200).send(mostPopular);
	}

	async destroy(req, res) {
		const { _id } = req.params;
		const mostPopular = await Model.deleteOne({ _id });
		mostPopular.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Unable to remove!" }] }) :
			res.status(200).send(mostPopular);
	}


}


module.exports = new MostPopular()