import React, { useState } from 'react';
import './Header.css';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <h1 className="logo"><a href="/">Book Haven</a></h1>
                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
                <nav className={isOpen ? 'nav-open' : ''}>
                    <ul>
                        <li><a href="/manage-books" onClick={toggleMenu}>Manage Books</a></li>
                        <li><a href="/add-book" onClick={toggleMenu}>Add Books</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
