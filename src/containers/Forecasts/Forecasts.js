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
                    <p>Vous pouvez modifier vos pronostics à tout moment jusqu'à 1h avant le début de chaque match.</p>
                    {this.props.matches && this.props.teams && this.props.stadiums ? this.props.matches.map((game, index) => {
                        return <Game match={this.props.matches[index]} teams={this.props.teams} stadiums={this.props.stadiums} key={index} />}) : <Spinner />
                    }
                </div>
            </div>
        );
    }
}

export default Forecasts;