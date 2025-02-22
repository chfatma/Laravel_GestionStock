import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal'; // Import the ProfileModal component
import '../styles/Navbar.css';

const Layout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
    const [profileData, setProfileData] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        console.log("Logout button clicked"); // Debugging

        // Remove authToken and user from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        console.log("LocalStorage cleared"); // Debugging

        // Navigate to the login page
        navigate('/login');
        console.log("Navigated to /login"); // Debugging
    };

    const handleEditProfile = () => {
        // Fetch user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setProfileData({
                id: user.id,
                name: user.name,
                email: user.email,
                password: '', // Password is not stored in localStorage for security reasons
            });
        }
        setIsModalOpen(true); // Open modal
    };

    const handleSaveProfile = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const formData = new FormData(event.target);
        const updatedProfile = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
        };

        try {
            // Send PUT request to update the user's profile
            const response = await fetch(`http://your-backend-url/api/users/${profileData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(updatedProfile),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();

            // Update localStorage with the new user data
            localStorage.setItem('user', JSON.stringify(updatedUser));

            // Close the modal
            setIsModalOpen(false);

            // Optional: Refresh the page or update the UI
            console.log("Profile updated successfully:", updatedUser);
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">My Application</Link>
                    
                    <div className="ms-auto profile-icon-container" ref={dropdownRef}>
                        <div className="nav-link profile-icon" onClick={toggleDropdown}>
                            <i className="fas fa-user-circle"></i>
                        </div>
                        {isDropdownOpen && (
                            <div className="profile-dropdown">
                                <button className="dropdown-item" onClick={handleEditProfile}>Edit Profile</button>
                                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="sidebar">
                <ul className="sidebar-menu">
                    <li>
                        <NavLink to="/" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/products" activeClassName="active">Products</NavLink>
                    </li>
                    <li>
                        <Link to="/sales">Sales</Link>
                    </li>
                    <li>
                        <NavLink to="/stock-entries" className={({ isActive }) => (isActive ? 'active' : '')}>
                            Stock Entries
                        </NavLink>
                    </li>
                </ul>
            </div>

            <div className="main-content">
                <Outlet />
            </div>

            {/* Profile Modal for editing profile */}
            <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Edit Profile</h2>
                <form className="modal-form" onSubmit={handleSaveProfile}>
                    <label>
                        Name:
                        <input type="text" name="name" defaultValue={profileData.name} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" name="email" defaultValue={profileData.email} required />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Enter new password" required />
                    </label>
                    <button type="submit">Save</button>
                </form>
            </ProfileModal>
        </>
    );
};

export default Layout;