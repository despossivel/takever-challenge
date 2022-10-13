const jwt = require('jsonwebtoken'),
	{ promisify } = require('util');

class JWT {
	constructor() {
		this.privateKey = process.env.SECRET_KEY;
		this.expiresIn = '1h';
	}

	sing = payload => jwt.sign({ payload }, this.privateKey, { expiresIn: '8h' })

	verify = (req, res, next) => {
		const token = req.headers['authorization'];
		if (!token) return res.status(401).send({ errors: [{ "msg": "Authentication token not provided!" }], status: 404 });
		jwt.verify(token, this.privateKey, function (err, decoded) {
			if (err) return res.status(500).send({ errors: [{ "msg": "Token is no longer valid!" }], relogin: true, status: 404 });
			req.userId = decoded.id;
			next();
		});
	}

	decoded = (token) => jwt.decode(token, { complete: true });
}

module.exports = new JWT();