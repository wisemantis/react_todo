import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(
        res => this.setState({ todos: res.data })
        )	
  }

  // Toggle Complete
  markComplete = (id) => { 
    this.setState({ todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  // Delete Todo
  delTodo = (id) => { 
    axios.delete('https://jsonplaceholder.typicode.com/todos/${id}')
    .then(      
      this.setState({ todos: [...this.state.todos.filter(todo => todo.id!== id)] }) 
    );
  }

  // Add Todo
  addTodo = (title, listId) => { 
    console.log(listId);
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false,
      userId: listId
    }).then(
      res => this.setState({todos: [...this.state.todos,res.data]})
    );
  }

  render() {
    return (
      <Router>
        <div className="App">    
          <div className="containter">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                
  	            <div className="list">
                  <AddTodo addTodo={this.addTodo} listId="1" />
                  <Todos todos={this.state.todos.filter(todo => todo.userId==1)} markComplete={this.markComplete} delTodo={this.delTodo}/></div>
                <div className="list">
                  <AddTodo addTodo={this.addTodo} listId="2" />
                  <Todos todos={this.state.todos.filter(todo => todo.userId==2)} markComplete={this.markComplete} delTodo={this.delTodo}/></div>
                <div className="list">
                  <AddTodo addTodo={this.addTodo} listId="3" />
                  <Todos todos={this.state.todos.filter(todo => todo.userId==3)} markComplete={this.markComplete} delTodo={this.delTodo}/></div>              
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
          </div>
        </div> 
      </Router> 
    );
  }
}

export default App;
