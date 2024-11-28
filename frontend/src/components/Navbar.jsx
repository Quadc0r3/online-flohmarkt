import {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getCurrentUser, logoutUser} from '../api';
import './Navbar.css'

function Navbar() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        getCurrentUser(username)
            .then((response) => setCurrentUser(response.data))
            .catch(() => setCurrentUser(null));
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
            <h2>Second Wind</h2>
            <div className="navbar-link">
                <Link to="/">Home</Link>
                <Link to="/search">Search</Link>
                {currentUser ? (
                    <div>
                        <Link to = "/profile">{currentUser.username}</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/account">Account</Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
