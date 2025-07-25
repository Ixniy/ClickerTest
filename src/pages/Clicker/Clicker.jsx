import React from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';

const Clicker = () => {
  return (
    <div className= {classes.clickerBackground}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <div className={classes.actionCount}>
            <img className={classes.starInfo} src={ClickerStar} alt='count star'/>
            <span className={classes.starsInfo}>2,005</span>
          </div>
        </div>

        <div className={classes.centerSection}>
          <div className={classes.actionTap}>
            <button className={classes.actionBtn}>
              <img className={classes.star} src={ClickerStar} alt='clicker star'/>
            </button>
            <div className={classes.staminaWrapper}>
              <img className={classes.light} src={Light} alt='light'/>
              <span className={classes.stamina}>2000 / 2000</span>
            </div>
          </div>
        </div>
        <div className={classes.staminaProgressContainer}>
            <div className={classes.progressBar}>
              <progress value={100} max={100} className={classes.staminaBar} />
            </div>
          </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Clicker
