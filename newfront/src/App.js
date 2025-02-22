// src/App.js
/*
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
*/





















import React, { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductEdit from './components/ProductEdit';
import AddProduct from './components/AddProduct';
import Sales from './components/Sales'; 
import Login from './components/Login';
import StockEntryList from './components/StockEntryList';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

    return (
        <Router>
            <Routes>
                {!isAuthenticated ? (
                    <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                ) : (
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="products" element={<ProductList />} />
                        <Route path="products/edit/:id" element={<ProductEdit />} />
                        <Route path="products/add" element={<AddProduct />} />
                        <Route path="stock-entries" element={<StockEntryList />} />
                        <Route path="sales" element={<Sales />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Route>
                )}
            </Routes>
        </Router>
    );
};

export default App;
