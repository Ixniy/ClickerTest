import React from 'react';
import classes from "./BottomNav.module.css";
import RouteButton from '../../common/Button/RouteButton';


const BottomNav = () => {
    

    return (
        <nav className={classes.navigation}>
            <RouteButton link = {'/tasks'} text={'TASKS'}/>
            <RouteButton link = {'/'} text={'TAP'}/>
            <RouteButton link = {'/profile'} text={'PROFILE'}/>
        </nav>
    )
}

export default BottomNav
