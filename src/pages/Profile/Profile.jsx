import React from 'react'
import classes from './Profile.module.css';
import MainButton from '../../components/common/Button/MainButton';
import RouteButton from '../../components/common/Button/RouteButton';
import { faStar, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const iconTasks = faTicket;
    const iconTap = faStar;
    const iconProfile = faUser;

    return (
        <div className={classes.profileWrapper}>
            <div className={classes.content}>
                <div className={classes.userInfo}>
                    <p className={classes.id}>ID 104895</p>
                    <p>кирилл алексевич</p>
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
