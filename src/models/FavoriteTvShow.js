const mongoose = require('mongoose'),
 	mongoosePaginate = require('mongoose-paginate-v2'),
	 ObjectId = require('mongodb').ObjectID;
 
const favoriteTvShow = new mongoose.Schema({
		tv_show_id: {
			type: Number,
			require: true
		},
		user_id: {
			type: String,
			require: true
		},
	},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

	favoriteTvShow.plugin(mongoosePaginate);
	const Model = mongoose.model('favoriteTvShow', favoriteTvShow);

	Model.paginate().then({})

module.exports = Model;