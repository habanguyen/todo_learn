import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { todoReducer, initialState } from "./reducers/todoreducers";
import TodoListPage from "./components/TodoListPage";
import TodoDetailPage from "./components/TodoDetailPage";

const TODO_APP_STORAGE_KEY = "TODO_APP";

function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const { todoList, filter } = state;

  // load từ localStorage
  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList) {
      dispatch({ type: "LOAD_TODOS", payload: JSON.parse(storagedTodoList) });
    }
  }, []);

  // lưu vào localStorage khi todoList thay đổi
  useEffect(() => {
    if(todoList.length > 0 ){
      localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
    }
    }, [todoList]);

  const onTitleChange = (e) =>
    dispatch({ type: "SET_TITLE", payload: e.target.value });
  const onDescChange = (e) =>
    dispatch({ type: "SET_DESC", payload: e.target.value });

  const onAddBtnClick = () => dispatch({ type: "ADD_TODO" });
  const onCheckBtnClick = (id) =>
    dispatch({ type: "TOGGLE_TODO", payload: id });

  const filteredTodos = todoList.filter((todo) =>
    filter === "todo" ? !todo.isCompleted : todo.isCompleted
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              state={state}
              dispatch={dispatch}
              filteredTodos={filteredTodos}
              onTitleChange={onTitleChange}
              onDescChange={onDescChange}
              onAddBtnClick={onAddBtnClick}
              onCheckBtnClick={onCheckBtnClick}
            />
          }
        />
        <Route 
          path="/todo/:id"
          element = {
            <TodoDetailPage todos = {todoList}/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
