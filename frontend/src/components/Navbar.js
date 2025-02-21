import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './../../src/styles/Navbar.css';

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    {/* Logo ou nom de l'application */}
                    <Link className="navbar-brand" to="/">Mon Application</Link>

                    {/* Bouton pour le menu responsive */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Contenu du menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                           

                 
                        </ul>

                        {/* Icône du profil à droite */}
                        <div className="ms-auto">
                            <Link className="nav-link profile-icon" to="/profile">
                                <i className="fas fa-user-circle" style={{ fontSize: '1.5rem' }}></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar (optionnel) */}
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li><NavLink to="/" activeClassName="active">Accueil</NavLink></li>
                    <li><NavLink to="/products" activeClassName="active">Produits</NavLink></li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;