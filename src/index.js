import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// TODO: check if empty
// TODO: splite newlines into seperate todos

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;

    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault();}}>
                <input type="text" ref={node => {input = node;}}/>
                <button onClick={() => {addTodo(input.value); input.value = '';}}>+</button>
            </form>
        </div>
    );
};

const Todo = ({todo, done, remove}) => {
    // Each todo item
    return (
    <li>
        <div class="checkbox"><input type="checkbox" checked={todo.done} onClick={() => done(todo.id)} /></div><p class={todo.done && "p-checked"}>{todo.text}</p><span onClick={() => remove(todo.id)}>X</span>
    </li>
    );
};

const TodoList = ({todos, done, remove}) => {
    // Map through todos
    const todoNode = todos.map((todo) => {
       return (<Todo key={todo.id} todo={todo} done={done} remove={remove}/>);
    });

    return (<ul>{todoNode}</ul>);
};

const Title = ({todoCount, finishedTodo}) => {
    return (
      <div>
          <div>
              <h1>Todo ({finishedTodo} / {todoCount})</h1>
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
        var re_test = /[A-Za-z0-9!@#$%^&*()]/;

        if (value.length > 0 && value.match(re_test)) {
            const todo = {text: value, id: window.id++, done: false};

            this.state.data.push(todo);

            this.setState({data: this.state.data});
        }
    }

    handleRemove(id) {
        const remainder = this.state.data.filter((todo) => {
            if (todo.id !== id) {
                return todo;
            }

            return null;
        });

        this.setState({data: remainder});
    }

    handleDone(id) {
        const todoList = this.state.data;
        
        todoList.forEach((todo) => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
        });

        this.setState({data: todoList});
    }

    render() {
        const finishedTodos = this.state.data.filter((todo) => {
            if (todo.done) {
                return todo;
            }

            return null;
        });

        return (
            <div>
                <Title todoCount={this.state.data.length} finishedTodo={finishedTodos.length}/>
                <TodoForm addTodo={this.addTodo.bind(this)}/>
                <TodoList todos={this.state.data} done={this.handleDone.bind(this)} remove={this.handleRemove.bind(this)}/>
            </div>
        );
    }
}

// ----------------------------

ReactDOM.render(<TodoApp />, document.getElementById('container'));