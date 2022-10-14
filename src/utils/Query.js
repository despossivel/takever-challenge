

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


module.exports = {
    resolveQuerys
}