const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt');

module.exports = {
    create: [
        Jwt.verify,
        check('tv_show_id').exists().notEmpty(),
        check('user_id').exists().notEmpty(),
        expressValidation.validation
    ],
    index: [
        Jwt.verify,
    ],
    show: [
        Jwt.verify,
        check('user_id').notEmpty(),
        expressValidation.validation
    ],
    destroy: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ]
};