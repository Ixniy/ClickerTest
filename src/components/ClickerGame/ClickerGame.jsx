import React, { useState, useEffect}from 'react'
import Button from '@mui/material/Button';
import { Telegram } from '@mui/icons-material';
import { useTelegram } from '../hooks/useTelegram';

const ClickerGame = () => {
    const {tg} = useTelegram();
    const [coins, setCoins] = useState(0);
    const [clicksLeft, setClicksLeft] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [info, setInfo] = useState(null);

    // useEffect(() => {
    //     if (tg?.initData) {
    //         const user = tg.initDataUnsafe.user;
    //         console.log("User", user);
    //     }
    // }, [tg.initData, tg.initDataUnsafe.user]);

    const handleClick = async () => {
        if (clicksLeft <= 0) return;

        setClicksLeft(clicksLeft - 1);
        setCoins(coins + 1);

        if (window.Telegram?.WebApp?.sendData) {
            setIsLoading(true);
            tg.sendData(JSON.stringify({type: 'click', coins: 1}));
            setIsLoading(false);
        }
    }

    const getApi = async () => {
        const response = await fetch('https://animated-doodle-9vqwrjjv46rfpwqp-80.app.github.dev/api/users/');
        const data = await response.json();
        setInfo(data);
    }

    useEffect(() => {
        getApi();
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            if (clicksLeft < 10) setClicksLeft(clicksLeft + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [clicksLeft]);

  return (
    <div>
        <h1>Hamster Clicker</h1>
        <p>Монеты: {coins}</p>
        <p>Кликов осталось: {clicksLeft}/10</p>
        <p>{info}</p>
        <Button
            variant='contained'
            onClick={handleClick}
            disabled={isLoading || clicksLeft <= 0}
            startIcon={<Telegram />}
        >
            {isLoading ? "Загрузка..." : 'КЛИКНИ МЕНЯ'}
        </Button>
        
    </div>
  )
}

export default ClickerGame
