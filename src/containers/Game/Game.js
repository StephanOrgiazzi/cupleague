import React, { Component } from 'react';
import styles from './Game.module.css';

class Game extends Component {

    state = {
        team1: 'null',
        team2: null,
    }

    onChangeTeam1Handler = (event) => {
        this.setState({
            ...this.state,
            team1: event.target.value
        }, console.log('team1:', this.state.team1));
    }

    onChangeTeam2Handler = (event) => {
        this.setState({
            ...this.state,
            team2: event.target.value
        }, console.log('team2:', this.state.team2));
    }

    render() {
        return (
            <div className={styles.Game}>
                <div className={styles.countryA}>
                    <div className={styles.score}>
                        <img src={require(`../../assets/FLAGS/${this.props.data.home_name.replace(/\s/g, '').toUpperCase()}.png`)} alt="Flag" />
                        <select className={styles.currentScore} onChange={this.onChangeTeam1Handler}>
                            <option value="null">..</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.countryName}>
                            {this.props.data.home_name}
                        </span>
                        <span className={styles.date}>
                        {this.props.data.date}, {this.props.data.time.slice(0, -3)}
                        </span>
                    </div>
                </div>
                <span className={styles.dash}>-</span>
                <div className={styles.countryB}>
                    <div className={styles.score}>
                        <select className={styles.currentScore} onChange={this.onChangeTeam2Handler}>
                            <option value="null">..</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <img src={require(`../../assets/FLAGS/${this.props.data.away_name.replace(/\s/g, '').toUpperCase()}.png`)} alt="Flag" />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.countryName}>
                        {this.props.data.away_name}
                    </span>
                        <span className={styles.groupPlace}>
                        {(this.props.data.location).split(', ')[1]}
                    </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;