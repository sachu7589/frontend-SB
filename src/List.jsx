import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = ({ onTodoDeleted }) => {
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
                // Refresh the list immediately
                fetchTodos();
                // Also trigger parent refresh if callback provided
                if (onTodoDeleted) {
                    onTodoDeleted();
                }
            } catch (error) {
                console.error("Error deleting todo:", error);
                alert("Failed to delete todo.");
            }
        }
    };

    const buttonStyle = {
        padding: '8px 16px',
        margin: '0 5px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
    };

    return (
        <div>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>Todo List</h2>
            {todos.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No todos found.</p>
            ) : (
                todos.map((todo) => (
                    <div 
                        key={todo._id} 
                        style={{
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between',
                            gap: '1rem', 
                            margin: '10px 0', 
                            padding: '15px', 
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div style={{ flex: '1' }}>
                            <h3 style={{ margin: '0 0 5px 0', color: '#333' }}>{todo.item}</h3>
                            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
                                Created: {new Date(todo.timestamp).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <button 
                                onClick={() => handleEdit(todo._id)}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: '#28a745',
                                    color: 'white'
                                }}
                            >
                                Edit
                            </button>
                            <button 
                                onClick={() => handleDelete(todo._id)}
                                style={{
                                    ...buttonStyle,
                                    backgroundColor: '#dc3545',
                                    color: 'white'
                                }}
                            >
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
