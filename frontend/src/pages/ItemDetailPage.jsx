import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ItemDetailPage.css';

function ItemDetailPage() {
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/${id}`)
            .then(response => setItem(response.data))
            .catch(error => console.error(error));
    }, [id]);

    if (!item) return <p>Loading...</p>;

    return (
        <div className="item-detail-page">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <p>Price: {item.price}€</p>
        </div>
    );
}

export default ItemDetailPage;
