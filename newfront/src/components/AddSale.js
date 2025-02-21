import React, { useState } from 'react';
import api from '../api'; // Your API configuration

const AddSale = () => {
    const [formData, setFormData] = useState({
        productId: '',
        quantity: '',
        totalPrice: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/sales', formData); // Replace with your API endpoint
            alert('Vente ajoutée avec succès !');
            setFormData({
                productId: '',
                quantity: '',
                totalPrice: '',
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la vente:', error);
        }
    };

    return (
        <div>
            <h1>Ajouter une Vente</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID du Produit</label>
                    <input
                        type="text"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantité</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Prix Total</label>
                    <input
                        type="number"
                        name="totalPrice"
                        value={formData.totalPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Ajouter
                </button>
            </form>
        </div>
    );
};

export default AddSale;