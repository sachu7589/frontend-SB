import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetchItem();
    });

    const fetchItem = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/items/${id}`);
            setTitle(response.data.title);
            setDate(response.data.date.substring(0, 10));
        } catch (error) {
            console.error("Error fetching item:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/items/${id}`, {
                title,
                date
            });
            navigate('/');
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <div>
            <h1>Update Item</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default Update;
