import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sellItem } from "../api";
import './CheckoutPage.css';

function Checkout() {
    let [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const uniqueCart = storedCart.reduce((acc, item) => {
            const existingItem = acc.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                acc.push({ ...item, quantity: 1 });
            }
            return acc;
        }, []);
        setCartItems(uniqueCart);
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);

        setCartItems(updatedCart);
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handlePurchase = async () => {

        cartItems = JSON.parse(sessionStorage.getItem('cart'));

        console.log("For Loop:");
        for ( let i = 0; i < cartItems.length; i++ ) {
            await sellItem(cartItems[i])
                .then((response) => {
                    switch (response.status) {
                        case 200:
                            alert('Thank you for your purchase!');
                            break;
                    }
                })
                .catch((error) => {
                    if (error.status === 400) {
                        alert('Item is unfortunately sold out.');
                        cartItems.splice(i, 1); // remove item form cart
                        console.log(cartItems);
                        sessionStorage.setItem('cart', JSON.stringify(cartItems));
                    }
                });
        }
        sessionStorage.removeItem('cart');
        setCartItems([]);

        // navigate('/'); // Redirect to home or order confirmation page
        // window.location.reload();
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    if (cartItems.length === 0) {
        return (
            <div className="checkout-container">
                <h2>Your Shopping Cart is Empty</h2>
                <button onClick={() => navigate('/search')}>Go Shopping</button>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <h2>Your Shopping Cart</h2>
            <ul className="cart-items">
                {cartItems.map(item => (
                    <li key={item.id} className="cart-item">
                        <img src={item.image} alt={item.title} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h3>{item.title}</h3>
                            <p>Price: ${item.price.toFixed(2)}</p>
                            <p>Quantity:
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value, 10);
                                        if (newQuantity > 0) {
                                            setCartItems(cartItems.map(cartItem =>
                                                cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
                                            ));
                                            sessionStorage.setItem('cart', JSON.stringify(cartItems));
                                        }
                                    }}
                                />
                            </p>
                            <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="checkout-summary">
                <h3>Total: ${calculateTotal()}</h3>
                <button className="checkout-purchase" onClick={handlePurchase}>Purchase</button>
            </div>
        </div>
    );
}

export default Checkout;