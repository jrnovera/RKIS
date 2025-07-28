import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AboutSidePanel from './AboutSidePanel'
import './AboutSidePanel.css'
import './Navbar.css'
import { useAuth } from '../contexts/AuthContext'


function Navbar() {
    const [showAboutPanel, setShowAboutPanel] = useState(false);
    const [error, setError] = useState('');
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    
    const toggleAboutPanel = (e) => {
        e.preventDefault();
        setShowAboutPanel(!showAboutPanel);
    };
    
    const handleLogout = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            setError('Failed to log out');
        }
    };
    
    // Handle ESC key to close About panel
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && showAboutPanel) {
                setShowAboutPanel(false);
            }
        };
        
        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [showAboutPanel]);
    
    // Prevent scrolling on body when about panel is open
    useEffect(() => {
        if (showAboutPanel) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [showAboutPanel]);
    
    return (
        <>
            <header className="header">
                <div className="logo">Katutubo IS</div>
                <nav className="nav">
                    <Link to="/" className="nav-item active">Home</Link>
                
                    <a href="#" onClick={toggleAboutPanel} className={`nav-item about-link ${showAboutPanel ? 'active' : ''}`}>About Us</a>
                    {currentUser ? (
                        <>
                            
                            <a href="#" onClick={handleLogout} className="nav-item">Log Out</a>
                        </>
                    ) : (
                        <Link to="/login" className="nav-item">Login</Link>
                    )}
                    {error && <span className="error-message">{error}</span>}
                </nav>
            </header>
            <AboutSidePanel isOpen={showAboutPanel} onClose={() => setShowAboutPanel(false)} />
        </>
    )
}

export default Navbar
