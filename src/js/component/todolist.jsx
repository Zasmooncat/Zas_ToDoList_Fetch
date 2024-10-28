import React from "react";
import { useState, useEffect } from "react";




const ToDoList = () => {

    const [thingsToDO, setThingsToDo] = useState([]) //lista
    const [newTask, setNewTask] = useState("") //input
    const [iconVisible, setIconVisible] = useState(-1)
    console.log(newTask);




    // funcion añadir tarea

    const addNewTask = (e) => {
        e.preventDefault();
        const newList = [...thingsToDO];
        if (newTask === "") {
            return
        }

        newList.push(newTask);
        setThingsToDo(newList);
        setNewTask("")
    }

    //funcion eliminar tarea

    const deleteNewTask = (index) => {

        setThingsToDo((prevList) => prevList.filter((_, i) => i !== index))
        setIconVisible(-1)
    }





    // const tasksLeft = () => {

    //     thingsToDO.length === 0 ? "" : thingsToDO.length + " tasks left"
    //     return tasksLeft
    // }






    return (

        <>
            <div className="wrapper p-5 container col-11 col-md-5 border mt-5
             rounded-3">
                <h1 className="titulo text-center mb-4">Lista de tareas</h1>
                <div className="container text-center">

                    <div className="inputAndButton d-flex justify-content-center">

                        <form onSubmit={addNewTask}>

                            <input name="tarea" type="text" className="new-task" placeholder="Nueva tarea"
                                required
                                value={newTask} // el input hace referencia al newTask
                                onChange={(e) => setNewTask(e.target.value)} //le damos el value del input(target.value) a newTask mediante la funcion setNewTask
                            />
                            <button type="submit" className="addButton"
                                onClick={addNewTask}>+</button>

                        </form>






                    </div>

                    {/* {thingsToDO.length === 0 ? <p className=" nohay text-danger fst-italic pt-2">No hay tareas. Añade una nueva</p> : ""} */}

                    <div className="tasks col-8 m-auto">
                        
                            <ol>
                                {thingsToDO.map((task, index) => (

                                    <li className="bg-white text-start p-2 m-2" onMouseEnter={() => setIconVisible(index)}
                                        onMouseLeave={() => setIconVisible(-1)}
                                        key={index}>{task}
                                        {iconVisible == index && ( // retorna lo de la derecha de && si lo de la izquierda es TRUE... si es falso no lo retorna 
                                          
                                            <button className="boton" onClick={() => deleteNewTask(index)}><i className="fas fa-times"></i></button>

                                        )}
                                    <span>   </span>
                                    </li>
                                ))}
                            </ol>
                        
                        {/* 
                        <p className="text-center">{thingsToDO.length} tareas</p> */}
                    </div>
                </div>
            </div>

        </>
    )
}




export default ToDoList;