// import React from 'react';
import './ItemCard.css';

function ItemCard({ title, price, description }) {
    return (
        <div className="item-card">
            <img src="placeholder.jpg" alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            <button><strong>{price}</strong></button>
        </div>
    );
}

export default ItemCard;
