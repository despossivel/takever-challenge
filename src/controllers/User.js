const SMTP = require('../services/SMTP'),
	blowfish = require('../utils/blowfish'),
	Model = require('../models/User'),
	mongoose = require('mongoose'),
	{resolveOptions, response} = require('../utils');

class User {

	async index(req, res) {
		const options = resolveOptions(req.query)
		const users = await Model.paginate({}, options).catch(e => console.log(e))

		response(res, users, { errors: [{ "msg": "No users found!" }] });
	}

	async show(req, res) {
		const { _id } = req.params,
		user = await Model.findById({ _id }).catch(e => console.log(e))
  
 		response(res, {
			docs: user === null ? false : [user]
		}, { errors: [{ "msg": "user not found!" }] });
	}


	async store(req, res) {
		const doc = req.body,
		user = await Model.create(doc),
		{ _id } = user;

		// await SMTP.send(doc.email, 'Confirmar conta no Teakever', `Acesse o link para confirmar a sua conta
		// 	${process.env.HOST}/public/confirmar/conta/${_id}`, ``).catch(e => console.error(e))
	 

		response(res, {
			docs:[user]
		}, { errors: [{ "msg": "user not create!" }] });
	}

	async update(req, res) {
		const { _id } = req.params,
		 { senha, ...rest } = req.body,
		 doc = rest,
		 user = await Model.updateOne({ _id: mongoose.Types.ObjectId(_id) }, doc);
 
		 
			response(res, {
				docs:[
					user
				]
			}, { errors: [{ "msg": "Could not update!" }] });

	}

	async destroy(req, res) {
		const { _id } = req.params,
		 user = await Model.deleteOne({ _id:  mongoose.Types.ObjectId(_id) });
 
			response(res, {
				docs:[user]
			}, { errors: [{ "msg": "Unable to remove user!" }] });
	}

}

module.exports = new User();