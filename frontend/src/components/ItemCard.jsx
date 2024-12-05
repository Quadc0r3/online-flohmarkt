import { Link } from 'react-router-dom';
import './ItemCard.css';

function ItemCard({ id, title, price, imageURL }) {
    return (
        <div className="item-card">
            <Link to={`/item/${id}`}>
                <img src={imageURL} alt={title} className="item-image" />
                <h3>{title}</h3>
                <p>Price: {price}</p>
            </Link>
        </div>
    );
}

export default ItemCard;
