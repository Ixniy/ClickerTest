import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './RouteButton.module.css';

const RouteButton = ({text, icon, link}) => {
    const navigate = useNavigate();
    const iconName = icon;

    return (
        <button onClick={() => navigate(`${link}`)} className={classes.routeBtn}>
            {iconName && <FontAwesomeIcon icon={iconName} className={classes.icon}/>}
            <p className={classes.text}>{text}</p>
        </button>
    )
}

export default RouteButton
