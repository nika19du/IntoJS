import React,{useState,useRef,useEffect} from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid'; 

const LOCAL_STORAGE_KEY='todoApp.todos'

function App() {
  const [todos,setTodos]=useState([])//passing the default state-empty arr cuz we doesnt have todos already
  const todoNameRef=useRef()

  //storing in localStorage
  useEffect(()=>{
    const storedTodos=JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos)
      setTodos(storedTodos)
  },[])//it calls only one cuz we have [] arr

  //getting the todos
  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])//every thing smth change we call this func

  function toggleTodo(id){
    const newTodos=[...todos];//copy before modifing
    const todo=newTodos.find(todo=>todo.id===id);
    todo.complete=!todo.complete;
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name=todoNameRef.current.value
    if(name === '') return
    setTodos(prevTodos=>{
      return [...prevTodos,{id:uuidv4(),name:name,complete:false}]
    })
    todoNameRef.current.value=null
  }

  function handleClearTodos(){
    const newTodos=todos.filter(todo=>!todo.complete)
    setTodos(newTodos)
  }

  return  (
    <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type="text"/>
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo=>!todo.complete).length} left to do</div>
    </>
  )
}

export default App;
