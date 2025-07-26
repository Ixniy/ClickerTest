import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './RouteButton.module.css';

const RouteButton = ({text, link}) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`${link}`)} className={classes.routeBtn}>
            <p className={classes.text}>{text}</p>
        </button>
    )
}

export default RouteButton
