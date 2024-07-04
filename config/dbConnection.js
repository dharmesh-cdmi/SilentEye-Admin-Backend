var dotenv = require('dotenv');
var mongoose = require('mongoose');

dotenv.config();

var dbConnect = function() {
  return mongoose.connect(process.env.MONGO_URI)
    .then(function() {
      console.log('MongoDb Connected Successfully: ' + mongoose.connection.host);
    })
    .catch(function(error) {
      console.log('Error while connecting to DB: ' + error.message);
      process.exit(1);
    });
};

module.exports = dbConnect;
