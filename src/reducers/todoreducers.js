import { v4 as uuidv4 } from "uuid";
export const initialState = {
    todoList: [],
    titleInput:"",
    descInput:"",
    filter:"todo", // Status - action
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TODO":
      return { ...state, todoList: action.payload };

    case "SET_TITLE":
      return { ...state, titleInput: action.payload };

    case "SET_DESC":
      return { ...state, descInput: action.payload };

    case "ADD_TODO":
      if (!state.titleInput.trim() || !state.descInput.trim()) return state;
      return {
        ...state,
        todoList: [
          {
            id: uuidv4(),
            title: state.titleInput,
            description: state.descInput,
            isCompleted: false,
          },
          ...state.todoList,
        ],
        titleInput: "",
        descInput: "",
        filter: "todo", 
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload
            ? { ...todo, isCompleted: !todo.isCompleted }
            : todo
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    default:
      return state;
  }
};
