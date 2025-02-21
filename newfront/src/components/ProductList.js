import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'; // Import des icônes
import { Modal, Button, Form } from 'react-bootstrap'; // Import des composants Bootstrap
import './../styles/ProductList.css'; // Import des styles CSS
import Alert from '../components/Alert'; // Adjust the path if necessary





const ProductList = () => {
    const [products, setProducts] = useState([]); // État pour stocker les produits
    const [loading, setLoading] = useState(true); // État pour gérer le chargement
    const [showEditModal, setShowEditModal] = useState(false); // État pour gérer l'affichage du modal
    const [selectedProduct, setSelectedProduct] = useState(null); // État pour stocker le produit sélectionné
    const navigate = useNavigate();

    // Fonction pour récupérer les produits
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products'); // Requête GET vers /api/products
            setProducts(response.data); // Mettre à jour l'état avec les produits reçus
        } catch (error) {
            console.error('Erreur lors de la récupération des produits:', error);
        } finally {
            setLoading(false); // Arrêter le chargement
        }
    };

    // Fonction pour supprimer un produit
    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
            try {
                await api.delete(`/products/${id}`); // Requête DELETE vers /api/products/{id}
                alert('Produit supprimé avec succès !');
                fetchProducts(); // Recharger la liste des produits après suppression
            } catch (error) {
                console.error('Erreur lors de la suppression du produit:', error);
            }
        }
    };

    // Fonction pour ouvrir le modal d'édition
    const handleEdit = (product) => {
        setSelectedProduct(product); // Définir le produit sélectionné
        setShowEditModal(true); // Afficher le modal
    };

    // Fonction pour fermer le modal d'édition
    const handleCloseEditModal = () => {
        setShowEditModal(false); // Masquer le modal
        setSelectedProduct(null); // Réinitialiser le produit sélectionné
    };

    // Fonction pour sauvegarder les modifications
    const handleSaveChanges = async () => {
        try {
            await api.put(`/products/${selectedProduct.id}`, selectedProduct); // Requête PUT pour mettre à jour le produit
            alert('Produit mis à jour avec succès !');
            fetchProducts(); // Recharger la liste des produits après modification
            handleCloseEditModal(); // Fermer le modal
        } catch (error) {
            console.error('Erreur lors de la mise à jour du produit:', error);
        }
    };

    // Fonction pour naviguer vers la page d'ajout de produit
    const handleAddProduct = () => {
        navigate('/products/add'); // Navigate to the add product page
    };

    // Fonction pour déterminer la couleur du cercle en fonction de l'alerte de stock
    const getStockAlertColor = (stockAlert) => {
        if (stockAlert <= 5) {
            return 'red'; // Rouge si l'alerte est <= 5
        } else if (stockAlert > 5 && stockAlert <= 50) {
            return 'orange'; // Orange si l'alerte est entre 6 et 50
        } else {
            return 'green'; // Vert si l'alerte est > 50
        }
    };

    // Utiliser useEffect pour appeler fetchProducts au chargement du composant
    useEffect(() => {
        fetchProducts();
    }, []);

    // Afficher un message de chargement si les données ne sont pas encore disponibles
    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Liste des produits</h1>
            <div className="d-flex justify-content-end mb-4">
                <button
                    className="btn btn-primary"
                    onClick={handleAddProduct}
                >
                    <FaPlus /> Ajouter un produit
                </button>
            </div>
            <Alert products={products} />
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th>Quantité</th>
                        <th>Prix</th>
                        <th>Alerte stock</th>
                        <th className="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.category}</td>
                            <td>{product.quantity}</td>
                            <td>{product.price} €</td>
                            <td>
                                <div
                                    style={{
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: getStockAlertColor(product.stock_alert),
                                        display: 'inline-block',
                                        marginRight: '10px',
                                    }}
                                ></div>
                            </td>
                            <td className="actions">
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={() => handleEdit(product)}
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(product.id)}
                                >
                                    <FaTrash /> {/* Icône de suppression */}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal pour l'édition du produit */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProduct && (
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedProduct.name}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formCategory">
                                <Form.Label>Catégorie</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={selectedProduct.category}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            category: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formQuantity">
                                <Form.Label>Quantité</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={selectedProduct.quantity}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            quantity: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formPrice">
                                <Form.Label>Prix</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={selectedProduct.price}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            price: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                            <Form.Group controlId="formStockAlert">
                                <Form.Label>Alerte stock</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={selectedProduct.stock_alert}
                                    onChange={(e) =>
                                        setSelectedProduct({
                                            ...selectedProduct,
                                            stock_alert: e.target.value,
                                        })
                                    }
                                />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Sauvegarder
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default ProductList;