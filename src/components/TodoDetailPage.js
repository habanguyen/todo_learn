import React from "react";

import { useParams } from "react-router-dom";

function TodoDetailPage({ todos }) {
    const { id } = useParams();
    const todo = todos.find((t) => t.id === id);

    if(!todo) {
        return <h2>  Not find todo !</h2>
    }

    return (
        <div>
            <h2> Detail todo </h2>
            <p><b>Title:</b> {todo.title}</p>
            <p><b>description:</b> {todo.description}</p>
            <p><b>status:</b> {todo.isCompleted ? "Done" : "Not Done yet"}</p>
        </div>
    );

}
export default TodoDetailPage;