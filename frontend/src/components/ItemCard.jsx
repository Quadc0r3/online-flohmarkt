// import React from 'react';
import './ItemCard.css';

function ItemCard({ title, price, imageURL }) {

    return (
        <div className="item-card">
            <img src={imageURL} alt={title} className="item-image" />
            <h3>{title}</h3>
            <p>{price}</p>
        </div>
    );
}

export default ItemCard;
