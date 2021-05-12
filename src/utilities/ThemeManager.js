import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(
    () => localStorage.getItem('darkTheme') === 'true'
  );

  useEffect(() => {
    if (darkTheme) {
      localStorage.setItem('darkTheme', darkTheme);
    } else {
      localStorage.setItem('darkTheme', darkTheme);
    }
  }, [darkTheme]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };
  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.any,
};
