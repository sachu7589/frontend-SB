import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [item, setItem] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchItem();
    }, [id]);

    const fetchItem = async () => {
        try {
            // Since there's no specific endpoint to get a single todo, 
            // we'll fetch all todos and find the one we need
            const response = await axios.get("http://localhost:3000/api/todos/display");
            const todo = response.data.find(todo => todo._id === id);
            if (todo) {
                setItem(todo.item);
            }
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/todos/update/${id}`, {
                item
            });
            alert("Todo updated successfully!");
            window.location.href = '/'; // Simple redirect
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Failed to update todo.");
        }
    };

    return (
        <div>
            <h1>Update Todo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Item:</label>
                    <input 
                        type="text" 
                        value={item} 
                        onChange={(e) => setItem(e.target.value)} 
                        required
                    />
                </div>
                <button type="submit">
                    Update Todo
                </button>
                <button type="button" onClick={() => navigate('/')}>
                    Cancel
                </button>
            </form>
        </div>
    );
}

export default Update;
