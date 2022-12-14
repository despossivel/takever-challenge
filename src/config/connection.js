const mongoose = require('mongoose')
const connection = mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Mongoose has successfully connected to the database ${process.env.DB_NAME}!`)
}).catch(e => console.error(e))

module.exports = () => connection;