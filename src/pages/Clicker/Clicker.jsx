import {useState, useRef, useEffect} from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import {putData} from '../../services/putFetchData';
import { useTelegram } from '../../hooks/useTelegram';
import useApiData from '../../hooks/useApiData';
// import API_URL from '../../hooks/useApiData';

const Clicker = () => {
  const { user, } = useTelegram();
  const {userData, loading, error, updateUserData} = useApiData(user);

  const [localData, setLocalData] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const [particles, setParticles] = useState([]);

  const lastSyncedData = useRef(localData);
  const [isSyncing, setIsSyncing] = useState(false);


  const handlePressStart = () => {
    if (localData.energy <= 0) return;

    const newParticles = Array(5).fill().map(() => ({
      id: Math.random().toString(36).substring(2, 9),
      x: Math.random() * 250 - 150, 
      y: Math.random() * 250 - 150, 
      size: Math.random() * 20 + 5,
      createdAt: Date.now(),
    }));
    setParticles(prev => [...prev, ...newParticles]);

    setTimeout(() => setParticles([]), 1000);


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
      console.log(123)
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
    }, 2000);
    syncInterval();

    return () => clearInterval(syncInterval);

  }, [localData, isSyncing, user?.id, updateUserData]);

  // useEffect(() => {    
  //   const forceSyncOnExit = () => {
  //   if (!lastSyncedData.current) return;
    
  //   const data = JSON.stringify({
  //     id: user?.id,
  //     ...lastSyncedData.current,
  //   });

  //   if (navigator.sendBeacon) {
  //     navigator.sendBeacon(`${API_URL}/api/users/${user.id}/`, data);
  //     console.log("Данные отправлены через sendBeacon");
  //   } 
  // };
  //   window.addEventListener('beforeunload', forceSyncOnExit);
  //   window.addEventListener('pagehide', forceSyncOnExit);    
  //   window.addEventListener('unload', forceSyncOnExit);
  // }, [user.id, tg, onClose])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => 
        prev.filter(p => Date.now() - p.createdAt < 1000) 
      );
    }, 300); 

  return () => clearInterval(interval); 
  });


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
              {particles.map(particle => (
                <div 
                  key={particle.id}
                  className={classes.starParticle}
                  style={{
                    left: `calc(50% + ${particle.x}px)`,
                    top: `calc(50% + ${particle.y}px)`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                  }}
                >
                  <img src={ClickerStar} alt="star" />
                </div>
              ))}
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
          <progress value={localData.stars} max={localData.stars + 1} className={classes.staminaBar} />
        </div>
      </div>
      <BottomNav />
    </div>
  )
  }
}

export default Clicker
