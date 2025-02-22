import React from 'react';
import '../styles/ProfileModal.css'; // Import your CSS file for styling
const ProfileModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default ProfileModal;