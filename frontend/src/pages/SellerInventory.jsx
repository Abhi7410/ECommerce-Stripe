import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/productsStyles.css';
import axios from 'axios';
const baseURL = 'http://localhost:5000/api/products';

const SellerInventory = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [productData, setProductData] = useState({
        name: '',
        image: '',
        price: 0,
        quantity: 0,
        description: '',
    });

    const [isModalOpen, setModalIsOpen] = useState(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        fetchSellerInventory();
    }, [products]);

    const handleChange = (e) => {
        setProductData({
            ...productData,
            [e.target.name]: e.target.value,
        });
    }

    const fetchSellerInventory = () => {
        const userAuthToken = localStorage.getItem('authToken');
        axios.get(baseURL, {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            },
        })
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching seller inventory:', error);
            });
    };

    const handleUpdate = (product) => {
        setProductData(product);
        openModal();
    };

    const handleDelete = (productId) => {
        const userAuthToken = localStorage.getItem('authToken');
        axios.delete(`${baseURL}/${productId}`, {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            },
        })
            .then(() => {
                fetchSellerInventory();
            })
            .catch((error) => {
                console.error('Error deleting product:', error);
            });

    };


    const updateProduct = (updatedProduct) => {
        console.log(updatedProduct)
        const userAuthToken = localStorage.getItem('authToken');
        axios.put(`${baseURL}/${updatedProduct._id}`, updatedProduct, {
            headers: {
                Authorization: `Bearer ${userAuthToken}`,
            }
        })
            .then(() => {
                fetchSellerInventory();
                closeModal();
            })
            .catch((error) => {
                console.error('Error updating product:', error);
            });
    };

    return (
        <div className="seller-inventory">
            <h2>Seller Inventory</h2>
            <ul className="product-grid">
                {products.map((product) => (
                    <li key={product._id} className="product-card">
                        <img src={product.image} alt={product.name} className="product-image" />
                        <div className="product-details">
                            <div className="product-text">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">{product.description}</p>
                                <p className="product-price">Price: ${product.price}</p>
                                <p className="product-quantity">Quantity: {product.quantity}</p>
                            </div>
                            <div className="product-actions">
                                <button className="btn btn-update" onClick={() => handleUpdate(product)}>Update</button>
                                <button className="btn btn-delete" onClick={() => handleDelete(product._id)}>Delete</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Update Product Modal"
                className="modal"
                overlayClassName="overlay"
            >
                <div className="modal-content">
                    {/* <button className="btn btn-round" onClick={closeModal}>Close</button> */}
                    <h3>Update Product</h3>
                    <section className="form">
                        <form onSubmit={handleUpdate}>
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

                        <button className="btn btn-block"  onClick={() => updateProduct(productData)}>Save Changes</button>
                            
                        </form>
                    </section>
                </div>
            </Modal>
        </div>
    );
};


export default SellerInventory;
