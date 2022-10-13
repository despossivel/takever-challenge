const JWT = require('../middlewares/Jwt'),
	blowfish = require('../utils/blowfish'),
	Model = require('../models/User');

class Auth {

	constructor() { }

	async show(req, res, next) {

 
		const { email, password } = req.body,
			token = JWT.sing({}),
			passwordEncrypt = blowfish.encrypt(password);

		const login = await Model.findOne({ email, password: passwordEncrypt }).catch(e => console.log(e));
		
		let response;

		// if (login && !login._doc.hasOwnProperty('status')) return res
		// 	.status(401)
		// 	.send({
		// 		errors: [{ "msg": "Usuario não confirmado, verifique seu e-mail!" }],
		// 		status: 401
		// 	});

		login ? response = {
			...login._doc,
			token
		} : {};

		login ? res.status(200).send(response)
			: res.status(404).send({ errors: [{ "msg": "User not found!" }], status: 404 })

	}

}

module.exports = new Auth();