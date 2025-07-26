import {useState, useEffect } from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import { useApiData } from '../../hooks/useApiData';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
// import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {
  const data = useApiData('/api/levels/');
  const [energy, setEnergy] = useState(0);  
  const [stars, setStars] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const isLoading = !data;

  const handlePressStart = () => {
    if (isLoading) return;
    setIsPressed(true);
    setStars(stars + data.data[0].click_power);
  }

  const handlePressEnd = () => {
    setIsPressed(false);
  }

  return (
    <div className= {classes.clickerBackground}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <div className={classes.actionCount}>
            <img className={classes.starInfo} src={ClickerStar} alt='count star' draggable="false"/>
            <span className={classes.starsInfo}>{stars}</span>
          </div>
        </div>

        <div className={classes.centerSection}>
          <div className={classes.actionTap}>
              <button className={`${classes.actionBtn} ${isPressed ? classes.pressed : ''}`} 
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onClick={handlePressStart}
              disabled={isLoading}
            >
              <img className={classes.star} src={ClickerStar} alt='clicker star' draggable="false"/>
            </button>
            <div className={classes.staminaWrapper}>
              <img className={classes.light} src={Light} alt='light' draggable="false"/>
              {isLoading ? (
                <span>Loading...</span>
              ) : (
                <span className={classes.stamina}>{energy} / {data.data[0].click_capacity}</span>
              )}
            </div>
          </div>
        </div>
        <div className={classes.staminaProgressContainer}>
          <div className={classes.rankContainer}>
            <span className={classes.rank}>bronze 1</span>
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span className={classes.lvl}>lvl {data.data[0].level}</span>
            )}
          </div>
          <progress value={600} max={600} className={classes.staminaBar} />
          </div>
      </div>
      <BottomNav />
    </div>
  )
}

export default Clicker
