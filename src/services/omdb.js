const axios = require('axios').default,
    host = process.env.OMDB,
    apikey = process.env.OMDB_API_KEY;

 const getOmdbActors = async (t) => {
    try{
        const { data } = await axios.get(`${host}/?t=${t}&apikey=${apikey}`);
        return  {
            actors: data.Actors,
            type: data.Type
        };
    }catch(e){
        throw e;
    } 
}

module.exports = {
    getOmdbActors
}