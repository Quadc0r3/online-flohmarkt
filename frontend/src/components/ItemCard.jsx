import React from 'react';
import './ItemCard.css';

function ItemCard({ title, price }) {
    return (
        <div className="item-card">
            <img src="placeholder.jpg" alt={title} />
            <h3>{title}</h3>
            <p>Price: {price}</p>
            <button>View Details</button>
        </div>
    );
}

export default ItemCard;
