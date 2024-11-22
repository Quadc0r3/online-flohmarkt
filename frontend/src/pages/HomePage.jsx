import axios from "axios";
import './HomePage.css';
import ItemCard from '../components/ItemCard.jsx';
import {useEffect, useState} from "react";

function HomePage() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api')
        .then(res => {
            setItems(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Welcome to Second Wind!</h1>
                <p>Where you have to be a Fighter</p>
            </header>

            <section className="featured-items">
                <h2>Featured Items</h2>
                <div className="items-container">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <ItemCard key={item.id}
                                      title={item.title}
                                      price={`${item.price}€`}
                                      imageURL={item.imageURL}
                            />
                        ))
                    ) : (
                        <p>Loading items...</p>
                    )}
                </div>
            </section>

            <section className="categories">
                <h2>Explore Categories</h2>
                <div className="category-list">
                    <button>Electronics</button>
                    <button>Home & Garden</button>
                    <button>Clothing</button>
                    <button>Collectibles</button>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
