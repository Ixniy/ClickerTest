import React from 'react';
import classes from './Profile.module.css';
import MainButton from '../../components/common/Button/MainButton';
import { useTelegram } from '../../hooks/useTelegram';
import BottomNav from "../../components/layout/BottomNav/BottomNav";

const Profile = () => {
    const {user} = useTelegram();

    return (
        <div className={classes.Wrapper}>
            <div className={classes.content}>
                <div className={classes.userInfo}>
                    <p className={classes.id}>ID {user?.id}</p>
                    <p className={classes.username}>{user?.username}</p>
                    <p className={classes.mt}>баланс: 40000</p>
                </div>
                <div className={classes.btnOptions}>
                    <MainButton children={'Пригласи друга'} />
                    <MainButton children={'Твой ранг'} />
                    <MainButton children={'Рейтинг'} />
                </div>
            </div>
            <BottomNav />
        </div>
    )
}

export default Profile
