require('dotenv').config();
const mongoose = require('mongoose');
// auth en MongoDB basado en https://www.youtube.com/watch?v=LpEfacrnpUs


// TODO: Compatibilizar ambos formatos
const MONGODB_URI = process.env.MONGO_PROTOCOL + process.env.MONGODB_USER + ':' + process.env.MONGODB_PASSWORD + '@'
    + process.env.MONGODB_HOST + ':'
    + process.env.MONGODB_PORT + '/'
    + process.env.MONGODB_DB_NAME + 'authSource=admin';


//const MONGODB_URI = process.env.MONGODB_URI_DIRECT;
console.log(MONGODB_URI)

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db => console.log('Base de datos conectada!'))
    .catch(err => console.log('Error: ' + err));

module.exports = mongoose