const { check } = require('express-validator'),
    expressValidation = require('../expressValidation'),
    Jwt = require('../Jwt');

module.exports = {
    create: [
        Jwt.verify,
        check('id').exists().notEmpty(),
        check('name').exists().notEmpty(),
        check('permalink').exists().notEmpty(),
        check('start_date').exists().notEmpty(),
        check('end_date').exists().notEmpty(),
        check('country').exists().notEmpty(),
        check('network').exists().notEmpty(),
        check('status').exists().notEmpty(),
        check('image_thumbnail_path').exists().notEmpty(),
        check('genres').exists().notEmpty(),
        check('pictures').exists().notEmpty(),
        check('episodes').exists().notEmpty(),
        expressValidation.validation
    ],
    index: [
        Jwt.verify,
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