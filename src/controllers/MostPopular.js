const Model = require('../models/MostPopular'),
	 mongoose = require('mongoose'),
	 {
		response,
		resolveOptions,
		resolveDocs
	 } = require('../utils');


class MostPopular {

	async store(req, res) {
		const json = req.body,
			mostPopular = await Model.create({
				...json
			});
  
		response(res, resolveDocs(mostPopular), 
		{ errors: [{ "msg": "Most Popular not create!" }] });
	}

	async index(req, res) {
		const options = resolveOptions(req.query),
				mostPopulars = await Model.paginate({},options)

		response(res, mostPopulars, { errors: [{ "msg": "no Most Popular not found!" }] });
	}

	async show(req, res) {
		const { _id } = req.params,
			mostPopular = await Model.findById({ _id }).catch(e => console.log(e));
 
		response(res, {
			docs: mostPopular === null ? false : [mostPopular]
		}, { errors: [{ "msg": "no Most Popular found!" }] });
	}

	async update(req, res) {
		const { _id } = req.params,
			doc = req.body,
			mostPopular = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);

		response(res, resolveDocs(mostPopular), { errors: [{ "msg": "Could not update!" }] });
	}

	async destroy(req, res) {
		const { _id } = req.params,
		 mostPopular = await Model.deleteOne({ _id });

		 response(res, resolveDocs(mostPopular), { errors: [{ "msg": "Unable to remove!" }] });
	}


}


module.exports = new MostPopular()