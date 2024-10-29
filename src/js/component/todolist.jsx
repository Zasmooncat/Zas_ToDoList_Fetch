import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2'




const ToDoList = () => {

    const [thingsToDO, setThingsToDo] = useState([]) //lista
    const [newTask, setNewTask] = useState({
        id: "",
        task: "",
        isLocked: false
    }) //input
    const [iconVisible, setIconVisible] = useState(-1)
    console.log(newTask);

// comprobar si cuando carga hay elementos en localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setThingsToDo(savedTasks);
    }, []);

    // Guardar lista en localStorage cuando cambie

     useEffect(() => {
        const lockedTasks = thingsToDO.filter(task => task.isLocked);
        localStorage.setItem("tasks", JSON.stringify(lockedTasks));
    }, [thingsToDO]);



    // funcion añadir tarea

    const addNewTask = (e) => {
        e.preventDefault();
        const newList = [...thingsToDO];
        if (newTask.task === "") {
            return
        }

        newList.push(newTask);
        setThingsToDo(newList);
        setNewTask({
            id: "",
            task: "",
            isLocked: false
        })
    }
    



    //funcion eliminar tarea

    const deleteNewTask = (index) => {

        setThingsToDo((prevList) => prevList.filter((_, i) => i !== index))
        setIconVisible(-1)

    }

    // funcion editar tarea

    const editNewTask = (index) => {
        const taskToEdit = thingsToDO[index];
        const updatedTask = prompt("Edita la tarea:", taskToEdit.task);
        
        if (updatedTask) {
            const updatedList = thingsToDO.map((task, i) => 
                i === index ? { ...task, task: updatedTask } : task
            );
            setThingsToDo(updatedList);
        }
    };

    

    const toggleLockTask = (index) => {
        const updatedList = thingsToDO.map((task, i) => 
            i === index ? { ...task, isLocked: !task.isLocked } : task
        );
        setThingsToDo(updatedList);
    };


    return (

        <>
            <div className="wrapper p-5 container col-11 col-md-5 border mt-5 rounded-3">
                <h1 className="titulo text-center mb-4">Lista de tareas</h1>
                <div className="container text-center">

                    <div className="inputAndButton d-flex justify-content-center">

                        <form onSubmit={addNewTask}>

                            <input name="tarea" type="text" className="new-task" placeholder="Nueva tarea"
                                required
                                value={newTask.task} // el input hace referencia al newTask
                                onChange={(e) => setNewTask({ id: uuidv4(), task: e.target.value })} //le damos el value del input(target.value) a newTask mediante la funcion setNewTask
                            />
                            <button type="submit" className="addButton"
                                onClick={addNewTask}>+</button>

                        </form>






                    </div>



                    <div className="tasks col-8 m-auto">

                        <ol>
                            {thingsToDO.map((tarea, index) => (

                                <li className=" p-2 m-2" onMouseEnter={() => setIconVisible(index)}
                                    onMouseLeave={() => setIconVisible(-1)}
                                    key={tarea.id}>{tarea.task}
                                    {iconVisible == index && (
                                        <>
                                            <button className="boton boton-edit " onClick={() => editNewTask(index)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className="boton boton-block " onClick={() => toggleLockTask(index)}> {tarea.isLocked ? <i className="fas fa-lock"></i> : <i className="fas fa-unlock"></i>}</button>
                                            <button className="boton " onClick={() => deleteNewTask(index)}><i className="fas fa-times"></i></button>
                                        </>
                                    )}

                                </li>
                            ))}
                        </ol>


                        <p className="foot text-center mt-5">{thingsToDO.length == 0 ? "No tienes tareas pendientes" :
                            thingsToDO.length == 1 ? "Tienes " + thingsToDO.length + " tarea pendiente" :
                                "Tienes " + thingsToDO.length + " tareas pendientes"}</p>
                    </div>
                </div>
            </div>

        </>
    )
}




export default ToDoList;