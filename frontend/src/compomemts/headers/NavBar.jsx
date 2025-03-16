import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const NavLinks = [
    { name: 'Home', route: '/' },
    { name: 'Signup', route: '/Signup' },
    { name: 'SignIn', route: '/SignIn' },
    { name: 'Tasks', route: '/task' },
    { name: 'Profile', route: '/Profile' },
];


const theme = createTheme( {
  palette: {
    primary: {
      main: "#ff0000"
    },

    secondary: {
      main: "#00ff00"
    },
  },
});

const NavBar = () => {
  return (
    <nav>
      <div className='lg:w-[95%] mx-auto sm:px-6 lg:px-6'>
        <div className='px-4 py-4 flex items-center  '>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className='w-64 h-64 object-contain' />
          </div>

          {/* Nav links */}
          <div className='hidden md:block text-black dark:text-white'>
            <ul className='flex space-x-6'>
              {NavLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.route} className="px-4 hover:blue">{link.name}</a>
                </li>
              ))}



              {/*Dark / Light mode */}

              <li>Dark / Light</li>
            </ul>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
