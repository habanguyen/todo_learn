import { v4 as uuidv4 } from "uuid";

export const initialState = {
  todoList: [],
  titleInput: "",
  descInput: "",
  expireAtInput: "",          // thêm input hết hạn
  autoDeleteAfterInput: "",   // thêm input xóa sau khi hoàn thành
  filter: "todo", // Status - action
};

export const todoReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_TODOS":
      return { ...state, todoList: action.payload };

    case "SET_TITLE":
      return { ...state, titleInput: action.payload };

    case "SET_DESC":
      return { ...state, descInput: action.payload };

    case "SET_EXPIRE_AT_INPUT":
      return { ...state, expireAtInput: action.payload };

    case "SET_AUTODELETE_INPUT":
      return { ...state, autoDeleteAfterInput: action.payload };

    case "ADD_TODO":
      if (!state.titleInput.trim() || !state.descInput.trim()) return state;

      const newTodo = {
        id: uuidv4(),
        title: state.titleInput,
        description: state.descInput,
        isCompleted: false,
        expireAt: state.expireAtInput
          ? new Date(state.expireAtInput).getTime()
          : null,
        autoDeleteAfter: state.autoDeleteAfterInput
          ? state.autoDeleteAfterInput * 60 * 1000
          : null,
        completedAt: null,
      };

      console.log(" New todo created:", newTodo);

      return {
        ...state,
        todoList: [newTodo, ...state.todoList],
        titleInput: "",
        descInput: "",
        expireAtInput: "",
        autoDeleteAfterInput: "",
        filter: "todo",
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload
            ? {
                ...todo,
                isCompleted: !todo.isCompleted,
                completedAt: !todo.isCompleted ? Date.now() : null, // set khi hoàn thành
              }
            : todo
        ),
      };

    case "SET_FILTER":
      return { ...state, filter: action.payload };

    case "SET_TIMER": // bỏ dấu cách thừa " SET_TIMER"
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, expireAt: action.payload.expireAt }
            : todo
        ),
      };

    case "SET_AUTO_DELETE_AFTER":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, autoDeleteAfter: action.payload.ms }
            : todo
        ),
      };

    case "AUTO_DELETE":
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
