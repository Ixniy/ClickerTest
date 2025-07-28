import {useState, useEffect } from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import { useApiData } from '../../hooks/useApiData';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {
  const {user} = useTelegram();
  console.log(user.id);
  const data = useApiData(`/api/users/${user?.id}`);
  let dataDict;
  if (data) {
    dataDict = data.data[0];
  }
  const isLoading = !data;
  
  const [energy, setEnergy] = useState(0);  
  const [clickedStars, setClickedStars] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [level, setLevel] = useState(0);

  const [initialized, setInitialized] = useState(false);


  useEffect(() => {
    if (data && !initialized) {
      setEnergy(dataDict.energy);
      setClickedStars(dataDict.stars);
      setLevel(dataDict.level);
      setInitialized(true);
    }
  }, [data, initialized, dataDict])


  const handlePressStart = () => {
    if (isLoading || energy === 0) return;
    if (Number((clickedStars + 0.0004).toFixed(8)) === dataDict.stars + 1) {
      setLevel(level + 1);
      dataDict.stars += 1;
    }

    setIsPressed(true);
    setClickedStars(Number((clickedStars + 0.0004).toFixed(8)));
    setEnergy(prev => prev - 1);
  }

  const handlePressEnd = () => {
    setIsPressed(false);
  }

  
  if (dataDict) {
    return (
    <div className= {classes.clickerBackground}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <div className={classes.actionCount}>
            <img className={classes.starInfo} src={ClickerStar} alt='count star' draggable="false"/>
            <span className={classes.starsInfo}>{clickedStars}</span>
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
                <span className={classes.stamina}>{energy} / {dataDict.energy}</span>
              )}
            </div>
          </div>
        </div>
        <div className={classes.staminaProgressContainer}>
          <div className={classes.rankContainer}>
            <span className={classes.rank}>{dataDict && dataDict.rank}</span>
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <span className={classes.lvl}>lvl {level}</span>
            )}
          </div>
          <progress value={600} max={600} className={classes.staminaBar} />
        </div>
      </div>
      <BottomNav />
    </div>
  )
  }


}

export default Clicker
