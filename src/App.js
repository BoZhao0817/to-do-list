import React, {useEffect, useState} from 'react';
import './App.css';

const removeIcon = <i className="far fa-trash-alt"/>
const completedIcon = <i className="far fa-check-circle"/>
const incompleteIcon = <i className="far fa-circle"/>

const INIT_TODO = [
    {
        text: 'create my first react app',
        isComplete: false,
    },
    {
        text: 'just hard coded staff',
        isComplete: false,
    },
    {
        text: 'drink water',
        isComplete: false,
    }
]

// component 1
// plug in todos and fucntions
function Todo({todo, removeTodo, completeTodo, index}) {
    return (
        <div className="todo"
             onClick={() => completeTodo(index)}>

            <div className="task"
                 style = {{textDecoration: todo.isComplete ? 'line-through' :''}}
            >
                {/*true : false*/}
                { todo.isComplete ? completedIcon : incompleteIcon}
                {todo.text}
            </div>
            {/*add onclick event on the icon, and the event return a function to delete the item*/}
            <a className="remove" href="#!" onClick={(e) => removeTodo(e, index)}>
                { removeIcon }
            </a>
        </div>

    )
}

// component 2
function TodoForm ({ addTodo }) {
    // prevent refresh when submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        // check if no content added
        if (!value) return;
        addTodo(value);
        // clear input form
        setValue("");

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
    // hooks to get v dynamically, set the original state
    // check if localstorage is empty, if so init_todo, else, localStorage
    // localstorage.clear() clear all
    // localStorage.removeItems(todos)
    // local storage可存储多张照片
    const [todos, setTodo] = useState( JSON.parse(localStorage.getItem('todos'))||INIT_TODO)

    //check state change = componentDidMount
    // callback是一个空array？check change of the array?
    useEffect(() => {
        // store todos in local Stotage
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    // functions to add new todos to original list
    const addTodo = (text) =>{
        // add todos before INIT_TODO
        const newTodo = [{ text }, ...INIT_TODO];
        setTodo(newTodo);
    }
    //function to remove todo
    const removeTodo = (e, index) => {
        // must plug in index to delete certain todo
        // console.log(index)
        e.preventDefault();
        e.stopPropagation();
        const newTodo = [...todos];
        newTodo.splice(index, 1);
        setTodo(newTodo);

    }
    //function to complete todo
    const completeTodo = (index) => {
        // why copy before complete or delete?
        const newTodos = [...todos];
        newTodos[index].isComplete = true;
        setTodo(newTodos);
    }

    return (
     <div className="app">
       <div className="todo-list">
         <TodoForm addTodo = {addTodo}/>
           {
               todos.map((v, index) =>(
                   <Todo
                       removeTodo ={removeTodo}
                       completeTodo={completeTodo}
                       index={index}
                       //*key={index}就可以，只要是个唯一的值
                       // key props无法读取 不是给child的， need to be unique
                       key={index} todo={v}/>
               ))
           }
       </div>
     </div>
  );
}

export default App;
