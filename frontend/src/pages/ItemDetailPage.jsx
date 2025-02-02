import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './ItemDetailPage.css';

function ItemDetailPage() {
    const { id } = useParams(); 
    const [item, setItem] = useState(null);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/${id}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error('Error fetching item details:', error);
            });

        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, [id]);

    if (!item) {
        return <p>Loading...</p>;
    }

    const addToCart = () => {
        const updatedCart = [...cart, item];
        setCart(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        alert(`${item.title} wurde zum Warenkorb hinzugefügt!`);
        window.location.reload();
    };


    return (
        <div className="item-detail-page">
            <div className="item-detail-container">
                {/* Großes Bild */}
                <div className="item-image-container">
                    <img
                        src={item.imageURL}
                        alt={item.title}
                        className="item-detail-image"
                    />
                </div>

                {/* Produktinformationen */}
                <div className="item-info">
                    <h1 className="item-title">{item.title}</h1>
                    <h2 className="item-price">{item.price}€</h2>
                    <p className="item-description">{item.description}</p>

                    {/* Verkäuferinformationen */}
                    <div className="seller-info">
                        <p><strong>Seller:</strong> {item.userId}</p>
                    </div>

                    {/* Buttons für Aktionen */}
                    {/*<button className="buy-button">Buy Now (WIP)</button>*/}
                    <button className="add-to-cart-button" onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ItemDetailPage;
