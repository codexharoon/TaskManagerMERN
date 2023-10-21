const mongoose = require('mongoose');
require('dotenv').config();

module.exports = mongoose.connect(process.env.MONGO_URL,{
    dbName : 'TaskManager'
}).then(
    ()=>{console.log('DB Connected!');}
).catch(
    (error)=>console.log(`Error to connect to Database, Error : ${error}`)
);