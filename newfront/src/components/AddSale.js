import React, { useState } from 'react';
import api from '../api'; 



const AddSale = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        productId: '',
        quantity: '',
        totalPrice: '',
    });

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target; // Destructure name and value from event target
        setFormData({
            ...formData,
            [name]: value, // Update the corresponding field in formData
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to add the sale
            await api.post('/sales', formData); 
            alert('Sale added successfully!'); // Show success message
            // Reset form data after successful submission
            setFormData({
                productId: '',
                quantity: '',
                totalPrice: '',
            });
        } catch (error) {
            console.error('Error adding sale:', error); // Log any errors
        }
    };

    return (
        <div>
            <h1>Add a Sale</h1>
            <form onSubmit={handleSubmit}> {/* Form to add a sale */}
                {/* Product ID input field */}
                <div className="form-group">
                    <label>Product ID</label>
                    <input
                        type="text"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required 
                    />
                </div>
              
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required 
                    />
                </div>
             
                <div className="form-group">
                    <label>Total Price</label>
                    <input
                        type="number"
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleChange}
                        required 
                    />
                </div>
           
                <button type="submit" className="btn btn-primary">
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddSale;
