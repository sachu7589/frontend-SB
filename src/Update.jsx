import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update({ onTodoUpdated }) {
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
            // Trigger refresh of the list
            if (onTodoUpdated) {
                onTodoUpdated();
            }
            navigate('/');
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Failed to update todo.");
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        marginRight: '10px'
    };

    return (
        <div style={{ 
            maxWidth: '500px', 
            margin: '0 auto', 
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
            <h1 style={{ marginTop: '0', color: '#333', textAlign: 'center' }}>Update Todo</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: 'bold' }}>
                        Item:
                    </label>
                    <input 
                        type="text" 
                        value={item} 
                        onChange={(e) => setItem(e.target.value)} 
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <button 
                        type="submit"
                        style={{
                            ...buttonStyle,
                            backgroundColor: '#007bff',
                            color: 'white'
                        }}
                    >
                        Update Todo
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        style={{
                            ...buttonStyle,
                            backgroundColor: '#6c757d',
                            color: 'white'
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Update;
