import { useState } from "react";
import { addItem } from "../api"; // API-Call für das Hinzufügen eines Artikels
import { useNavigate } from "react-router-dom";

function AddItemPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [endDate, setEndDate] = useState("");
    const [imageURL, setImageURL] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = sessionStorage.getItem("userId");
            if (!userId) throw new Error("User not logged in");

            const newItem = { title, price, endDate, imageURL, userId };
            console.log(newItem);

            let test = await addItem(newItem); // API call
            console.log(test);
            navigate("/profile"); // Zurück zur Profilseite
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    return (
        <div className="add-item-page">
            <h1>Add New Item</h1>
            <form onSubmit={handleSubmit} className="add-item-form">
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price:
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </label>
                <button type="submit" className="action-button">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default AddItemPage;
