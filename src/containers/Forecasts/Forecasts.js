import React, { Component } from 'react';
import axios from 'axios';
import Game from '../Game/Game';
import Spinner from '../../components/Spinner/Spinner';

import ball from '../../assets/ball.png';

import styles from './Forecasts.module.css';

class Forecasts extends Component {

    state = {
        data: null
    }

    async componentDidMount() {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com/http://livescore-api.com/api-client/fixtures/matches.json?key=Tk3aVqlzkk4qm9eO&secret=OwUcVM64dtw9GjCzDFKz659qpdRLm5Aa&league=793');
            const data = res.data.data.fixtures;
            console.log(data);

            this.setState({
                data: data
            });

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className={styles.Forecasts}>
                <div className={styles.forecastsWrapper}>
                    <div className={styles.title}>
                        <img src={ball} alt="soccer ball" />
                        <h3>Matchs à venir</h3>
                        <img src={ball} alt="soccer ball" />
                    </div>
                    {this.state.data ? this.state.data.map((game, index) => {
                        return <Game data={game} key={index}/>}) : <Spinner />
                    }
                </div>
            </div>
        );
    }
}

export default Forecasts;