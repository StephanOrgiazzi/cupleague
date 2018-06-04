import React, { Component } from 'react';
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import Game from '../Game/Game';

class Home extends Component {
    render() {
        return (
            <div className={styles.Home}>
                <div className={styles.homeWrapper}>
                    <div className={styles.buttonsWrapper}>
                        <Link to="/forecasts"><button>Mes pronostics</button></Link>
                        <Link to="/rank"><button>Mon classement</button></Link>
                    </div>
                    <h3>Prochain match</h3>
                    <Game />
                    <p>Vous pouvez modifier vos pronostics jusqu'à 24h avant chaque match.</p>
                </div>
            </div>
        );
    }
}

export default Home;