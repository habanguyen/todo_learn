import React, { useEffect, useReducer } from "react";
import TodoList from "./components/TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
// import { v4 as uuidv4 } from "uuid";
import { todoReducer, initialState} from "./reducers/todoreducers";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  // reducerstate
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todoList, titleInput, descInput, filter} = state;
  
  // load từ localStorage
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      dispatch({ type:"LOAD_TODO",payload: JSON.parse(storagedTodoList)});
    }
  }, []);

  // lưu vào localStorage khi todoList thay đổi
  useEffect(() => {
    if(todoList.length > 0){
      localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }
  },[todoList]);

  // handle input change
  const onTitleChange = (e) => 
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  const onDescChange = (e) =>
    dispatch({type: "SET_DESC" ,payload: e.target.value});

  // thêm công việc
  const onAddBtnClick = () => dispatch({ type: "ADD_TODO"});

  // toggle complete
  const onCheckBtnClick = (id) => 
    dispatch({ type: "TOGGLE_TODO", payload: id});

  // lọc todo theo tab
  const filteredTodos = todoList.filter((todo) =>
    filter === "todo" ? !todo.isCompleted : todo.isCompleted
  );

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", marginTop: "40px" }}>
      <h2 style={{ textAlign: "center" }}>My Todos</h2>

      <div
        style={{
          background: "#333",
          padding: "20px",
          borderRadius: "8px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
          <Textfield
            name="title"
            placeholder="What's the title of your To Do?"
            value={titleInput}
            onChange={onTitleChange}
          />
          <Textfield
            name="description"
            placeholder="What's the description of your To Do?"
            value={descInput}
            onChange={onDescChange}
          />
          <Button
            appearance="primary"
            isDisabled={!titleInput}
            onClick={onAddBtnClick}
          >
            Add
          </Button>
        </div>

        {/* Filter tabs */}
        <div style={{ marginTop: "10px" }}>
          <Button
            appearance={filter === "todo" ? "primary" : "default"}
            onClick={() => dispatch({ type: "SET_FILTER", payload: "todo"})}
          >
            To Do
          </Button>
          <Button
            appearance={filter === "completed" ? "primary" : "default"}
            onClick={() => dispatch({type: "SET_FILTER", payload: "completed"})}
            style={{ marginLeft: "10px" }}
          >
            Completed
          </Button>
        </div>
      </div>

      {/* Hiển thị danh sách */}
      <TodoList todoList={filteredTodos} onCheckBtnClick={onCheckBtnClick} />
    </div>
  );
}

export default App;
