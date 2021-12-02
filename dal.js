const MongoClient = require('mongodb').MongoClient;
const url         = 'mongodb://localhost:27017';
let db            = null;

MongoClient.connect(url, {UseUnifiedTopology: true }, function(err, client) {
    console.log('Connected!')

    // database Name
    const dbName = 'myproject';
    db = client.db(dbName);
});

//create user account
function create(name, email, password) {
    return new Promise((res,rej) => {
        const collection =db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? rej(err) : res(doc);
        })
    })
}

//all users
function all() {
    return new Promise((res,rej) => {
        const costumers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs){
                err ? rej(err) : res(docs)
        })
    })
}

module.exports = {create, all};