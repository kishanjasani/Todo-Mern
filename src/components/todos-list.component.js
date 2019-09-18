import React, { Component } from "react";
import axios from 'axios';
import {Link} from 'react-router-dom';

const Todo = ( props ) => (
  <tr>
    <td>{props.todo.todo_description}</td>
    <td>{props.todo.todo_responsible}</td>
    <td>{props.todo.todo_priority}</td>
    <td>
      <Link to={`/edit/${props.todo._id}`}>Edit</Link>
    </td>
  </tr>
);

class TodosList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  componentDidMount = () => {
    axios.get('http://127.0.0.1:2001/todos/')
         .then(res => {
           this.setState({todos: res.data});
         })
         .catch(err => {
            console.log(err);
         });
  }

  todoList = () => {
    return this.state.todos.map((todo, i) => {
      return <Todo todo={todo} key={i} />;
    });
  }

  render() {

    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Desctiption</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.todoList()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TodosList;