import React from 'react';
import './Components.css';

const Button = ({ 
    children, 
    variant = 'primary', 
    size = 'md', 
    className = '', 
    onClick,
    ...props 
}) => {
    return (
        <button 
            className={`btn btn-${variant} btn-${size} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
