import {useState, useRef} from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import {putData} from '../../services/putFetchData';
import { useTelegram } from '../../hooks/useTelegram';
import {createStarBursts} from '../../utils/starEffect';
import useApiData from '../../hooks/useApiData';


const Clicker = () => {
  const { user } = useTelegram();
  const {userData, loading, error, updateUserData} = useApiData(user);

  const [stars, setStars] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [bursts, setBursts] = useState([]);
  const buttonRef = useRef(null);

  const handlePressStart = () => {  
    if (energy === 0) return;

    setBursts(createStarBursts(buttonRef.current, 4));

    const newStars = Number((stars + 0.0004).toFixed(8));
    const newEnergy = energy - 1;
    setEnergy(newEnergy);

    const shouldLevelUp = newStars >= Math.floor(userData.data.stars) + 1;
    if (shouldLevelUp) {
      const newLevel = level + 1;
      putData(`/api/users/${user?.id}/`, {
        id: user?.id,
        stars: newStars,
        level: newLevel,
      })
      setLevel(newLevel);

      updateUserData({
        stars: newStars,
        level: newLevel,
      })
    }

    setIsPressed(true);
    setStars(newStars);

    const intervalid = () => setInterval(() => {
      putData(`/api/users/${user?.id}/`, {
        id: user?.id,
        stars: newStars,
        energy: newEnergy,
        level: level,
      });
    }, 2000);
    intervalid();
    return () => clearInterval(intervalid);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
  }

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!userData) return <div>Пользователь не найден</div>;


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
              <button ref={buttonRef} className={`${classes.actionBtn} ${isPressed ? classes.pressed : ''}`} 
                onTouchStart={handlePressStart}
                onTouchEnd={handlePressEnd}
              >
              <img className={classes.star} src={ClickerStar} alt='clicker star' draggable="false"/>
            </button>

            {bursts.map((burst) => (
              <div 
                key={burst.id}
                className={classes.starBurst}
                style={{
                  left: `${burst.x}px`,
                  top: `${burst.y}px`,
                  '--tx': `${burst.tx}px`,
                  '--ty': `${burst.ty}px`
                }}
              />
            ))}

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
