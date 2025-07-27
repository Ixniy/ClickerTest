import {useState, useEffect } from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import { useApiData } from '../../hooks/useApiData';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
// import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {
  const data = useApiData('/api/levels/');
  const dataDict = data.data[0];

  const [energy, setEnergy] = useState(0);  
  const [stars, setStars] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const isLoading = !data;
  if (!isLoading) {
    console.log(data.data);
  }

  const handlePressStart = () => {
    if (isLoading || energy === 0) return;
    setIsPressed(true);
    setStars(stars + dataDict.click_power);
    setEnergy(energy - 1);
  }

  const handlePressEnd = () => {
    setIsPressed(false);
  }

  useEffect(() => {
    if (isLoading || stars > dataDict.click_capacity || !(energy < dataDict.click_capacity)) return;
    if (energy + dataDict.click_regeneration > dataDict.click_capacity) {
      setEnergy((prev) => prev + dataDict.click_regeneration - 1);
    }
    const intervalid = setInterval(() => {
      setEnergy((prev) => prev + dataDict.click_regeneration);
    }, 1000)
    return () => {
      clearInterval(intervalid);
    }
  }, [stars, isLoading, dataDict, energy])

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
                <span className={classes.stamina}>{energy} / {dataDict.click_capacity}</span>
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
              <span className={classes.lvl}>lvl {dataDict.level}</span>
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
