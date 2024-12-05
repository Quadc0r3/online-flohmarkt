import './ItemCard.css';
import { useNavigate } from 'react-router-dom';

function ItemCard({ id, title, price, imageURL }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/item/${id}`);
    };

    return (
        <div className="item-card" onClick={handleCardClick}>
            <img className="item-image" src={imageURL} alt={title} />
            <h3>{title}</h3>
            <p>{price}</p>
        </div>
    );
}

export default ItemCard;
