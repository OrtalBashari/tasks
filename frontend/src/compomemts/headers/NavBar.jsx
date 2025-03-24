import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Switch } from '@mui/material'; // Toggle for Dark Mode
import { FaBars, FaTimes } from 'react-icons/fa'; 

const NavLinks = [
    { name: 'Home', route: '/' },
    { name: 'Signup', route: '/Signup' },
    { name: 'SignIn', route: '/SignIn' },
    { name: 'Tasks', route: '/task' },
    { name: 'Profile', route: '/Profile' },
];

const NavBar = () => {
    const location = useLocation();
    const [isMobileMenu, setIsMobileMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [navBg, setNavBG] = useState('transparent');

    // שינוי רקע בעת גלילה
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrollPosition(scrollY);
            setNavBG(scrollY > 50 ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent");
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // שינוי מצב כהה/בהיר
    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(savedMode);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", isDarkMode);
        localStorage.setItem("darkMode", isDarkMode);
    }, [isDarkMode]);

    return (
        <nav className={`w-full flex justify-center items-center py-4 bg-white dark:bg-gray-800 shadow-md`}>
            <div className="flex items-center space-x-6">
                {/* לוגו */}
                <div className="flex items-center">
                    <img src="/logo.png" alt="Logo" className="w-32 h-32 object-contain" />
                </div>

                {/* תפריט ראשי */}
                <div className="hidden md:flex items-center space-x-6 text-gray-800 dark:text-white">
                    {NavLinks.map((link, index) => (
                        <NavLink 
                            key={index} 
                            to={link.route} 
                            className={({ isActive }) => 
                                `px-4 py-2 rounded-md transition-colors duration-300 ${
                                    isActive ? "text-green-500 font-bold" : "hover:text-green-500"
                                }`
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}

                    {/* מצב כהה/בהיר */}
                    <Switch 
                        checked={isDarkMode}
                        onChange={() => setIsDarkMode(!isDarkMode)}
                    />
                </div>

                {/* תפריט למובייל */}
                <div className="md:hidden">
                    <button onClick={() => setIsMobileMenu(!isMobileMenu)} className="text-gray-800 dark:text-white">
                        {isMobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* תפריט צד למובייל */}
            <div className={`md:hidden fixed top-0 right-0 w-2/3 h-full bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ${isMobileMenu ? "translate-x-0" : "translate-x-full"}`}>
                <button 
                    onClick={() => setIsMobileMenu(false)}
                    className="absolute top-4 right-4 text-gray-800 dark:text-white"
                >
                    <FaTimes size={24} />
                </button>
                <ul className="mt-16 flex flex-col items-center space-y-6 text-gray-800 dark:text-white">
                    {NavLinks.map((link, index) => (
                        <li key={index}>
                            <NavLink 
                                to={link.route} 
                                className="block text-lg py-2"
                                onClick={() => setIsMobileMenu(false)}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                    {/* מצב כהה/בהיר */}
                    <li className="mt-4">
                        <Switch 
                            checked={isDarkMode}
                            onChange={() => setIsDarkMode(!isDarkMode)}
                        />

                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
