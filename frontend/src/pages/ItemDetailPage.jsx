import { useLocation } from 'react-router-dom';

function ItemDetailPage() {
    const location = useLocation();
    const item = location.state?.item;

    return (
        <div>
            {item ? (
                <>
                    <h1>{item.title}</h1>
                    <p>Price: {item.price}€</p>
                    <p>Description: {item.description}</p>
                </>
            ) : (
                <p>Item not found</p>
            )}
        </div>
    );
}

export default ItemDetailPage;
