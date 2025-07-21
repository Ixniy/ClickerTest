import React, { useState, useEffect}from 'react'
import Button from '@mui/material/Button';
import { Telegram } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';
import { useTelegram } from './hooks/useTelegram';

const ClickerGame = () => {
    const {tg} = useTelegram();
    const [coins, setCoins] = useState(0);
    const [clicksLeft, setClicksLeft] = useState(10);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (window.Telegram?.WebApp?.initData) {
            const user = tg.initDataUnsafe?.user;
            console.log("User", user);
        }
    }, []);

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
        <Button
            variant='contained'
            onClick={handleClick}
            disabled={isLoading || clicksLeft <= 0}
            startIcon={isLoading ? <CircularProgress size={20} /> : <Telegram />}
        >
            {isLoading ? "Загрузка..." : 'КЛИКНИ МЕНЯ'}
        </Button>
    </div>
  )
}

export default ClickerGame
