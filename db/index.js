const mongoose = require('mongoose');

//Mongoose conection
mongoose.connect('mongodb://localhost/db_logs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log("MongoDB Connected...");
});

module.exports = db