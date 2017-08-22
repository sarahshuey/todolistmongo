const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017/todo';

// Use connect method to connect to the server
let database;
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = db
});
process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function () {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});

// var findTodos = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('todos');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

let collection = database.collection('todos');
// Update document where a is 2, set b equal to 1
collection.updateOne({ a : 2 }
  , { $set: { b : 1 } }, function(err, result) {
  assert.equal(err, null);
  assert.equal(1, result.result.n);
  console.log("Updated the document with the field a equal to 2");
  callback(result);
});
}
