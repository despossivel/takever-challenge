const axios = require('axios').default,
    { getOmdbActors } = require('./omdb'),
    host = 'https://www.episodate.com/api';

 const getMostPopular = async () => {
     try{
       
         let pages = 1,
          allTvShows = [];
          
         for (let page = 1; page <= pages; page++) {
             console.log(`Buscando pagina ${page}...`)
             const response = await axios.get(`${host}/most-popular?page=${page}`);
             allTvShows = [...allTvShows, ...response.data.tv_shows];
         }
         return allTvShows;
     }catch(e){
         throw e;
     }   
 }

 const getDetails = async (q) => {
     try{
         const { data } = await axios.get(`${host}/show-details?q=${q}`);
         let tvShow = false;
 
        if(typeof data === 'object'){
            const omdbResponse = await getOmdbActors(data?.tvShow?.name),
            actors = omdbResponse?.actors  ? omdbResponse?.actors?.split(",").map(item=>item.trimStart()) : [],
            type = omdbResponse?.type;

            if(data?.tvShow){
                tvShow = data?.tvShow;
                tvShow.actors = actors;
                tvShow.type = type;
            }
 
        }
 
         return tvShow;

     }catch(e){
         throw e;
     }   
 }
  
 module.exports = {
    getMostPopular,
    getDetails
 };