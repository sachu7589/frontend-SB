import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const List = () => {
    const [properties, setProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const response = await axios.get("http://localhost:3000/items");
            setProperties(response.data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/update/${id}`);
    };

    return (
        <div>
            <h2>Todo List</h2>
            {properties.length === 0 ? (
                <p>No data found.</p>
            ) : (
                properties.map((property, index) => (
                    <div key={property.id} className="card" style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <h3>Title : {property.title}</h3>
                        <h3>Date : {property.date.substring(0, 10)}</h3> 
                        <div>
                            <button onClick={() => handleEdit(property.id)}>Edit</button>
                            <button>Delete</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default List;
