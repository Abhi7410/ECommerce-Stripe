import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/productsStyles.css';
import QuantityControl from '../components/QuantityControl';
import { MdDeleteForever, MdOutlinePayment } from 'react-icons/md';

const baseURL = 'http://localhost:5000/api/users'; // Update with your API endpoint

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        const userAuthToken = localStorage.getItem('authToken');
        axios.get(`${baseURL}/cart`, {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            },
        })
            .then((response) => {
                setCartItems(response.data);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
            });
    };

    const updateCartItemQuantity = (productId, newQuantity) => {
        const userAuthToken = localStorage.getItem('authToken');
        axios.put(
            `${baseURL}/cart`,
            { productId, quantity: newQuantity },
            {
                headers: {
                    Authorization: `Bearer ${userAuthToken}`,
                },
            }
        )
            .then(() => {
                fetchCartItems();
            })
            .catch((error) => {
                console.error('Error updating cart item quantity:', error);
            });
    };

    return (
        <div className="store-container">
            <h1>My Cart</h1>
            <div className="product-grid">
                {cartItems.map((product) => (
                    <div key={product.productId} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <QuantityControl
                                initialQuantity={product.quantity}
                                onQuantityChange={(newQuantity) => updateCartItemQuantity(product.productId, newQuantity)}
                            />
                            <div className="icon-container">
                                <MdDeleteForever
                                    className="delete-icon"
                                    onClick={() => updateCartItemQuantity(product.productId, 0)}
                                />
                                <MdOutlinePayment className="payment-icon" />
                            </div>
                        </div>
                        
                        <div className="product-details">
                            <div className="top-details">
                                <strong>{product.name}</strong>
                                <p className="small-font">{product.description}</p>
                            </div>
                            <div className="bottom-details">
                                <p className="brand-name">Brand: {product.brand}</p>
                                <p className="price">Price: ${product.price}</p>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Cart;
