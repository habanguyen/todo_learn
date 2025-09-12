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
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList));
  }, [todoList]);

  // auto delete & auto expire
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      todoList.forEach((todo) => {
        // hết hạn
        if (todo.expireAt && now >= todo.expireAt) {
          dispatch({ type: "AUTO_DELETE", payload: { id: todo.id } });
        }

        // xóa sau khi hoàn thành
        if (
          todo.isCompleted &&
          todo.autoDeleteAfter &&
          todo.completedAt &&
          now >= todo.completedAt + todo.autoDeleteAfter
        ) {
          dispatch({ type: "AUTO_DELETE", payload: { id: todo.id } });
        }
      });
    }, 1000);

    return () => clearInterval(interval);
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

  const onSetExpire = (id) => {
    const minutes = prompt("Hết hạn sau bao nhiêu phút?");
    if (minutes && !isNaN(minutes)) {
      const expireAt = Date.now() + minutes * 60 * 1000;
      dispatch({ type: "SET_TIMER", payload: { id, expireAt } });
    }
  };

  const onSetAutodeleteAfter = (id) => {
    const minutes = prompt("Xoá sau bao nhiêu phút khi hoàn thành?");
    if (minutes && !isNaN(minutes)) {
      dispatch({
        type: "SET_AUTO_DELETE_AFTER",
        payload: { id, ms: minutes * 60 * 1000 },
      });
    }
  };

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
              onSetExpire={onSetExpire}
              onSetAutodeleteAfter={onSetAutodeleteAfter}
            />
          }
        />
        <Route
          path="/todo/:id"
          element={<TodoDetailPage todos={todoList} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
