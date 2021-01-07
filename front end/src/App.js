//import logo from './logo.svg';
//import './App.css';
import React,{useEffect,useRef,useState} from "react";
import Todo from './components/Todo';
import Form from './components/Form';
import FilterButton from './components/FilterButton';
import Lame from './components/lame';
import { nanoid } from "nanoid";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

let a = "press me";
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  const [filter, setFilter] = useState('All');
  const [tasks, setTasks] = useState([]);
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => 
    (<Todo id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskcompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));
      
useEffect(() => {
  fetch("http://localhost:3001/todos").
  then(response => {
    return (response.json());
  })
  .then(response => {
    console.log(response);
    const dbTasks = response.map(dbTask => ({
      id: dbTask._id,
      name: dbTask.name,
      completed: dbTask.status
    }));
    setTasks(dbTasks);
    console.log(dbTasks);
  })
}, [tasks.size])

  const filterList = FILTER_NAMES.map(name => (
    <FilterButton key={name} name={name}  isPressed={name === filter} setFilter={setFilter}/>
  ));

  const tasksNoun = taskList.length !== 1 ? 'tasks' : 'task';
  const headingText = `${taskList.length} ${tasksNoun} remaining`;

  function lamer(){
    alert("hey");
  }

  function addTask(name, id) {
    const newTask = {id: id, name: name, completed: false};
    //tasks is a state variable
    //newTask is a new task to be added to tasks
    setTasks([...tasks, newTask]);//Adding new task "newTask" to "tasks" state array
    alert(name);
  };
  
  function toggleTaskcompleted(id){
    const matchedTAsk = tasks.filter(task => task.id == id);
    fetch("http://localhost:3001/todos/"+id,
      {
        method: "PATCH",  
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify({name: matchedTAsk[0].name, status: !matchedTAsk[0].completed})
      }
    ).then(response => {
      console.log(response.status);
      toggleTaskcompletedReact(id);
    });

  }

  function toggleTaskcompletedReact(id){
    
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    
    setTasks(updatedTasks);
    console.log(updatedTasks);
  }
  
  function deleteTask(id){
    const remainingTasks  = tasks.filter(task => id != task.id)
    setTasks(remainingTasks);
  }

  function editTask(id, newName){
    const editedTaskList = tasks.map(task =>{
      if(id == task.id){
        return {...task, name:newName}
      }
      return task;
    });
    setTasks(editedTaskList)
  }


  const listHeadingRef = useRef(null);
  const prevTaskLength = usePrevious(tasks.length); 
  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTaskForm = {addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {headingText}
      </h2>
      <ul
        role = "list"
        className = "todo-list stack-large stack-exception"
        aria-labelledby = "list heading"
        >
          {taskList}
      </ul>
    </div>
  );
}

export default App;
