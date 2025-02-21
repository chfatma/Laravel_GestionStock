import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api'; // Assuming you have a configured api instance

const ProductEdit = () => {
    const { id } = useParams(); // Get the product ID from the URL parameters
    const navigate = useNavigate(); // For navigation
    const [product, setProduct] = useState({ name: '', category: '', quantity: '', price: '', stock_alert: '' });
    const [loading, setLoading] = useState(true);

    // Function to fetch the product details for the given ID
    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération du produit:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${id}`, product); // Update the product via PUT request
            alert('Produit modifié avec succès !');
            navigate('/products'); // Redirect to the products list after editing
        } catch (error) {
            console.error('Erreur lors de la modification du produit:', error);
        }
    };

    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Modifier le produit</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.name}
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Catégorie</label>
                    <input
                        type="text"
                        className="form-control"
                        value={product.category}
                        onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Quantité</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.quantity}
                        onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.price}
                        onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Alerte stock</label>
                    <input
                        type="number"
                        className="form-control"
                        value={product.stock_alert}
                        onChange={(e) => setProduct({ ...product, stock_alert: e.target.value })}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Sauvegarder les modifications</button>
            </form>
        </div>
    );
};

export default ProductEdit;
