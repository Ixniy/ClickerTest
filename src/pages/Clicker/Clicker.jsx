import {useState, useRef, useEffect} from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import {putData} from '../../services/putFetchData';
import { useTelegram } from '../../hooks/useTelegram';
import useApiData from '../../hooks/useApiData';


const Clicker = () => {
  const { user, onClose, tg } = useTelegram();
  const {userData, loading, error, updateUserData} = useApiData(user);

  const [localData, setLocalData] = useState(null);

  const [isPressed, setIsPressed] = useState(false);

  const lastSyncedData = useRef(localData);
  const [isSyncing, setIsSyncing] = useState(false);

  const handlePressStart = () => {
    if (localData.energy <= 0) return;
    console.log('Клик! Текущие данные:', {
      localData,
      lastSynced: lastSyncedData.current
    });

    setIsPressed(true);

    setLocalData(prev => {
      const newStars = Number((prev.stars + 0.0004).toFixed(8));
      const newEnergy = prev.energy - 1;
      const newLevel = newStars >= Math.floor(prev.stars) + 1 ? prev.level + 1 : prev.level;
      console.log(newStars, newEnergy, newLevel)
      
      return { stars: newStars, energy: newEnergy, level: newLevel };
    });

  };

  const handlePressEnd = () => {
    setIsPressed(false);
  }

  useEffect(() => {
    if (userData?.data && !lastSyncedData.current) {
      setLocalData({
        stars: userData?.data?.stars || 0,
        energy: userData?.data?.energy || 500,
        level: userData?.data?.level || 1
      });
      lastSyncedData.current = {stars: userData.data.stars, energy: userData.data.energy, level: userData.data.level};
    }
  }, [userData?.data]);

  useEffect(() => {
    const syncInterval = setInterval(async () => {
      if (
        !isSyncing &&
        localData &&
        lastSyncedData.current &&
        (
          lastSyncedData.current.stars !== localData.stars ||
          lastSyncedData.current.energy !== localData.energy ||
          lastSyncedData.current.level !== localData.level
        )
      ) {
        console.log('Conditions in syncInterval are good');
        setIsSyncing(true);
        try {
          console.log('Try request accepted');
          await putData(`/api/users/${user?.id}/`, {
            id: user?.id,
            ...localData,
          });
          lastSyncedData.current = {...localData}
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setIsSyncing(false);
        }
      }
    }, 4000); 

    return () => clearInterval(syncInterval);

  }, [localData, isSyncing, user?.id, updateUserData]);


  useEffect(() => {
    const handleClose = () => {
      if (lastSyncedData.current) {
        console.log(123123);
        putData(`/api/users/${user?.id}/`, lastSyncedData.current)
          .then(() => console.log("Успешно!"))
          .catch((err) => console.err('Ошибочка!', err));
      }
    };
    
    tg.onClose(handleClose);
    return () => {
      tg.onClose(null);
    };

  }, [user?.id, tg, onClose])


  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;
  if (!userData) return <div>Пользователь не найден</div>;


  if (userData?.data && localData) {
    return (
    <div className= {classes.clickerBackground}>
      <div className={classes.content}>
        <div className={classes.topSection}>
          <div className={classes.actionCount}>
            <img className={classes.starInfo} src={ClickerStar} alt='count star' draggable="false"/>
            <span className={classes.starsInfo}>{localData?.stars.toFixed(4)}</span>
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
                <span className={classes.stamina}>{localData?.energy} / 500</span>
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
              <span className={classes.lvl}>lvl {localData?.level}</span>
            )}
          </div>
          <progress value={localData.energy} max={500} className={classes.staminaBar} />
        </div>
      </div>
      <BottomNav />
    </div>
  )
  }
}

export default Clicker
