var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
//var MONGODB_URL = "mongodb://admin:admin@ds044667.mlab.com:44667/test1";
//var db;
//MongoClient.connect(MONGODB_URL, function (err, database) {
//  if (err) throw err;
//  db = database;
//   console.log("Connected to " + MONGODB_URL);
//});

mongoose.connect('mongodb://admin:admin@ds044667.mlab.com:44667/test1', {useMongoClient: true});
mongoose.connection.on('error', console.error.bind(console, 'Connection error:'));

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { });

function getAllPosts(req, res) {
    //Get data from mongoDB
    var query = {};

    
    var sort = {create_date: -1}; 
    db.collection("posts").find(query).sort(sort).toArray(function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json(result);
    });
}

function getPostsByUser(req, res) {
   
    var query = {username : "Oly"};
    var sort = {create_date: -1};
    db.collection("posts").find(query).sort(sort).toArray(function (err, result) {
    if (err) throw err;
        res.json(result);
    });

}

function insertNewPosts(req, res) {
    //Insert new data to mongoDB
    
    var newpost = req.body;
    db.collection("posts").insertOne(newpost, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json(result.ops);
    });
}

module.exports = {

    getAllPosts : getAllPosts,
    getPostsByUser : getPostsByUser,
    insertNewPosts : insertNewPosts

};
