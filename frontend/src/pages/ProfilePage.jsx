import { useEffect, useState } from "react";
import { getCurrentUser, getUserItems, deleteItem } from "../api";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
    const [userItems, setUserItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Zustand, um das Laden zu kontrollieren
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const username = sessionStorage.getItem("username");
                if (!username) throw new Error("No username in session");

                const userResponse = await getCurrentUser(username);
                const user = userResponse.data;
                setCurrentUser(user);

                const itemsResponse = await getUserItems(user.id);
                const items = itemsResponse.data;
                setUserItems(items);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCurrentUser(null);
                setUserItems([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleDelete = async (itemId) => {
        if (window.confirm("Are you sure you want to delete this listing?")) {
            try {
                await deleteItem(itemId); // API call to delete the item
                setUserItems(userItems.filter((item) => item.id !== itemId)); // Update state
            } catch (error) {
                console.error("Error deleting item:", error);
            }
        }
    };

    const handleEdit = (itemId) => {
        console.log(`Editing item with id: ${itemId}`);
        // TODO: Navigation zu Edit Pge
        };

    if (isLoading) return <div>Loading...</div>;

    if (!currentUser) return <div>You must log in to view your profile.</div>;

    return (
        <div className="profile-page">
            <h1>Welcome, {currentUser.username}</h1>
            <p>Registered on: {new Date(currentUser.insDate).toLocaleDateString()}</p>
            <h2>Your Listings</h2>
            {userItems.length > 0 ? (
                <div className="profile-items-container">
                    {userItems.map((item) => (
                        <div className="profile-item-card" key={item.id}>
                            <img
                                src={item.imageURL}
                                alt={item.title}
                                className="profile-item-image"
                                onClick={() => navigate(`/item/${item.id}`)} // Navigation zu ItemDetail
                            />
                            <div className="profile-item-details">
                                <h3>{item.title}</h3>
                                <p>Price: ${item.price}</p>
                                <p>End Date: {item.endDate ? new Date(item.endDate).toLocaleDateString() : "N/A"}</p>
                            </div>
                            <div className="profile-item-actions">
                                <button className="action-button" onClick={() => handleEdit(item.id)}>Edit</button>
                                <button className="action-button delete" onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have no items listed.</p>
            )}
        </div>
    );
}

export default ProfilePage;
