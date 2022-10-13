const mongoose = require('mongoose'),
mongoosePaginate = require('mongoose-paginate-v2'),
	ObjectId = mongoose.Schema.Types.ObjectId;


    // {
    //     "id": 35624,
    //     "name": "The Flash",
    //     "permalink": "the-flash",
    //     "start_date": "2014-10-07",
    //     "end_date": null,
    //     "country": "US",
    //     "network": "The CW",
    //     "status": "Running",
    //     "image_thumbnail_path": "https://static.episodate.com/images/tv-show/thumbnail/35624.jpg"
    //   }

const mostPopular = new mongoose.Schema({
	id: {
		type: String,
		require: true
	},
	name: {
		type: String,
		require: true
	},
	permalink: {
		type: String,
		require: true
	},
	start_date: {
		type: Date,
		require: true
	},
	end_date: {
		type: Date,
		require: false
	},
	country: {
		type: String,
		require: true
	},
	network: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
    status: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
    image_thumbnail_path: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	}
},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

	mostPopular.plugin(mongoosePaginate);
	const Model = mongoose.model('mostPopular', mostPopular);
	Model.paginate().then({});

module.exports = Model;