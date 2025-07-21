import React from 'react';
import classes from './Header.module.css'
import Button from '../Button/Button';
import { useTelegram } from '../hooks/useTelegram';

const Header = () => {
    const {onClose} = useTelegram();

    return (
        <div className={classes.header}>
            <Button onClick = {onClose}>Закрыть</Button>
            {/* <span className={'username'}>
                {user.user?.username}
            </span> */}
        </div>
    )
}

export default Header
