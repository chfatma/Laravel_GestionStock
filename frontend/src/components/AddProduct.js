import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Assurez-vous que votre fichier api.js est correctement configuré
import './../styles/AddProduct.css'; // Import des styles CSS

const AddProduct = () => {
    const navigate = useNavigate();

    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        stock_alert: '',
    });

    // État pour gérer les erreurs de validation
    const [errors, setErrors] = useState({});

    // Fonction pour gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Fonction pour valider le formulaire
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Le nom est requis';
        if (!formData.category) newErrors.category = 'La catégorie est requise';
        if (!formData.quantity || isNaN(formData.quantity)) newErrors.quantity = 'La quantité doit être un nombre valide';
        if (!formData.price || isNaN(formData.price)) newErrors.price = 'Le prix doit être un nombre valide';
        if (!formData.stock_alert || isNaN(formData.stock_alert)) newErrors.stock_alert = 'L\'alerte de stock doit être un nombre valide';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
    };

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await api.post('/products', formData); // Envoyer les données à l'API
                alert('Produit ajouté avec succès !');
                navigate('/products'); // Rediriger vers la liste des produits
            } catch (error) {
                console.error('Erreur lors de l\'ajout du produit:', error);
                alert('Une erreur est survenue lors de l\'ajout du produit.');
            }
        }
    };

    return (
        <div className="add-product-page">
            {/* Titre en dehors de la carte */}
            <h1 className="add-product-title">Ajouter un produit</h1>

            {/* Carte contenant le formulaire */}
            <div className="add-product-container">
                <form onSubmit={handleSubmit} className="add-product-form">
                    {/* Champ Nom */}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nom du produit</label>
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

                    {/* Champ Catégorie */}
                    <div className="form-group">
                        <label htmlFor="category" className="form-label">Catégorie</label>
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

                    {/* Champ Quantité */}
                    <div className="form-group">
                        <label htmlFor="quantity" className="form-label">Quantité</label>
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

                    {/* Champ Prix */}
                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Prix</label>
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

                    {/* Champ Alerte de stock */}
                    <div className="form-group">
                        <label htmlFor="stock_alert" className="form-label">Alerte de stock</label>
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

                    {/* Bouton de soumission */}
                    <button type="submit" className="submit-button">Ajouter le produit</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;