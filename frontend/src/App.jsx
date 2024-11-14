import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import './App.css';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/hello')
            .then(response => setMessage(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="App">
            <Header />
            <p>{message}</p>
        </div>
    );
}

export default App;
