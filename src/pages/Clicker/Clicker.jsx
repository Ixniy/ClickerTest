import {useState, useRef, useEffect} from 'react';
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

  const [localData, setLocalData] = useState({
    stars: 0,
    energy: 500,
    level: 1
  });

  const [isPressed, setIsPressed] = useState(false);
  const [bursts, setBursts] = useState([]);
  const buttonRef = useRef(null);

  // Инициализация локальных данных
  useEffect(() => {
    if (userData?.data) {
      setLocalData({
        stars: userData.data.stars,
        energy: userData.data.energy,
        level: userData.data.level
      });
    }
  }, [userData.data, userData.data.id]); // Только при смене пользователя

  const handlePressStart = async () => {  
    if (localData.energy <= 0) return;

    const newStars = Number((localData.stars + 0.0004).toFixed(8));
    const newEnergy = localData.energy - 1;
    const shouldLevelUp = newStars >= Math.floor(localData.stars) + 1;
    const newLevel = shouldLevelUp ? localData.level + 1 : localData.level;

    // Мгновенное обновление UI
    setLocalData({
      stars: newStars,
      energy: newEnergy,
      level: newLevel
    });

    setBursts(createStarBursts(buttonRef.current, 4));
    setIsPressed(true);

    try {
      await putData(`/api/users/${user?.id}/`, {
        id: user?.id,
        stars: newStars,
        energy: newEnergy,
        level: newLevel
      });
      
      updateUserData({
        stars: newStars,
        energy: newEnergy,
        level: newLevel
      });
      
    } catch (error) {
      console.error('Sync error:', error);
      setLocalData({
        stars: userData.data.stars,
        energy: userData.data.energy,
        level: userData.data.level
      });
    }
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
            <span className={classes.starsInfo}>{localData.stars.toFixed(4)}</span>
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
                <span className={classes.stamina}>{localData.energy} / 500</span>
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
              <span className={classes.lvl}>lvl {localData.level}</span>
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
