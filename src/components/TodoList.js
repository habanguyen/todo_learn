import React from "react";
import Todo from "./Todo";
import { Link } from "react-router-dom";

export default function TodoList({ todoList , onCheckBtnClick}) {
  return (
    <>
      {todoList.map((todo) => (
        <div key = {todo.id} style = {{marginBottom: "10px"}}>
          <Link to = {`/todo/${todo.id}`} style = {{ textDecoration: "none", color: "inherit"}}>
          <Todo todo={todo} onCheckBtnClick={onCheckBtnClick} />
          </Link>
        </div>
      ))}
    </>
  );
}
