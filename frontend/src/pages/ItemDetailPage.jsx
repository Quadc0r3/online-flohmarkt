import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './ItemDetailPage.css';

function ItemDetailPage() {
    const { id } = useParams(); 
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/items/${id}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((error) => {
                console.error('Error fetching item details:', error);
            });
    }, [id]); 

    if (!item) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="item-detail-page">
            <h1>{item.title}</h1>
            <img src={item.imageURL || 'placeholder.jpg'} alt={item.title} />
            <p>{item.description}</p>
            <p>Price: {item.price}€</p>
            <p>Quantity Available: {item.quantity}</p>
            <p>Category: {item.category}</p>
        </div>
    );
}

export default ItemDetailPage;
