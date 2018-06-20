import React, { Component } from 'react';
import styles from './MyBets.module.css';
import Spinner from '../../components/Spinner/Spinner';
import PreviousGame from '../PreviousGame/PreviousGame';
import ball from '../../assets/ball.png';

class MyBets extends Component {

    render() {

        return (
            <div className={styles.MyBets}>
                <div className={styles.titleWrapper}>
                    <img src={ball} alt="soccer ball" />
                    <h3>Historique</h3>
                    <img src={ball} alt="soccer ball" />
                </div>
                {this.props.matches && this.props.teams && this.props.forecasts ? this.props.forecasts.map((forecast, index) => {
                    if (forecast && this.props.matches[index] && this.props.matches[index].finished) {
                        return <PreviousGame matches={this.props.matches} teams={this.props.teams} forecast={forecast} key={index} />;
                    } else return null;
                }) : <Spinner />
                }
            </div>
        );
    }
}

export default MyBets;