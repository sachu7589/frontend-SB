import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
    const [todos, setTodos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/todos/display");
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this todo?")) {
            try {
                await axios.delete(`http://localhost:3000/api/todos/delete/${id}`);
                alert("Todo deleted successfully!");
                window.location.reload(); // Simple refresh
            } catch (error) {
                console.error("Error deleting todo:", error);
                alert("Failed to delete todo.");
            }
        }
    };

    return (
        <div>
            <h2>Todo List</h2>
            {todos.length === 0 ? (
                <p>No todos found.</p>
            ) : (
                todos.map((todo) => (
                    <div key={todo._id}>
                        <h3>{todo.item}</h3>
                        <p>Created: {new Date(todo.timestamp).toLocaleDateString()}</p>
                        <div>
                            <button onClick={() => handleEdit(todo._id)}>
                                Edit
                            </button>
                            <button onClick={() => handleDelete(todo._id)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default List;
