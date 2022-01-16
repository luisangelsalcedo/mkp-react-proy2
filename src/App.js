import { useEffect, useReducer, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./App.css";
import Task from "./components/Task";
import reducer from "./helpers/reducer";

const App = () => {
  const [isNew, setIsNew] = useState(false);
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "load" });
  }, []);

  const deleteTask = id => {
    dispatch({ type: "delete", payload: { id } });
  };

  const updateTask = task => {
    dispatch({ type: "update", payload: { task } });
  };

  const createTask = task => {
    dispatch({ type: "create", payload: { task } });
    setIsNew(false);
  };

  console.log(state);

  return (
    <div className="App">
      <h3>Cronometros</h3>
      <hr />
      <div className="container">
        <div className="listTasks">
          {
            // Lista de tareas
            state.map(task => (
              <Task
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                updateTask={updateTask}
                edit={false}
                isNew={false}
              />
            ))
          }

          {
            // Formulario de nueva tarea
            isNew && (
              <Task
                task={{
                  id: new Date().getTime(),
                  title: "",
                  proyect: "",
                  state: false,
                  time: "00:00:00",
                }}
                deleteTask={deleteTask}
                updateTask={createTask}
                edit={true}
                isNew={true}
                cancel={() => setIsNew(false)}
              />
            )
          }
        </div>
        {/* Boton de agregar nueva tarea */}
        <div className="btn btn-outline-primary" onClick={() => setIsNew(true)}>
          +
        </div>
      </div>
    </div>
  );
};

export default App;
