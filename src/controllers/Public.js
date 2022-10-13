const mongoose = require('mongoose'),
    Model = require('../models/User'),
    blowfish = require('../utils/blowfish'),
    SMTP = require('../services/SMTP');

class Public {

    async update(req, res) {

        let { _id } = req.params;
        _id = mongoose.Types.ObjectId(_id);
        const user = await Model.updateOne({ _id }, { status: true });

        user.length == 0 ?
            res.status(422).send({ errors: [{ "msg": "Unable to activate your account!" }] }) :
            res.status(200).render('confirmar-email')
    }

    //recuperar senha
    async show(req, res) {
        const { email } = req.params,
            user = await Model.find({ email, status: true }).catch(e => console.log(e))

        if (user.length == 0) res.status(404).send({ errors: [{ "msg": "user not found!" }] })

        const [response] = user;
        let { senha } = response;
        senha = blowfish.decrypt(senha)

        // await SMTP.send(email, 'Password recovery',
        //     `We managed to recover your password, it is ${senha}`, ``)
        //     .catch(e => console.error(e))

        res.status(200).send({ data: [{ "msg": "Recovery email was sent successfully!" }] });
    }


}

module.exports = new Public();