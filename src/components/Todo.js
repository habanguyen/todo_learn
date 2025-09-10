import React from "react";
import Button from "@atlaskit/button";

export default function Todo({ todo, onCheckBtnClick }) {
  return (
    <div
      style={{
        background: "#444",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "6px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
      }}
    >
      <div>
        <strong
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
            fontSize: "16px",
          }}
        >
          {todo.title}
        </strong>
        <p
          style={{
            margin: "5px 0 0",
            color: "#ccc",
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
        >
          {todo.description}
        </p>
      </div>

      <Button
        appearance={todo.isCompleted ? "warning" : "primary"}
        onClick={() => onCheckBtnClick(todo.id)}
      >
        {todo.isCompleted ? "Undo" : "Done"}
      </Button>
    </div>
  );
}
