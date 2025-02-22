import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import '../styles/StockEntryList.css'


const StockEntryList = () => {
  const [stockEntries, setStockEntries] = useState([]);
  const [products, setProducts] = useState([]); // Store product data
  const [editingEntryId, setEditingEntryId] = useState(null); // Track which entry is being edited
  const [formData, setFormData] = useState({
    product_id: '',
    quantity_added: '',
    entry_date: '',
  });
  const [showAddEntryModal, setShowAddEntryModal] = useState(false); // State for the add modal

  // Fetch all stock entries and products
  useEffect(() => {
    fetchStockEntries();
    fetchProducts();
  }, []);

  const fetchStockEntries = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/stock-entries');
      setStockEntries(response.data);
    } catch (error) {
      console.error('Error fetching stock entries:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/products'); // Adjust the endpoint as needed
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle delete with confirmation
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this stock entry?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/api/stock-entries/${id}`);
        fetchStockEntries(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting stock entry:', error);
      }
    }
  };

  // Handle edit button click
  const handleEditClick = (entry) => {
    setEditingEntryId(entry.id);
    setFormData({
      product_id: entry.product_id,
      quantity_added: entry.quantity_added,
      entry_date: entry.entry_date.split('T')[0], // Ensure date is in YYYY-MM-DD format
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingEntryId(null);
    setFormData({
      product_id: '',
      quantity_added: '',
      entry_date: '',
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/stock-entries/${id}`, formData);
      fetchStockEntries(); // Refresh the list after update
      setEditingEntryId(null); // Exit edit mode
    } catch (error) {
      console.error('Error updating stock entry:', error);
    }
  };

  // Handle form submission for adding a new stock entry
  const handleAddEntrySubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/stock-entries', formData);
      fetchStockEntries(); // Refresh the list after adding
      setShowAddEntryModal(false); // Close the modal
      setFormData({
        product_id: '',
        quantity_added: '',
        entry_date: '',
      }); // Reset form data
    } catch (error) {
      console.error('Error adding stock entry:', error);
    }
  };

  // Helper function to get product name by ID
  const getProductNameById = (productId) => {
    const product = products.find((p) => p.id === productId);
    return product ? product.name : 'Unknown Product';
  };

  return (
    <div className="container mt-5">
    <h1 className="stock-entries-title">Stock Entries</h1>
    <div className="button-container">
    
      <button className="btn btn-primary"   onClick={() => setShowAddEntryModal(true)}>
                         Add Entries
                      </button>
    </div>
      {/* Add Stock Entry Modal */}
      {showAddEntryModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Add Stock Entry</h3>
            <form onSubmit={handleAddEntrySubmit}>
              <div className="form-group">
                <label>Product</label>
                <select
                  className="form-control"
                  name="product_id"
                  value={formData.product_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Quantity Added</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity_added"
                  value={formData.quantity_added}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Entry Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="entry_date"
                  value={formData.entry_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button variant="primary" type="submit">
                Add Entry
              </Button>
              <Button variant="secondary" onClick={() => setShowAddEntryModal(false)} className="ml-2">
                Cancel
              </Button>
            </form>
          </div>
        </div>
      )}

      <div className="row">
        {stockEntries.map((entry) => (
          <div key={entry.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                {editingEntryId === entry.id ? (
                  // Edit form
                  <form onSubmit={(e) => handleEditSubmit(e, entry.id)}>
                    <div className="form-group">
                      <label>Product</label>
                      <select
                        className="form-control"
                        name="product_id"
                        value={formData.product_id}
                        onChange={handleInputChange}
                      >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Quantity Added</label>
                      <input
                        type="number"
                        className="form-control"
                        name="quantity_added"
                        value={formData.quantity_added}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Entry Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="entry_date"
                        value={formData.entry_date}
                        onChange={handleInputChange}
                      />
                    </div>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleCancelEdit} className="ml-2">
                      Cancel
                    </Button>
                  </form>
                ) : (
                  // Display mode
                  <>
                    <h5 className="card-title">Product: {getProductNameById(entry.product_id)}</h5>
                    <p className="card-text">Quantity Added: {entry.quantity_added}</p>
                    <p className="card-text">Entry Date: {entry.entry_date.split('T')[0]}</p>
                    <Button variant="primary" onClick={() => handleEditClick(entry)}>
                      Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(entry.id)} className="ml-2">
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockEntryList;
