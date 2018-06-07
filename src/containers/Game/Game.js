import React, { Component } from 'react';
import styles from './Game.module.css';
import { connect } from 'react-redux';
import axios from 'axios';


class Game extends Component {

    state = {
        home_team_forecast: null,
        away_team_forecast: null,
    }

    onChangeHomeTeamHandler = (event) => {
        this.setState({
            ...this.state,
            home_team_forecast: event.target.value
        });
    }

    onChangeAwayTeamHandler = (event) => {
        this.setState({
            ...this.state,
            away_team_forecast: event.target.value
        });
    }

    async postForecastsTeams() {
        if (this.state.home_team_forecast && this.state.away_team_forecast) {
            const data = {
                name: this.props.match.name,
                home_team: this.props.match.home_team,
                away_team: this.props.match.away_team,
                home_team_forecast: this.state.home_team_forecast,
                away_team_forecast: this.state.away_team_forecast,
                match_date: this.props.match.date,
                forecast_date: new Date().getTime()
            }
            try {
                const res = await axios.patch(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts/${this.props.match.name}.json?auth=${this.props.token}`, data)
                console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        }
    }


    render() {

        this.postForecastsTeams()

        return (
            <div className={styles.Game}>
                <div className={styles.countryA}>
                    <div className={styles.score}>
                        <img src={this.props.teams[(this.props.match.home_team) - 1].flag} alt="Flag" />
                        <select className={styles.currentScore} onChange={this.onChangeHomeTeamHandler}>
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
                            {this.props.teams[(this.props.match.home_team) - 1].name}
                        </span>
                        <span className={styles.date}>
                            {this.props.match.date.slice(0, -15)}
                        </span>
                    </div>
                </div>
                <span className={styles.dash}>-</span>
                <div className={styles.countryB}>
                    <div className={styles.score}>
                        <select className={styles.currentScore} onChange={this.onChangeAwayTeamHandler}>
                            <option value="null">..</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <img src={this.props.teams[(this.props.match.away_team) - 1].flag} alt="Flag" />
                    </div>
                    <div className={styles.info}>
                        <span className={styles.countryName}>
                            {this.props.teams[(this.props.match.away_team) - 1].name}
                        </span>
                        <span className={styles.groupPlace}>
                            {this.props.stadiums[(this.props.match.stadium) - 1].city}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth_reducer.userId,
        token:state.auth_reducer.token
    }
}

export default connect(mapStateToProps, null)(Game);