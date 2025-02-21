// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import AddProduct from './components/AddProduct';



function App() {
    return (
        <Router>
            <Navbar />
            <div className="container mt-4" >
                <Routes >
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route path="/products/edit/:id" element={<ProductEdit />} />
                    <Route path="/products/add" element={<AddProduct />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;