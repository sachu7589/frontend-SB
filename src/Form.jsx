import React, { useState } from "react";
import axios from "axios";

const Form = () => {
    const [property, setProperty] = useState({
        title: ""
    });

    const handleChange = (e) => {
        setProperty({ ...property, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/items", property);
            alert("Property added successfully!");
        } catch (error) {
            console.error("Error adding property:", error);
            alert("Failed to add property.");
        }
    };

    return (
        <div>
            <h2>Add Data</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={property.title} onChange={handleChange} required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
