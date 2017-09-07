//boiler plate

const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const app = express();
const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
const url = 'mongodb://localhost:27017/todo';


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/public', express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')


//sends you to the root page
const completedTODO = [];
app.get("/", function(req, res) {
  let collection = database.collection('todos');
  // getting the todo list from mongo
  collection.find({}).toArray(function(err, todos) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(todos)
    res.render('list', {todos});
  });
});

//adds a new item to the todo list
app.post("/", function(req, res) {
  const addtodo = req.body.newtodo;
  let collection = database.collection('todos');
  collection.find({}).toArray(function(err, todos){
    let todonew = {
      name: addtodo,
      done: false,
      id: todos.length
    }
    collection.insertOne(todonew),function(err, result){
      console.log("Updated the document with a new todo");
    res.render('list', {todonew});
  }

})
  res.redirect('/')
})


//this takes the id and allows you update the todo to true and move it to complete
app.post("/:id", function(req, res) {
  let id = parseInt(req.params.id)
  // let idn = number(id)
  todos.forEach((todo) => {
    console.log("I am the id ", typeof id);
    console.log("I am the todo id", typeof todo.id);
    if (id === todo.id)
    {
      console.log("hello work");
      console.log(todo.done);
      todo.done = true;
      console.log("setting " + todo.name + " to true");
    }
  })
  res.render('list', {todos: to});
});


//where we are listening
app.listen(3000, function() {
  console.log('Successfully started express appslication!');
});


//boiler plate
let database;
MongoClient.connect(url, function(err, todo) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  database = todo
});
process.on('SIGINT', function() {
  console.log("\nshutting down");
  database.close(function () {
    console.log('mongodb disconnected on app termination');
    process.exit(0);
  });
});
