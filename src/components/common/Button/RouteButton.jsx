import React from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './RouteButton.module.css';

const RouteButton = ({text, link, src}) => {
    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(`${link}`)} className={classes.routeBtn}>
            <img className={classes.image} src={src} alt='button pic'/>
            <p className={classes.text}>{text}</p>
        </button>
    )
}

export default RouteButton
