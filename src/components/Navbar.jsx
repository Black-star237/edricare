import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Briefcase, Menu, X, LogIn } from 'lucide-react';
import Button from './Button';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Accueil', path: '/', icon: <Home size={18} /> },
        { name: 'Espace Client', path: '/client', icon: <Users size={18} /> },
        { name: 'Espace Prestataire', path: '/prestataire', icon: <Briefcase size={18} /> },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                {/* Logo */}
                <Link to="/" className="nav-logo-link">
                    <div className="nav-logo-icon">🏠</div>
                    <span className="nav-logo-text">EldriCare</span>
                </Link>

                {/* Desktop Nav */}
                <div className="desktop-menu">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-linkItem ${location.pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="desktop-actions">
                    <Link to="/auth?mode=login">
                        <Button variant="ghost" size="sm">
                            <LogIn size={18} />
                            Se connecter
                        </Button>
                    </Link>
                    <Link to="/auth?mode=register">
                        <Button variant="primary" size="sm">S'inscrire</Button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="mobile-toggle"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mobile-menu"
                    >
                        <div className="mobile-nav-links">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="mobile-linkItem"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            ))}
                            <div className="mobile-divider" />
                            <Link to="/auth?mode=login" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full">Se connecter</Button>
                            </Link>
                            <Link to="/auth?mode=register" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="primary" className="w-full">S'inscrire gratuitement</Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
