

const resolveQuerys = (queryParams) => {
	let query = {};
    
    const { genre, actor, type } = queryParams;

	if(genre) {
        query = { genres: { "$in" : typeof genre == 'object' ? genre : [genre]} };
    }
    if(actor) {
        query = { actors: { "$in" : typeof actor == 'object' ? actor : [actor]}, ...query };
    }
    if(type) {
        query = { type, ...query };
    }


    return query;


}


const resolveOptions = (query) => {
    const { page = 1, limit = 10, sort_field = 'name', sort_direction = -1 } = query,
    options = {
        page: page,
        limit: limit,
        sort: { [sort_field]: sort_direction  },
        collation: { 
            locale: 'en'
        }
    };

    return options;
};


module.exports = {
    resolveQuerys,
    resolveOptions
}