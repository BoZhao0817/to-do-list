import React, {useState} from 'react';
import './App.css';

const INIT_TODO = [
    'create my first react app',
    'just hard coded staff',
    'drink water'
]

// component 1
function Todo({todo}) {
    return (
        <div className="todo">
            {todo}
        </div>

    )
}

// component 2
function TodoForm ({ addTodo }) {
    // prevent refresh when submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(value);

    }
    // value is variable that we wanna change, setValue is a function to change this value, defaut value = ''
    const [value, setValue] = useState('')
    return (
        // onsubmit event
        <form onSubmit={handleSubmit}>
            <input className="input"
                   value = {value}
                   onChange= {(e) => {setValue(e.target.value)}}
            />
        </form>

    )
}


function App() {
    // hooks to get v dynamically
    const [todos, setTodo] = useState(INIT_TODO)
    // functions to add new todos to original list
    const addTodo = (text) =>{
        // add todos before INIT_TODO
        const newTodo = [text, ...INIT_TODO]
        setTodo(newTodo)
    }
    return (
     <div className="app">
       <div className="todo-list">
         <TodoForm addTodo = {addTodo}/>
           {
               todos.map((v) =>(
                   <Todo key={v} todo={v}/>
               ))
           }
       </div>
     </div>
  );
}

export default App;
