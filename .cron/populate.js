const mongoose = require('mongoose'),
    axios = require('axios').default,
 { getMostPopular, getDetails } = require('../src/services/episodate');


const connection = mongoose.connect(`mongodb+srv://dev:qazx123.@cluster0-ep251.gcp.mongodb.net/takever`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Mongoose se conectou som sucesso ao banco Dev!`)
}).catch(e => console.error(e))

  
const TvShow = require('../src/models/TvShow');
const MostPopular = require('../src/models/MostPopular');
const FavoriteTvShow = require('../src/models/FavoriteTvShow');


const run = async () => {
 
    await Promise.all([MostPopular.deleteMany({}), 
        TvShow.deleteMany({}),
        FavoriteTvShow.deleteMany({})])
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
 

 
 run()
 
 
