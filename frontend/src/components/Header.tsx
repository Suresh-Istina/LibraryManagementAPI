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
                        <li><a href="/view-books" onClick={toggleMenu}>View Books</a></li>
                        <li><a href="/add-book" onClick={toggleMenu}>Add Book</a></li>
                        <li><a href="/edit-book" onClick={toggleMenu}>Update Book</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
