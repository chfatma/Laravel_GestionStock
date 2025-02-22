import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import '../styles/Navbar.css'; // Import your CSS file

const Layout = () => {
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
        <li><Link to="/sales">Sales</Link></li>
        
        <li>
                        <NavLink to="/stock-entries" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Stock Entries
                        </NavLink>
                    </li>
         {/* Add Sales Link */}
    </ul>
</div>




            {/* Main Content Area */}
            <div className="main-content">
                <Outlet /> {/* This will render the child components (pages) */}
            </div>
        </>
    );
};

export default Layout;