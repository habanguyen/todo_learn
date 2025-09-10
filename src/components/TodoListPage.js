import React from "react";
import TodoList from "./TodoList";
import Textfield from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import { Link } from "react-router-dom" ;

function TodoListPage({
  state,
  dispatch,
  onTitleChange,
  onDescChange,
  onAddBtnClick,
  onCheckBtnClick,
}) {
  const { todoList, titleInput, descInput, filter } = state;

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
            onClick={() => dispatch({ type: "SET_FILTER", payload: "todo" })}
          >
            To Do
          </Button>
          <Button
            appearance={filter === "completed" ? "primary" : "default"}
            onClick={() =>
              dispatch({ type: "SET_FILTER", payload: "completed" })
            }
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

export default TodoListPage;
