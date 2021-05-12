import React, { useContext } from 'react';
import { ThemeContext } from '../../utilities/ThemeManager';
import './Toggle.css';

function Toggle() {
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  return (
    <div onClick={toggleTheme} className={`toggle${darkTheme ? ' night' : ''}`}>
      <div className='notch'>
        <div className='crater' />
        <div className='crater' />
      </div>
      <div>
        <div className='shape sm' />
        <div className='shape sm' />
        <div className='shape md' />
        <div className='shape lg' />
      </div>
    </div>
  );
}

export default Toggle;
