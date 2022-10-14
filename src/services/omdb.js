const axios = require('axios').default,
    host = 'https://www.omdbapi.com',
    apikey = '9e0debd5';

 const getOmdbActors = async (t) => {
    try{
        const { data } = await axios.get(`${host}/?t=${t}&apikey=${apikey}`);
        return  data.Actors;
    }catch(e){
        throw e;
    } 
}

module.exports = {
    getOmdbActors
}