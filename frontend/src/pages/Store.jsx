import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/productsStyles.css'
const baseURL = 'http://localhost:5000/api/products'; // Update with your API endpoint
const userURL = 'http://localhost:5000/api/users';
const Store = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get(baseURL)
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    };

    const handleAddToCart = (productId) => {
        const userAuthToken = localStorage.getItem('authToken');
        axios.post(`${userURL}/cart`, { productId }, {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            },
        })
            .then((response) => {
                console.log('Product added to cart:', response.data);
            })
            .catch((error) => {
                console.error('Error adding product to cart:', error);
            });
    };

    return (
        <div className="store-container">
            <h1>Welcome to Our Store!</h1>
            <p>Explore a variety of products from different sellers.</p>

            <div className="product-grid">
                {products.map((product) => (
                    <div key={product._id} className="product-card">
                        <div className="product-image">
                            <img src={product.image} alt={product.name} />
                            <button
                                className="btn "
                                onClick={() => handleAddToCart(product._id)}
                            >
                                Add
                            </button>
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


/* Add more styles as needed */


export default Store;
