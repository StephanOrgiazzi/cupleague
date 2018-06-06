import React, { Component } from 'react';
import Game from '../Game/Game';
import Spinner from '../../components/Spinner/Spinner';

import ball from '../../assets/ball.png';

import styles from './Forecasts.module.css';

class Forecasts extends Component {


    render() {
        return (
            <div className={styles.Forecasts}>
                <div className={styles.forecastsWrapper}>
                    <div className={styles.title}>
                        <img src={ball} alt="soccer ball" />
                        <h3>Matchs à venir</h3>
                        <img src={ball} alt="soccer ball" />
                    </div>
                    {this.props.data ? this.props.data.map((game, index) => {
                        return <Game data={game} key={index}/>}) : <Spinner />
                    }
                </div>
            </div>
        );
    }
}

export default Forecasts;