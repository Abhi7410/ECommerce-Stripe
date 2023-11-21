import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://localhost:5000/api/products';

const AddProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        price: 0,
        quantity: 0,
        description: '',
        brand: '',
    });

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product Data Submitted:', productData);
        const newProduct = {
            name: productData.name,
            image: productData.image,
            description: productData.description,
            quantity: productData.quantity,
            price: productData.price,
            brand: productData.brand,
        };
        axios
            .post(baseURL, newProduct, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                },
            })
            .then((res) => {
                toast.success('Product Added Successfully');
                setProductData({
                    name: '',
                    image: '',
                    price: 0,
                    quantity: 0,
                    description: '',
                    brand: '',
                });
            })
            .catch((err) => {
                if (err.response) {
                    toast.error(err.response.data.error);
                } else if (err.request) {
                    toast.error('No response received from the server');
                } else {
                    toast.error('An error occurred while processing the request');
                }
            });
    };

    return (
        <div>
            <section className="heading">
                <h3>Add Product</h3>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            id="image"
                            name="image"
                            value={productData.image}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            className="form-control"
                            id="brand"
                            name="brand"
                            value={productData.brand}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="quantity"
                                    name="quantity"
                                    value={productData.quantity}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    name="price"
                                    value={productData.price}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="Submit" className="btn btn-block">
                            Add To Inventory
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AddProduct;
