import React from 'react'
import classes from './Profile.module.css';
import MainButton from '../../components/common/Button/MainButton';
import RouteButton from '../../components/common/Button/RouteButton';
import { faStar, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import { useTelegram } from '../../hooks/useTelegram';

const Profile = () => {
    const {user} = useTelegram();
    const iconTasks = faTicket;
    const iconTap = faStar;
    const iconProfile = faUser;

    return (
        <div className={classes.profileWrapper}>
            <div className={classes.content}>
                <div className={classes.userInfo}>
                    <p className={classes.id}>{user?.username}</p>
                    <p>{    user?.username}</p>
                    <p className={classes.mt}>баланс: 40000</p>
                </div>
                <div className={classes.btnOptions}>
                    <MainButton children={'Пригласи друга'} />
                    <MainButton children={'Твой ранг'} />
                    <MainButton children={'Рейтинг'} />
                </div>
            </div>
            <div className={classes.navigation}>
                <RouteButton icon = {iconTasks} text={'TASKS'}/>
                <RouteButton icon = {iconTap} text={'TAP'}/>
                <RouteButton icon = {iconProfile} text={'PROFILE'}/>
            </div>
        </div>
    )
}

export default Profile
