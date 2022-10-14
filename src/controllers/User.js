const SMTP = require('../services/SMTP'),
	blowfish = require('../utils/blowfish'),
	Model = require('../models/User');

class User {

	async index(req, res) {
		const users = await Model.find().catch(e => console.log(e))
		users.length == 0 ?
			res.status(404).send({ errors: [{ "msg": "No users found!" }] }) :
			res.status(200).send(users);
	}

	async show(req, res) {
		const { _id } = req.params,
		user = await Model.findById({ _id }).catch(e => console.log(e))
 
		!Boolean(user) ?
			res.status(404).send({ errors: [{ "msg": "user not found!" }] }) :
			res.status(200).send(user);
	}


	async store(req, res) {
		const doc = req.body,
		user = await Model.create(doc),
		{ _id } = user;

		// await SMTP.send(doc.email, 'Confirmar conta no Teakever', `Acesse o link para confirmar a sua conta
		// 	${process.env.HOST}/public/confirmar/conta/${_id}`, ``).catch(e => console.error(e))

		res.status(200).send(user);
	}

	async update(req, res) {
		const { _id } = req.params,
		 { senha, ...rest } = req.body,
		 doc = rest,
		 user = await Model.updateOne({ _id }, doc);
		 
		user.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Could not update!" }] }) :
			res.status(200).send(user);

	}

	async destroy(req, res) {
		const { _id } = req.params,
		 user = await Model.deleteOne({ _id });

		user.n == 0 ?
			res.status(422).send({ errors: [{ "msg": "Unable to remove user!" }] }) :
			res.status(200).send(user);
	}

}

module.exports = new User();