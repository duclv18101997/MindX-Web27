import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './components/TodoItem';
// const App = (props) => {
//   return (
//     <div>Hello React</div>
//   );
// };

class App extends React.Component {
  //state la noi luu tru du lieu
  state = {
    inputValue: '',
    todos: [],  //{content: '', finished: true/false}
  };

  updateTodoItem = (itemIndex) => {
    this.setState({
      todos: this.state.todos.map((value, index) => {
        if(index === itemIndex){
          //return
          return {
            ...value,
            finished: true,
          }
        }else{
          return value;
        }
      }),
    })
  }

  deleteTodoItem = (itemIndex) => {
    this.setState({
      todos: this.state.todos.filter((value, index) => {
        if(index === itemIndex){
          //return
          return false;
        }else{
          return true;
        }

        //return index!==itemIndex
      }),
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      content: this.state.inputValue,
      finished: false,
    };
    this.setState({
      inputValue: '',
      todos: [...this.state.todos, newTodo],
    });
    
  };

  handleInputChange = (event) => {
    const newValue = event.target.value;
    this.setState({
      inputValue: newValue,
    });

  
  };

  render() {
    return (
      <div className='container'>
        <div className='result'>
          {this.state.todos.map((value, index) => {
            return(
              <TodoItem 
              updateTodoItem = {this.updateTodoItem}
              deleteTodoItem = {this.deleteTodoItem}
              value={value.content}
              finished = {value.finished}
              itemIndex = {index}
              key={index}/>
            );
          })}
        </div>

        <div className='todo-form'>
          <form className="form-inline mt-5" onSubmit={this.handleSubmit}>
           <input type="text"
             className="form-control mb-2 mr-sm-2"
             id="inlineFormInputName2"
             placeholder="Add a work"
             value={this.state.inputValue}
             onChange={this.handleInputChange}
             />
            <button type="submit" className="btn btn-primary mb-2">+Add</button>
          </form>
        </div>
      </div>
    );
  }
}


export default App;
