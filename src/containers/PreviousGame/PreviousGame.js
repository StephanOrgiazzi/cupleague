import React, { Component } from 'react';
import styles from './Game.module.css';
import Spinner from '../../components/Spinner/Spinner';

class PreviousGame extends Component {

    render() {

        return (

            <div className={styles.Game}>
                <div className="GameWrapper">
                    {this.props ?
                        <form>
                            <div className={styles.gameWrapper}>
                                <div className={styles.countryA}>
                                    <div className={styles.score}>
                                        <img src={this.props.teams[this.props.forecast.home_team - 1].flag} alt="Flag" />
                                        <input type="text" name="currentScore" placeholder={this.props.forecast.home_team_forecast} className={styles.currentScore} disabled />
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.countryName}>
                                            {this.props.teams[this.props.forecast.home_team - 1].name}
                                        </span>
                                    </div>
                                </div>
                                <span className={styles.dash}>-</span>
                                <div className={styles.countryB}>
                                    <div className={styles.score}>
                                        <input type="text" name="currentScore" placeholder={this.props.forecast.away_team_forecast} className={styles.currentScore} disabled />
                                        <img src={this.props.teams[this.props.forecast.away_team - 1].flag} alt="Flag" />
                                    </div>
                                    <div className={styles.info}>
                                        <span className={styles.countryName}>
                                            {this.props.teams[this.props.forecast.away_team - 1].name}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </form>
                        : <Spinner />}
                </div>
            </div>
        );
    }
}

export default PreviousGame;