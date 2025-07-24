import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './RouteButton.module.css';

const RouteButton = ({text, icon}) => {
    const iconName = icon;

    return (
        <button className={classes.routeBtn}>
            {iconName && <FontAwesomeIcon icon={iconName} className={classes.icon}/>}
            <p className={classes.text}>{text}</p>
        </button>
    )
}

export default RouteButton
