import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerUser, loginUser, getCurrentUser, logoutUser} from '../api';
import '../app.css'
import './AccountPage.css'

function AccountPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     getCurrentUser()
    //         .then((response) => setCurrentUser(response.data))
    //         .catch(() => setCurrentUser(null));
    // }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegistering) {
                const response = await registerUser({username, password});
                setMessage(response.data);
                getCurrentUser(username)
                    .then((response) => {
                        const user = response.data;
                        setCurrentUser(user);

                        sessionStorage.setItem('userId', user.id);
                        sessionStorage.setItem('username', user.username);

                        navigate('/profile');
                    })
                    .catch(() => setCurrentUser(null));
            } else {
                const response = await loginUser({username, password});
                setMessage(response.data);
                if (response.data === 'Login successful') {
                    getCurrentUser(username)
                        .then((response) => {
                            const user = response.data;
                            setCurrentUser(user);

                            sessionStorage.setItem('userId', user.id);
                            sessionStorage.setItem('username', user.username);

                            navigate('/profile');
                            window.location.reload();
                        })
                        .catch(() => setCurrentUser(null));
                }
            }
        } catch (error) {
            setMessage('An error occurred: ' + error.message);
        }
    };

    const handleLogout = async () => {
        await logoutUser();
        setCurrentUser(null);
    };

    if (currentUser) {
        return (
            <div>
                <h1>Welcome, {currentUser.username}</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return (
        <div className="account-page">
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <p>{message}</p>
            <button className="switch-button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
}

export default AccountPage;
