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
		require: true
	},
	end_date: {
		type: Date,
		require: true
	},
	country: {
		type: String,
		require: true
	},
	status: {
		type: String,
		require: true
	},
	runtime: {
		type: String,
		require: true
	},
	network: {
		type: String,
		require: true
	},
	youtube_link: {
		type: String,
		require: true
	},
	image_path: {
		type: String,
		require: true
	},
	image_thumbnail_path: {
		type: String,
		require: true
	},
	rating: {
		type: Number,
		require: true
	},
	rating_count: {
		type: Number,
		require: true
	},
	// countdown: {
	// 	type: Number,
	// 	require: false,
	// 	setDefaultOnInsert: 0
	// },
	type: {
		type: String,
		require: true,
		setDefaultOnInsert: ''
	},
	genres: [{
		type: String
	}],
	actors: [{
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

			},
			episode: {
				type: Number,
				require: true,

			},
			name: {
				type: String,
				require: true,

			},
			air_date: {
				type: Date,
				require: true,

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