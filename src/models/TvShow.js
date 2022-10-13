const mongoose = require('mongoose'),
 	mongoosePaginate = require('mongoose-paginate-v2');
 
const tvShow = new mongoose.Schema({
	id: {
		type: Number,
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
	url: {
		type: String,
		require: true
	},
	description: {
		type: String,
		require: true
	},
	description_source: {
		type: String,
		require: true
	},
	start_date: {
		type: Date,
		require: true,
		setDefaultOnInsert: true
	},
	end_date: {
		type: Date,
		require: true,
		setDefaultOnInsert: true
	},
	country: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	status: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	runtime: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	network: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	youtube_link: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	image_path: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	image_thumbnail_path: {
		type: String,
		require: true,
		setDefaultOnInsert: true
	},
	rating: {
		type: mongoose.Types.Decimal128,
		require: true,
		setDefaultOnInsert: true
	},
	rating_count: {
		type: Number,
		require: true,
		setDefaultOnInsert: true
	},
	countdown: {
		type: Number,
		require: true,
		setDefaultOnInsert: true
	},
	genres: [{
		type: String
	}],
	pictures: [{
		type: String
	}],
	episodes: [
		{
			season: {
				type: Number,
				require: true,
				setDefaultOnInsert: true
			},
			episode: {
				type: Number,
				require: true,
				setDefaultOnInsert: true
			},
			name: {
				type: String,
				require: true,
				setDefaultOnInsert: true
			},
			air_date: {
				type: Date,
				require: true,
				setDefaultOnInsert: true
			}
		  }
	],

},
	{
		timestamps: true,
		upsert: true,
		new: true,
		setDefaultsOnInsert: true
	});

	tvShow.plugin(mongoosePaginate);

	const Model = mongoose.model('tvShow', tvShow);

	Model.paginate().then({})

module.exports = Model;