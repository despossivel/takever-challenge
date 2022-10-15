const Model = require('../models/TvShow'),
	 mongoose = require('mongoose'),
	 {
		resolveQuerys,
		resolveOptions,
		response,
		resolveDocs
	 } = require('../utils');


class TvShow {

	async store(req, res) {
		const json = req.body,
			tvShow = await Model.create({
				...json
			});
  
		response(res, resolveDocs(tvShow), { errors: [{ "msg": "Tv Show not create!" }] });

	}

	async index(req, res) {
		const options = resolveOptions(req.query),
				query = resolveQuerys(req.query),
		 		tvShows = await Model.paginate({...query}, options) 
			  
		response(res, tvShows, { errors: [{ "msg": "no Tv Shows found!" }] });

	}

	async show(req, res) {
		const { _id } = req.params,
		 tvShow = await Model.findById({ _id }).catch(e => console.log(e))

		response(res, {
			docs: tvShow === null ? false : [tvShow]
		}, { errors: [{ "msg": "no Tv Show found!" }] });
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


module.exports = new TvShow()