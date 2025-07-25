import React from 'react';
import { faStar, faTicket, faUser } from '@fortawesome/free-solid-svg-icons';
import classes from "./BottomNav.module.css";
import RouteButton from '../../common/Button/RouteButton';


const BottomNav = () => {
    const iconTasks = faTicket;
    const iconTap = faStar;
    const iconProfile = faUser;
    
    return (
        <nav className={classes.navigation}>
            <RouteButton icon = {iconTasks} link = {'/tasks'} text={'TASKS'}/>
            <RouteButton icon = {iconTap} link = {'/'} text={'TAP'}/>
            <RouteButton icon = {iconProfile} link = {'/profile'} text={'PROFILE'}/>
        </nav>
    )
}

export default BottomNav
