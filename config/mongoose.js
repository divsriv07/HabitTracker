const mongoose = require('mongoose');
// connecting to mongoose
mongoose.connect('mongodb://127.0.0.1:27017/');
// mongoose database connection
const db = mongoose.connection;
db.on('error',console.error.bind(console,"Error connecting to MongoDb"));

db.once('open',function(){
    console.log('Connected to Database :: MondoDB');
});

module.exports=db;