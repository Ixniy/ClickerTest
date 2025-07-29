import {useState, useEffect} from 'react';
import classes from './Clicker.module.css';
import BottomNav from '../../components/layout/BottomNav/BottomNav';
import ClickerStar from '../../assets/images/ClickerStar.png';
import Light from '../../assets/images/Light.png';
import {putData} from '../../services/putFetchData';
import { useTelegram } from '../../hooks/useTelegram';
import axios from 'axios';


const Clicker = () => {
  const { user } = useTelegram(); // Предполагаем, что хук useTelegram существует
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [stars, setStars] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [level, setLevel] = useState(1);
  const [isPressed, setIsPressed] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://humble-spoon-qgwq79jv94qh4w4q-80.app.github.dev/api/users/${user?.id}/`
        );
        
        // Проверяем структуру ответа
        if (response.data) {
          setUserData(response.data);
          console.log('Данные пользователя:', response.data);
        } else {
          // Если пользователь не найден, создаем нового
          await createUser();
        }
      } catch (error) {
        if (error.response?.status === 404) {
          // Пользователь не найден - создаем
          await createUser();
        } else {
          setError(error);
          console.error('Ошибка запроса:', error);
        }
      } finally {
        setLoading(false);
      }
    };

    const createUser = async () => {
      try {
        const response = await axios.post(
          'https://humble-spoon-qgwq79jv94qh4w4q-80.app.github.dev/api/users/',
          {
            id: user?.id,
            username: user?.username,
            // Другие обязательные поля
          }
        );
        setUserData(response.data);
      } catch (createError) {
        setError(createError);
        console.error('Ошибка создания пользователя:', createError);
      }
    };

    if (user?.id) {
      fetchUser();
    }
  }, [user?.id, user?.username]); // Зависимость от ID пользователя


  useEffect(() => {
    if (userData && !isInitialized) {
      setEnergy(userData.data.energy);
      setStars(userData.data.stars);
      console.log(userData.status);
      setIsInitialized(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, user?.id, userData]);


  const handlePressStart = () => {  
    if (energy === 0) return;

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

      setUserData(prev => ({
        ...prev,
        data: {
          ...prev.data,
          stars: newStars,
          level: newLevel
        }
      }));
    }

    setIsPressed(true);
    setStars(newStars);

    const intervalid = () => setInterval(() => {
      putData(`/api/users/${user?.id}/`, {
        id: user?.id,
        stars: newStars,
        energy: newEnergy,
      });
    }, 2000);
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
              <button className={`${classes.actionBtn} ${isPressed ? classes.pressed : ''}`} 
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
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
