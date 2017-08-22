const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressValidator());
app.use('/public', express.static('public'));
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

const todos = [{
    name: "Finish Daily Project",
    done: false,
    id: 1
  },
  {
    name: "Feed the Dogs",
    done: true,
    id: 2
  }
];
const completedTODO = [];
app.get("/", function(req, res) {
  res.render('list', {todos: todos});
});

app.post("/", function(req, res) {
  const addtodo = req.body.newtodo;
  let max = 0
  for (var i = 0; i < todos.length; i++) {
    if (max < todos[i].id) {
      max = todos[i].id
    }
  }
  let todo = {
    name: addtodo,
    done: false,
    id: max + 1
  }
  todos.push(todo);
  res.redirect('/');
});

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
