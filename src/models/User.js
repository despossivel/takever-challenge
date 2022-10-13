const mongoose = require('mongoose'),
    blowfish = require('../utils/blowfish');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        setDefaultOnInsert: true
    }
},
    {
        timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    })

    User.pre('save', function (next) {
        this.password = blowfish.encrypt(this.password);
        next();
    })
 

module.exports = mongoose.model('User', User)