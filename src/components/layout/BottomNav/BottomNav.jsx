import React from 'react';
import classes from "./BottomNav.module.css";
import RouteButton from '../../common/Button/RouteButton';
import TapBtn from '../../../assets/images/TapBtn.png';

const BottomNav = () => {
    

    return (
        <nav className={classes.navigation}>
            {/* <RouteButton link = {'/tasks'} text={'TASKS'}/> */}
            <RouteButton link = {'/'} text={'TAP'} src={TapBtn}/>
            {/* <RouteButton link = {'/profile'} text={'PROFILE'}/> */}
        </nav>
    )
}

export default BottomNav
