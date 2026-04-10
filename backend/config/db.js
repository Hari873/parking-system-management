const mongoose = require('mongoose');

const configureDB = async function(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to DB");
    }catch(err){
        console.log("Error setting up the DB");
    }
}

module.exports = configureDB;