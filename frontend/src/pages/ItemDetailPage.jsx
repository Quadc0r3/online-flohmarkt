// import React from 'react';
import { useParams } from 'react-router-dom';

function ItemDetailPage() {
    const { id } = useParams();

    return (
        <div>
            <h1>Item Details</h1>
            <p>Details for item with ID: {id}</p>
        </div>
    );
}

export default ItemDetailPage;
