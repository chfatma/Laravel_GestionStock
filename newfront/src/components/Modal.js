import React from 'react';
import '../styles/Modal.css'; // Make sure to have this CSS file for styling

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null; // If not open, return nothing

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{title}</h2>
                <button className="close-button" onClick={onClose}>X</button>
                {children} {/* This will display the form passed as children */}
            </div>
        </div>
    );
};

export default Modal;
