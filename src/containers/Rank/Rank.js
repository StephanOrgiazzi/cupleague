import React, { Component } from 'react';
import styles from './Rank.module.css';

import trophies from '../../assets/treetrophies.png';

class Home extends Component {

    render() {

        return (
            <div className={styles.Rank}>
                <div className={styles.rankWrapper}>
                    <div className={styles.title}>
                        <img src={trophies} alt="trophies" />
                        <h3>Classement Alten</h3>
                        <img src={trophies} alt="trophies" />
                    </div>
                    <div className={styles.podium}>
                        <div className={styles.silver}>
                            <span>Michelle</span>
                            <div className={styles.step}>
                                31
                        </div>
                            2ème
                        </div>
                        <div className={styles.gold}>
                            <span>Fabrice</span>
                            <div className={styles.step}>
                                32
                        </div>
                            1er
                        </div>
                        <div className={styles.bronze}>
                            <span>Daniel</span>
                            <div className={styles.step}>
                                27
                            </div>
                            3ème
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Points</th>
                                <th>Rang</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Marine</td>
                                <td>22</td>
                                <td>4ème</td>
                            </tr>
                            <tr>
                                <td>Tom</td>
                                <td>21</td>
                                <td>5ème</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Home;