import axios from "axios";
import './HomePage.css';
import ItemCard from '../components/ItemCard.jsx';
import Categories from '../components/Categories.jsx';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function HomePage() {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        navigate(`/item/${item.id}`, {state: {item}});
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        if (category) {
            setFilteredItems(items.filter(item => item.category === category));
        } else {
            setFilteredItems(items);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/api')
            .then(res => {
                setItems(res.data);
                setFilteredItems(res.data);

                // Extrahiere Kategorien ohne Duplikate
                const uniqueCategories = [...new Set(res.data.map(item => item.category))];
                setCategories(uniqueCategories);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Welcome to Second Wind!</h1>
                <p>Where you have to be a Fighter</p>
            </header>

            <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            <section className="featured-items">
                <h2>Featured Items</h2>
                <div className="items-container">
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <div key={item.id} onClick={() => handleItemClick(item)}>
                                <ItemCard key={item.id}
                                          title={item.title}
                                          price={`${item.price}€`}
                                          imageURL={item.imageURL}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No items found for the selected category.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default HomePage;
