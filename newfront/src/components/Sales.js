import React, { useEffect, useState } from "react";
import "../styles/Sales.css";
import api from '../api'; // Import your axios instance

const Sales = () => {
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]); // State for products
    const [selectedSale, setSelectedSale] = useState(null);
    const [formData, setFormData] = useState({
        product_id: '',
        quantity_sold: '',
        total_price: '',
    });
    const [showAddSaleModal, setShowAddSaleModal] = useState(false);
    const [showEditSaleModal, setShowEditSaleModal] = useState(false);

    // Fetch sales and products data from API
    useEffect(() => {
        fetchSales();
        fetchProducts(); // Fetch products to populate the dropdown
    }, []);

    const fetchSales = () => {
        api.get("/sales")
            .then(response => {
                setSales(response.data);
            })
            .catch(error => {
                console.error("Error fetching sales data:", error);
            });
    };

    const fetchProducts = () => {
        api.get("/products") // Assuming you have an endpoint for products
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products data:", error);
            });
    };

    // Delete a sale
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this sale?")) {
            api.delete(`/sales/${id}`)
                .then(() => {
                    setSales(sales.filter(sale => sale.id !== id));
                })
                .catch(error => {
                    console.error("Error deleting sale:", error);
                });
        }
    };

    // Handle the edit button click
    const handleEdit = (sale) => {
        setSelectedSale(sale);
        setFormData({
            product_id: sale.product_id, // Set product ID
            quantity_sold: sale.quantity_sold,
            total_price: sale.total_price,
        });
        setShowEditSaleModal(true); // Show the edit modal
    };

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission for editing
    const handleEditSubmit = (e) => {
        e.preventDefault();
        api.put(`/sales/${selectedSale.id}`, {
            product_id: formData.product_id,
            quantity_sold: formData.quantity_sold,
            total_price: formData.total_price,
        })
        .then(response => {
            setSales(sales.map(sale => (sale.id === selectedSale.id ? response.data : sale)));
            setShowEditSaleModal(false); // Close the modal
            setSelectedSale(null);
            setFormData({
                product_id: '',
                quantity_sold: '',
                total_price: '',
            });
        })
        .catch(error => {
            console.error("Error updating sale:", error);
        });
    };

    // Handle form submission for adding a new sale
    const handleAddSaleSubmit = (e) => {
        e.preventDefault();
        api.post("/sales", {
            product_id: formData.product_id,
            quantity_sold: formData.quantity_sold,
            total_price: formData.total_price,
        })
        .then(response => {
            setSales([...sales, response.data]);
            setShowAddSaleModal(false);
            setFormData({
                product_id: '',
                quantity_sold: '',
                total_price: '',
            });
        })
        .catch(error => {
            console.error("Error adding sale:", error);
        });
    };

    return (
        <div className="sales-container">
            {/* Title and Button Row */}
            <div className="sales-header">
                <h2>Sales</h2>
                <button className="add-sale-btn" onClick={() => setShowAddSaleModal(true)}>Add Sale</button>
            </div>

            {/* Sales Cards */}
            <div className="sales-list">
                {sales.map(sale => (
                    <div key={sale.id} className="sale-card">
                        <h3>{sale.product ? sale.product.name : 'Unknown Product'}</h3> {/* Show product name */}
                        <p><strong>Quantity Sold:</strong> {sale.quantity_sold}</p>
                        <p><strong>Total Price:</strong> ${sale.total_price}</p>
                        <p><strong>Sold At:</strong> {new Date(sale.sold_at).toLocaleDateString()}</p>
                        <button className="edit-btn" onClick={() => handleEdit(sale)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(sale.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {/* Edit Sale Modal */}
            {showEditSaleModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Sale</h3>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Product:
                                <select name="product_id" value={formData.product_id} onChange={handleChange} required>
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Quantity Sold:
                                <input type="number" name="quantity_sold" value={formData.quantity_sold} onChange={handleChange} required />
                            </label>
                            <label>
                                Total Price:
                                <input type="number" name="total_price" value={formData.total_price} onChange={handleChange} required />
                            </label>
                            <button type="submit">Update Sale</button>
                            <button type="button" onClick={() => setShowEditSaleModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Sale Modal */}
            {showAddSaleModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add Sale</h3>
                        <form onSubmit={handleAddSaleSubmit}>
                            <label>
                                Product:
                                <select name="product_id" value={formData.product_id} onChange={handleChange} required>
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Quantity Sold:
                                <input type="number" name="quantity_sold" value={formData.quantity_sold} onChange={handleChange} required />
                            </label>
                            <label>
                                Total Price:
                                <input type="number" name="total_price" value={formData.total_price} onChange={handleChange} required />
                            </label>
                            <button type="submit">Add Sale</button>
                            <button type="button" onClick={() => setShowAddSaleModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sales;
