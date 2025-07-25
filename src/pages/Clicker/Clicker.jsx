import React from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
// import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {

  const handleTap = (e) => {
    e.preventDefault();
  }

  return (
    <div className= {classes.clickerBackground}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <div className={classes.actionCount}>
            <img className={classes.starInfo} src={ClickerStar} alt='count star' draggable="false"/>
            <span className={classes.starsInfo}>2,005</span>
          </div>
        </div>

        <div className={classes.centerSection}>
          <div className={classes.actionTap}>
            <button className={classes.actionBtn} onClick={handleTap}>
              <img className={classes.star} src={ClickerStar} alt='clicker star' draggable="false"/>
            </button>
            <div className={classes.staminaWrapper}>
              <img className={classes.light} src={Light} alt='light' draggable="false"/>
              <span className={classes.stamina}>2000 / 2000</span>
            </div>
          </div>
        </div>
        <div className={classes.staminaProgressContainer}>
          <div className={classes.rankContainer}>
            <span className={classes.rank}>bronze 1</span>
            <span className={classes.lvl}>lvl 1</span>
          </div>
          <progress value={600} max={600} className={classes.staminaBar} />
          </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Clicker
