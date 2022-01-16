import tasksList from "./tasksList";

const reducer = (state, action) => {
  switch (action.type) {
    case "load":
      return tasksList;
    case "delete":
      return state.filter(task => task.id !== action.payload.id);
    case "update":
      return state.map(task => {
        return task.id === action.payload.task.id
          ? {
              ...task,
              title: action.payload.task.title,
              proyect: action.payload.task.proyect,
              state: action.payload.task.state,
              time: action.payload.task.time,
            }
          : task;
      });
    case "create":
      return [...state, action.payload.task];
    default:
      return state;
  }
};

export default reducer;
