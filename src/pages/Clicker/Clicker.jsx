import React from 'react';
import classes from './Clicker.module.css';
import wrappers from "../PagesStyles.module.css";
import BottomNav from '../../components/layout/BottomNav/BottomNav';

const Clicker = () => {
  return (
    <div className={wrappers.Wrapper}>
      <div className={classes.header}>
        <i></i>
        <span>2 lvl</span>
      </div>
      <div className={wrappers.content}>
        <div className={classes.actionCount}>
          <i></i>
          <span> 2005</span>
        </div>
        <div className={classes.actionTap}>
          <button>
            <i></i>
          </button>
        </div>
        <div className={classes.actionStamina}>
          <i></i>
          <span>100/100</span>
          <progress 
            value={100}
            max={100}
            className={classes.staminaBar}
          />
        </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Clicker
