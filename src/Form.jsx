import React, { useState } from "react";
import axios from "axios";

const Form = () => {
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
            window.location.reload(); // Simple refresh
        } catch (error) {
            console.error("Error adding todo:", error);
            alert("Failed to add todo.");
        }
    };

    return (
        <div>
            <h2>Add Todo</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="item" 
                    placeholder="Enter todo item" 
                    value={todo.item} 
                    onChange={handleChange} 
                    required 
                />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    );
};

export default Form;
