import React from 'react';
import classes from './MainButton.module.css';

const MainButton = ({children}) => {
  return (
    <button className={classes.button}>
        {children}
    </button>
  )
}

export default MainButton
