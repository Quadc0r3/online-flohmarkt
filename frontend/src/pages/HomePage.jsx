import './HomePage.css';
import ItemCard from '../components/ItemCard.jsx';

function HomePage() {
    return (
        <div className="home-page">
            <header className="home-header">
                <h1>Welcome to Second Wind!</h1>
                <p>Where you have to be a Fighter</p>
            </header>

            <section className="featured-items">
                <h2>Featured Items</h2>
                <div className="items-container">
                    <ItemCard title="Vintage Lamp" price="15€" />
                    <ItemCard title="Old Record Player" price="45€" />
                    <ItemCard title="Retro Bicycle" price="120€" />
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
