import React, { useEffect, useState } from 'react';
import api from '../api'; // Adjust the import according to your API configuration
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './../styles/ProductList.css'; // Adjust the import according to your styles
import Alert from '../components/Alert';
import Modal from '../components/Modal'; // Import the Modal component

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        quantity: '',
        price: '',
        stock_alert: '',
    });
    const navigate = useNavigate();

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle product deletion
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await api.delete(`/products/${id}`);
                alert('Product deleted successfully!');
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    // Handle opening the edit modal
    const handleEdit = (product) => {
        setSelectedProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            quantity: product.quantity,
            price: product.price,
            stock_alert: product.stock_alert,
        });
        setIsModalOpen(true);
    };

    // Handle navigating to add product page
    const handleAddProduct = () => {
        navigate('/products/add');
    };

    // Get stock alert color
    const getStockAlertColor = (stockAlert) => {
        if (stockAlert <= 5) return 'red';
        if (stockAlert > 5 && stockAlert <= 50) return 'orange';
        return 'green';
    };

    // Handle input changes in the edit form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle updating a product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await api.put(`/products/${selectedProduct.id}`, formData);
            alert('Product updated successfully!');
            fetchProducts();
            setIsModalOpen(false); // Close modal after updating
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>Product List</h1>
            <div className="d-flex justify-content-end mb-4">
                <button className="btn btn-primary" onClick={handleAddProduct}>
                    <FaPlus /> Add Product
                </button>
            </div>
            <Alert products={products} />
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Stock Alert</th>
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
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Edit Product"
>
    <form onSubmit={handleUpdateProduct}>
        <div>
            <label>Name:</label>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
            />
        </div>
        <div>
            <label>Category:</label>
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
            />
        </div>
        <div>
            <label>Quantity:</label>
            <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                required
            />
        </div>
        <div>
            <label>Price:</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
            />
        </div>
        <div>
            <label>Stock Alert:</label>
            <input
                type="number"
                name="stock_alert"
                value={formData.stock_alert}
                onChange={handleInputChange}
                required
            />
        </div>
        <button type="submit">Update Product</button>
    </form>
</Modal>

        </div>
    );
};

export default ProductList;
