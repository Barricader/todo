import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const TodoForm = ({addTodo}) => {
    // Input tracker
    let input;

    return (
        <div>
            <input ref={node => {input = node;}}/>
            <button onClick={() => {addTodo(input.value); input.value = '';}}>+</button>
        </div>
    );
};

const Todo = ({todo, remove}) => {
    // Each item
    return (<li onClick={() => remove(todo.id)}>{todo.text}</li>);
};

const TodoList = ({todos, remove}) => {
    // Map through todos
    const todoNode = todos.map((todo) => {
       return (<Todo key={todo.id} todo={todo} remove={remove}/>);
    });

    return (<ul>{todoNode}</ul>);
};

const Title = () => {
    return (
      <div>
          <div>
              <h1>Todo</h1>
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

        this.setState({date: this.state.data});
    }

    render() {
        return (
            <div>
                <Title/>
                <TodoForm/>
                <TodoList todos={[{id: 999, text: 'Text'}]}/>
            </div>
        );
    }
}

// ----------------------------

ReactDOM.render(<TodoApp />, document.getElementById('container'));