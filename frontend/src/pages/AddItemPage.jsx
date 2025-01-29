import { useState, useEffect } from "react";
import { addItem } from "../api"; // API-Call für das Hinzufügen eines Artikels
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddItemPage.css"; // Neue CSS-Datei für Styling

function AddItemPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [category, setCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8080/api/categories")
            .then((response) => setCategories(response.data))
            .catch((error) => console.error("Error fetching categories:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem("userId");
            if (!userId) throw new Error("User not logged in");

            const finalCategory = category === "new" ? newCategory : category;
            const newItem = { title, description, price, endDate, imageURL, category: finalCategory, userId };
            
            console.log(newItem);
            await addItem(newItem); // API call
            navigate("/profile"); // Zurück zur Profilseite
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className="add-item-page">
            <h1>Add New Item</h1>
            <form onSubmit={handleSubmit} className="add-item-form">
                <label>Title:</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label>Description:</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

                <label>Price:</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <label>End Date:</label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <label>Image URL:</label>
                <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

                <label>Category:</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                    <option value="new">+ Add new category</option>
                </select>

                {category === "new" && (
                    <input 
                        type="text" 
                        placeholder="Enter new category"
                        value={newCategory} 
                        onChange={(e) => setNewCategory(e.target.value)} 
                        required
                    />
                )}

                <button type="submit" className="action-button">Submit</button>
            </form>
        </div>
    );
}

export default AddItemPage;
