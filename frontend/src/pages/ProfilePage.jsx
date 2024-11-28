import { useEffect, useState } from "react";
import { getCurrentUser, getUserItems } from "../api";

function ProfilePage() {
    const [userItems, setUserItems] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Zustand, um das Laden zu kontrollieren

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Hole den aktuellen Benutzer
                const username = sessionStorage.getItem('username');
                if (!username) throw new Error("No username in session");

                const userResponse = await getCurrentUser(username);
                const user = userResponse.data;
                console.log("User fetched: ", user);
                setCurrentUser(user);

                // Hole die Items des Benutzers
                const itemsResponse = await getUserItems(user.id);
                const items = itemsResponse.data;
                console.log("User items fetched: ", items);
                setUserItems(items);
            } catch (error) {
                console.error("Error fetching data:", error);
                setCurrentUser(null);
                setUserItems([]);
            } finally {
                setIsLoading(false); // Ladezustand beenden
            }
        };

        fetchUserData();
    }, []);

    // Falls noch geladen wird, Ladeanzeige
    if (isLoading) return <div>Loading...</div>;

    // Falls der Benutzer nicht eingeloggt ist
    if (!currentUser) return <div>You must log in to view your profile.</div>;

    return (
        <div>
            <h1>Welcome, {currentUser.username}</h1>
            <p>Registered on: {new Date(currentUser.insDate).toLocaleDateString()}</p>
            <h2>Your Listings</h2>
            {userItems.length > 0 ? (
                <ul>
                    {userItems.map(item => (
                        <li key={item.id}>
                            {item.title}
                            {/* Hier kannst du die Logik für Bearbeiten und Löschen einfügen */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no items listed.</p>
            )}
        </div>
    );
}

export default ProfilePage;
