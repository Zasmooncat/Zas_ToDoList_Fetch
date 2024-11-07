import React, { useState, useEffect } from "react";





const ToDoList = () => {

 
    const [taskList, setTaskList] = useState([])
    const [task, setTask] = useState("")
    const [loading,setLoading] = useState(false)
    const [iconsVisible, setIconsVisible] = useState(-1)


    const createUser = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Zas",
                {
                    method: "POST",
                    headers: {
                        accept: "application/json"
                    }
                }

            )
      


        } catch (error) {
            console.log(error);

        }
    }

    const loadTasks = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Zas")
            if (!response.ok) {
                throw new Error("Error al cargar tareas");

            }
            const result = await response.json()
            setTaskList(result.todos)

        } catch (error) {
            console.log(error.message);

        }
    }





    const addNewTask = async (e) => {
        e.preventDefault();
        try {

            const newTask = {
                "label": task,
                "is_done": false
            }
            const response = await fetch("https://playground.4geeks.com/todo/todos/Zas", {
                method: "POST",
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            }
            )
            const result = await response.json()
            setTaskList(prevState => [...prevState, result])
            setTask("")





        } catch (error) {
            console.log(error);

        }


    }

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "DELETE"
            })
            if (!response.ok) {
                throw new Error("Error al eliminar tarea");
            }
            setTaskList((prevState) => prevState.filter(task => task.id !== id))

            const result = await response.json()



        } catch (error) {
            console.log(error.message);

        }

    }

    const editTask = async (id) => {
        try {

            let editar = prompt("Editar tarea")
            const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                method: "PUT",
                headers:
                {
                    accept: "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "label": editar,
                    "is_done": false
                })
            })
            const result = await response.json()
            setTaskList((prevState) => prevState.map(task => task.id == id ? result : task))
        } catch (error) {

        }

    }




    useEffect(() => {

        loadTasks()
        createUser()
    }, [])


    const deleteAllTasks = async () => {
        setLoading(true)
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users/Zas",
                {
                    method: "DELETE",
                    headers: { accept: "application/json" }
                }
            )
            if (!response.ok){
                alert("error, no se ha eliminado")
                throw new Error ("error, no se ha eliminado")
            }
            await createUser()
            setTaskList([])
            setTask("")
        } catch (error) {
            console.log(error)

        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }



    return (

        <>
            <div className="wrapper p-5 container col-11 col-md-5 border mt-5 rounded-3">
                <h1 className="titulo text-center mb-4">Lista de tareas</h1>
                <div className="container text-center">
                {loading?(
                    <div className="loader m-auto"></div>
                ):(

                    <div className="inputAndButton d-flex justify-content-center">

                        <form onSubmit={addNewTask}>

                            <input name="tarea" type="text" className="new-task" placeholder="Nueva tarea"


                                value={task}// el input hace referencia al objeto newTask.task
                                onChange={(e) => setTask(e.target.value)}//le damos el value del input(target.value) a newTask mediante la funcion setNewTask
                            />
                            <button type="button" onClick={addNewTask} className="addButton"
                            >+</button>

                        </form>






                    </div>

)}

                    <div className="tasks col-8 m-auto">
                        <ul>


                            {taskList.map(tsk => (
                                <>
                                    <li className="tasks py-1" onMouseEnter={() => setIconsVisible(tsk.id)} 
                                    onMouseLeave={() => setIconsVisible(-1)}>
                                        <div className="d-flex py-1">

                                            {tsk.label}
                                            {iconsVisible == tsk.id && (
                                            
                                            <div>
                                                <button className="boton boton-edit " onClick={() => editTask(tsk.id)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className="boton " onClick={() => deleteTask(tsk.id)}><i className="fas fa-times"></i></button>
                                            </div>
                                            
                                            )}
                                        </div>
                                    </li>
                                </>
                            )
                            )}











                            {taskList.length > 0 && (
                                <button onClick={deleteAllTasks} className="deleteButton" title="Eliminar todas las tareas" ><i className="deleteicon fas fa-times"></i> </button>
                            )}


                            <p className="foot text-center mt-5">{taskList.length === 0 ? "No tienes tareas pendientes" :
                                taskList.length == 1 ? "Tienes " + taskList.length + " tarea pendiente" :
                                    "Tienes " + taskList.length + " tareas pendientes"}</p>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}




export default ToDoList;








{/* {thingsToDO.map((tarea, index) => (

                                <li className=" p-2 m-2"  // cuando entra el ratón en el li, ejecuta seticonvisible en referencia al indice
                                    // cuando sale del li ejecuta set icon visible y pone el indice en -1, el cual no existe en la lista por tanto lo oculta
                                    key={tarea.id}> {tarea.task}
                                    {iconVisible == index && (
                                        <>
                                            <button className="boton boton-edit " ><i className="fas fa-pencil-alt"></i></button>
                                            <button className="boton boton-block " > {tarea.isLocked ? <i className="fas fa-lock"></i> : <i className="fas fa-unlock"></i>}</button>
                                            <button className="boton " ><i className="fas fa-times"></i></button>
                                        </>
                                    )}

                                </li>
                            ))} */}