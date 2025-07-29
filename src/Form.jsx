import React, { useState } from "react";
import axios from "axios";

const Form = ({ onTodoAdded }) => {
    const [todo, setTodo] = useState({
        item: ""
    });

    const handleChange = (e) => {
        setTodo({ ...todo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/todos/insert", todo);
            alert("Todo added successfully!");
            setTodo({ item: "" }); // Reset form
            // Trigger refresh of the list
            if (onTodoAdded) {
                onTodoAdded();
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo.");
        }
    };

    return (
        <div style={{ 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#f5f5f5', 
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h2 style={{ marginTop: '0', color: '#333' }}>Add Todo</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input 
                    type="text" 
                    name="item" 
                    placeholder="Enter todo item" 
                    value={todo.item} 
                    onChange={handleChange} 
                    required 
                    style={{
                        flex: '1',
                        padding: '10px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        fontSize: '16px'
                    }}
                />
                <button 
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default Form;
