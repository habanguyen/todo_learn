import React from "react";
import Button from "@atlaskit/button";

export default function Todo({ todo, onCheckBtnClick, onSetExpire, onSetAutodeleteAfter }) {
  return (
    <div
      style={{
        background: "#444",
        margin: "10px 0",
        padding: "10px",
        borderRadius: "6px",
        display: "flex",
        flexDirection: "column", // đổi sang column để chứa nhiều nút
        gap: "8px",
        color: "white",
      }}
    >
      {/* Thông tin todo */}
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

        {/* Nếu có expireAt hoặc autoDeleteAfter thì hiển thị */}
        {todo.expireAt && (
          <p style={{ fontSize: "12px", color: "#ffb347" }}>
            ⏰ Hết hạn lúc: {new Date(todo.expireAt).toLocaleString()}
          </p>
        )}
        {todo.autoDeleteAfter && (
          <p style={{ fontSize: "12px", color: "#ff6961" }}>
            🗑️ Xoá sau khi hoàn thành: {todo.autoDeleteAfter / 60000} phút
          </p>
        )}
      </div>

      {/* Các nút hành động */}
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          appearance={todo.isCompleted ? "warning" : "primary"}
          onClick={() => onCheckBtnClick(todo.id)}
        >
          {todo.isCompleted ? "Undo" : "Done"}
        </Button>
        <Button
          appearance="subtle"
          onClick={() => onSetExpire(todo.id)}
        >
          Set Expire
        </Button>
        <Button
          appearance="danger"
          onClick={() => onSetAutodeleteAfter(todo.id)}
        >
          Set Auto Delete
        </Button>
      </div>
    </div>
  );
}
