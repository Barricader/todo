import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO: check if empty

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <input ref={node => {input = node;}}/>
                <button onClick={() => {addTodo(input.value); input.value = '';}}>+</button>
            </form>
        </div>
    );
};

const Todo = ({todo, remove}) => {
    // Each todo item
    // return (<li onClick={() => remove(todo.id)}>{todo.text}</li>);
    return (
    <li>
        <p>{todo.text}</p><span onClick={() => remove(todo.id)}>X</span>
    </li>
    );
};

const TodoList = ({todos, remove}) => {
    // Map through todos
    const todoNode = todos.map((todo) => {
       return (<Todo key={todo.id} todo={todo} remove={remove}/>);
    });

    return (<ul>{todoNode}</ul>);
};

const Title = ({todoCount}) => {
    return (
      <div>
          <div>
              <h1>Todo ({todoCount})</h1>
          </div>
      </div>
    );
}

window.id = 0;
class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    addTodo(value) {
        const todo = {text: value, id: window.id++};
        // TODO: change to use state

        this.state.data.push(todo);

        this.setState({data: this.state.data});
    }

    handleRemove(id) {
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) {
                return todo;
            }
        });

        this.setState({data: remainder});
    }

    render() {
        return (
            <div>
                <Title todoCount={this.state.data.length}/>
                <TodoForm addTodo={this.addTodo.bind(this)}/>
                <TodoList todos={this.state.data} remove={this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

// ----------------------------

ReactDOM.render(<TodoApp />, document.getElementById('container'));