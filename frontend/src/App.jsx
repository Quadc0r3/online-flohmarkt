import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import ItemDetailPage from './pages/ItemDetailPage.jsx';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import AddItemPage from './pages/AddItemPage';
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
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/add-item" element={<AddItemPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;