import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; 
import './../styles/AddProduct.css'; 

const AddProduct = () => {
    const navigate = useNavigate();

    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        stock_alert: '',
    });

    // State to handle validation errors
    const [errors, setErrors] = useState({});

    // Function to handle changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to validate the form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Product name is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = 'Quantity must be a valid number';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Price must be a valid number';
        if (!formData.stock_alert || isNaN(formData.stock_alert)) newErrors.stock_alert = 'Stock alert must be a valid number';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    // Function to submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await api.post('/products', formData); // Send data to the API
                alert('Product added successfully!');
                navigate('/products'); // Redirect to the products list
            } catch (error) {
                console.error('Error adding product:', error);
                alert('An error occurred while adding the product.');
            }
        }
    };

    return (
        <div className="add-product-page">
        
            <h1 className="add-product-title">Add a Product</h1>

       
            <div className="add-product-container">
                <form onSubmit={handleSubmit} className="add-product-form">
                 
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className={`form-input ${errors.name ? 'input-error' : ''}`}
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input
                            type="text"
                            className={`form-input ${errors.category ? 'input-error' : ''}`}
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                        />
                        {errors.category && <span className="error-message">{errors.category}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input
                            type="number"
                            className={`form-input ${errors.quantity ? 'input-error' : ''}`}
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                        {errors.quantity && <span className="error-message">{errors.quantity}</span>}
                    </div>

                  
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                            type="number"
                            step="0.01"
                            className={`form-input ${errors.price ? 'input-error' : ''}`}
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && <span className="error-message">{errors.price}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock_alert" className="form-label">Stock Alert</label>
                        <input
                            type="number"
                            className={`form-input ${errors.stock_alert ? 'input-error' : ''}`}
                            id="stock_alert"
                            name="stock_alert"
                            value={formData.stock_alert}
                            onChange={handleChange}
                        />
                        {errors.stock_alert && <span className="error-message">{errors.stock_alert}</span>}
                    </div>

             
                    <button type="submit" className="submit-button">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
