import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../api';
import './Navbar.css';
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

function Navbar() {
    const [currentUser, setCurrentUser] = useState(null);
    const [cartItems, setCartItems] = useState(0); // Tracks the number of items in the cart
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch current user
        let username = sessionStorage.getItem('username');
        getCurrentUser(username)
            .then((response) => setCurrentUser(response.data))
            .catch(() => setCurrentUser(null));

        // Update cart count from sessionStorage
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCartItems(storedCart.length);
    }, []);

    // Monitor sessionStorage changes for cart updates
    useEffect(() => {
        const handleStorageChange = () => {
            const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
            setCartItems(storedCart.length);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('userId');
        setCurrentUser(null);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <h2>Second Wind</h2>
            </Link>
            <div className="navbar-link">
                <Link to="/search">
                    <FaSearch size={24} title="Search" />
                </Link>
                {currentUser ? (
                    <div>
                        <Link to="/profile">
                            <FaUser size={24} title="Profile" />
                        </Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/account">
                        <FaUser size={24} title="Account" />
                    </Link>
                )}

                {cartItems > 0 && (
                    <div className="cart-icon" onClick={() => navigate('/checkout')}>
                        <FaShoppingCart size={24} />
                        <span className="cart-count">{cartItems}</span>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
