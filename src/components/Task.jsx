import { useState, useRef } from "react";
import getCronometer from "../helpers/cronometer";

const Task = ({ isNew, edit, task, deleteTask, updateTask, cancel }) => {
  const [title, setTitle] = useState(task.title);
  const [proyect, setProyect] = useState(task.proyect);
  const [cronometer, setCronometer] = useState(task.time);

  const [isEdit, setIsEdit] = useState(edit);
  const [isStart, setIsStart] = useState(false);
  const interval = useRef();

  const saveTask = () => {
    if (title === "" || proyect === "") {
      alert("falta ingresar datos");
    } else {
      setIsEdit(false);
      updateTask({
        id: task.id,
        title: title,
        proyect: proyect,
        state: task.state,
        time: cronometer,
      });
    }
  };

  const startTime = () => {
    setIsStart(true);
    interval.current = setInterval(() => {
      setCronometer(crono => {
        return getCronometer(crono);
      });
    }, 1000);
  };

  const stopTime = () => {
    setIsStart(false);
    clearInterval(interval.current);
    saveTask();
  };

  ///////////////////////////////////////
  // vista de edición
  ///////////////////////////////////////
  const formEdit = () => (
    <div className="card-body text-left edit">
      <div className="form-group">
        <label>
          Title
          <input
            type="text"
            className="form-control"
            onChange={e => setTitle(e.target.value)}
            value={title}
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Proyect
          <input
            type="text"
            className="form-control"
            onChange={e => setProyect(e.target.value)}
            value={proyect}
          />
        </label>
      </div>

      <button className="btn btn-outline-primary col-6" onClick={saveTask}>
        {isNew ? "create" : "update"}
      </button>
      <button
        className="btn btn-outline-danger col-6"
        onClick={isNew ? cancel : () => setIsEdit(false)}
      >
        Cancel
      </button>
    </div>
  );
  ///////////////////////////////////////
  // vista cronometro
  ///////////////////////////////////////
  const crono = () => (
    <>
      <div className="card-body" id={task.id}>
        <h6 className="text-left">
          {task.title} <br />
          <small>{task.proyect}</small>
        </h6>
        <div>
          <h3>{cronometer}</h3>
          <div className="text-right">
            <span
              className="btn-outline-dark mr-2"
              onClick={() => {
                stopTime();
                return deleteTask(task.id);
              }}
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </span>
            <span className="btn-outline-dark" onClick={() => setIsEdit(true)}>
              <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
            </span>
          </div>
        </div>
      </div>
      {isStart ? (
        <div className="btn btn-outline-danger btn-block" onClick={stopTime}>
          <i className="fa fa-pause fa-2x" aria-hidden="true"></i>
        </div>
      ) : (
        <div className="btn btn-outline-success btn-block" onClick={startTime}>
          <i className="fa fa-play fa-2x" aria-hidden="true"></i>
        </div>
      )}
    </>
  );

  return (
    <>
      <div className="card">{isEdit ? formEdit() : crono()}</div>
    </>
  );
};

export default Task;
