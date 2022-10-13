const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt'),
    Model = require('../../models/User');

module.exports = {
    index: [
        Jwt.verify,
        expressValidation.validation
    ],
    show: [
        Jwt.verify,
        check("_id").notEmpty(),
        expressValidation.validation
    ],
    store: [
        //  Jwt.verify,
        check('name').notEmpty(),
        check('username').notEmpty(),
        check('phone').notEmpty(),
        check('email').notEmpty().isEmail().custom((value) => {
            return Model.findOne({ email: value }).then(email => {
                if (email) {
                    return Promise.reject('Email is already in use!')
                }
            })
        }),
        check('password').notEmpty().isLength({ min: 7 }).withMessage('Your password must be at least 5 characters long'),
        expressValidation.validation
    ],
    update: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ],
    destroy: [
        Jwt.verify,
        check('_id').notEmpty(),
        expressValidation.validation
    ]
};