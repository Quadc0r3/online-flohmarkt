import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../api';

function AccountPage() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isRegistering) {
                const response = await registerUser({ username, password });
                setMessage(response.data);
            } else {
                const response = await loginUser({ username, password });
                setMessage(response.data);
                if (response.data === 'Login successful') {
                    navigate('/profile');
                }
            }
        } catch (error) {
            setMessage('An error occurred.' + error.message);
        }
    };

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
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Switch to Login' : 'Switch to Register'}
            </button>
        </div>
    );
}

export default AccountPage;
