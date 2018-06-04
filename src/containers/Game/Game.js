import React, { Component } from 'react';
import styles from './Game.module.css';

import SA from '../../assets/FLAGS/SA.png';
import RU from '../../assets/FLAGS/RU.png';

class Game extends Component {
    render() {
        return (
            <div className={styles.Game}>
                <div className={styles.countryA}>
                    <div className={styles.score}>
                        <img src={RU} alt="Flag" />
                        <span className={styles.currentScore}>
                            ...
                        </span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.countryName}>
                            Russie
                        </span>
                        <span className={styles.date}>
                            Le 14 juin à 17h00
                        </span>
                    </div>
                </div>
                <span className={styles.dash}>-</span>
                <div className={styles.countryB}>
                    <div className={styles.score}>
                        <span className={styles.currentScore}>
                            ...
                        </span>
                        <img src={SA} alt="Flag" />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.countryName}>
                            Arabie S.
                    </span>
                        <span className={styles.groupPlace}>
                            Groupe A - Moscou
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;