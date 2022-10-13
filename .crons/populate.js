const mongoose = require('mongoose')

const axios = require('axios').default;


const connection = mongoose.connect(`mongodb+srv://dev:qazx123.@cluster0-ep251.gcp.mongodb.net/takever`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Mongoose se conectou som sucesso ao banco Dev!`)
}).catch(e => console.error(e))


// https://www.episodate.com/api/most-popular?page=1
// https://www.episodate.com/api/show-details?q=the-flash

const { parseISO, isAfter, addDays } = require('date-fns')

const TvShow = require('../src/models/TvShow');
const MostPopular = require('../src/models/MostPopular');

const run = async () => {
    await Promise.all([MostPopular.deleteMany({}), TvShow.deleteMany({})])
 
  
    const [ mostPopular ] = await Promise.all([getMostPopular()])
    const INSERT = await MostPopular.insertMany(mostPopular)
    console.log('Buscando detalhes por tv show...')
    INSERT.map(async ({permalink})=>{
        const response = await getDetails(permalink);
        if(response) await TvShow.create(response);
         
        console.log(`Salvando detalhes de ${permalink}`);

    })

   return;
}


    const host = 'https://www.episodate.com/api'
    const getMostPopular = async () => {
        try{
          
            let pages = 1; //1115
            let allTvShows = [];
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
            return  typeof data === 'object' ? data?.tvShow : false;
        }catch(e){
            throw e;
        }   
    }
    



 
 run()
 
