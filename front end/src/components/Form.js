import React,{useState} from "react";

export default function Form(props){

    const [name, setName] = useState('');

    function handleSubmit(e){
        //if(e.value = "")
          //alert("enter a name!");
        e.preventDefault();
        
        const data = {"name": name, "status": false};
        fetch("http://localhost:3001/todos", {
            method : 'Post' ,
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            .then(response => response.json())
                .then(data => {
                props.addTaskForm(data.name, data._id);        
                console.log('Success:', data);
                })
                .catch((error) => {
                console.error('Error:', error);
            });

        setName('');
    }

    function handleChange1(e) {
        setName(e.target.value);
    }

    return(
        <form onSubmit = {handleSubmit}>
            <h2 className="label-wrapper">
            <label htmlFor="new-todo-input" className="label__lg">
                What needs to be done?
            </label>
            </h2>
            <input type="text" id="new-todo-input" className="input input__lg" name="text" autoComplete="off" value = {name}
                onChange = {handleChange1}/>
            <button type="submit" className="btn btn__primary btn__lg">
            Add
            </button>
        </form>
    );
}