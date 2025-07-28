import {useState, useEffect } from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import useApiData from '../../hooks/useApiData';
import {putData, postData} from '../../services/putFetchData';
import { useTelegram } from '../../hooks/useTelegram';

const Clicker = () => {
  const {user} = useTelegram();
  const userData = useApiData(`/api/users/${user?.id}`);

  const [stars, setStars] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [level, setLevel] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (userData && !isInitialized && userData.data) {
      setEnergy(userData.data.energy);
      setStars(userData.data.stars);
      setIsInitialized(true);
      postData('/api/users/', {
        id: user?.id,
      })
    }
  }, [isInitialized, userData]);


  const handlePressStart = () => {  
    if (energy === 0) return;
    if (Number((stars + 0.2).toFixed(8)) === userData.data.stars + 1) {
      putData('/api/users/12345/', {
        id: user?.id,
        stars: stars,
        energy: energy,
      })
      setLevel(level + 1);
      userData.data.stars += 1;
      userData.data.level += 1;
    }

    setIsPressed(true);
    setStars(Number((stars + 0.2).toFixed(8)));
    setEnergy(prev => prev - 1);
    const pizdecData = () => (setInterval(() => {
      putData(`/api/users/${user?.id}/`, {
        id: `${user?.id}`,
        stars: stars,
        energy: energy,
      })
    }, 1000));
    pizdecData();
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  }



  if (userData?.data) {
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
            >
              <img className={classes.star} src={ClickerStar} alt='clicker star' draggable="false"/>
            </button>
            <div className={classes.staminaWrapper}>
              <img className={classes.light} src={Light} alt='light' draggable="false"/>
              {0 ? (
                <span>Loading...</span>
              ) : (
                <span className={classes.stamina}>{energy} / 500</span>
              )}
            </div>
          </div>
        </div>
        <div className={classes.staminaProgressContainer}>
          <div className={classes.rankContainer}>
            <span className={classes.rank}>{userData && userData.data.rank}</span>
            {0 ? (
              <span>Loading...</span>
            ) : (
              <span className={classes.lvl}>lvl {userData.data.level}</span>
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
