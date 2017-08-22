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

// const todos = [{
//     name: "Finish Daily Project",
//     done: false,
//     id: 1
//   },
//   {
//     name: "Feed the Dogs",
//     done: true,
//     id: 2
//   }
// ];
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

app.post("/", function(req, res) {
  const addtodo = req.body.newtodo;
  let max = 0
  for (var i = 0; i < todos.length; i++) {
    if (max < todos[i].id) {
      max = todos[i].id
    }
  }
  let todonew = {
    name: addtodo,
    done: false,
    id: max + 1
  }
  let collection = database.collection('todos');
  collection.find({}).toArray(function(err, todos){
    collection.updateOne()(function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Updated the document with a new todo");
    res.render('list', {todos});
  })
  res.redirect('/')
})
})

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
  // res.redirect('/');
  res.render('list', {todos: todos});
});

app.listen(3000, function() {
  console.log('Successfully started express appslication!');
});

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
