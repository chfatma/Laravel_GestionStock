import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './../../src/styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Mon Application</Link>
                    
                    {/* Profile Icon */}
                    <div className="ms-auto">
                        <Link className="nav-link profile-icon" to="/profile">
                            <i className="fas fa-user-circle"></i> {/* Use Font Awesome for icon */}
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <div className="sidebar">
    <ul className="sidebar-menu">
        <li>
            <NavLink to="/" activeClassName="active">
                Accueil
            </NavLink>
        </li>
        <li>
            <NavLink to="/products" activeClassName="active">
                Produits
            </NavLink>
        </li>
        {/* Add more sidebar links here */}
    </ul>
</div>


        </>
    );
};

export default Navbar;