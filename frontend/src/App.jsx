import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ItemDetailPage from './pages/ItemDetailPage.jsx';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar.jsx';

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/item/:id" element={<ItemDetailPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

// Code Beispiel für Spring Boot connection
//
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Header from './components/Header.jsx';
// import './App.css';
//
// function App() {
//     const [message, setMessage] = useState('');
//
//     useEffect(() => {
//         axios.get('http://localhost:8080/api/hello')
//             .then(response => setMessage(response.data))
//             .catch(error => console.error(error));
//     }, []);
//
//     return (
//         <div className="App">
//             <Header />
//             <p>{message}</p>
//         </div>
//     );
// }
//
// export default App;
