const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 2001;
const todoRoutes = express.Router();

let Todo = require('./todo.model');


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongodb database connection established successfully');
});

todoRoutes.route('/').get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route('/:id').get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
});

todoRoutes.route('/add').post((req, res) => {
  let todo = new Todo(req.body);
  todo.save()
      .then( todo => {
        res.status(200).json({'todo': 'todo added successfully'});
      })
      .catch(err => {
        res.status(400).send('Insertion failed');
      });
});

todoRoutes.route('/update/:id').post((req, res) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (!todo) {
      res.status(400).send('Data not found');
    } else {
      todo.todo_description = req.body.todo_description;
      todo.todo_responsible = req.body.todo_responsible;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;
      todo.save()
          .then(todo => {
            res.json('Todo Updated!');
          })
          .catch(err => {
            res.status(400).send("Update Failed");
          });
    }
  });
});

app.use('/todos', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});