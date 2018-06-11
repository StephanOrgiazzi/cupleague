import React, { Component } from 'react';
import styles from './Game.module.css';
import { connect } from 'react-redux';
import axios from 'axios';


class Game extends Component {

    state = {
        home_team_forecast: null,
        away_team_forecast: null,
    }

    async componentDidMount() {

        try {
            const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts.json?auth=${this.props.token}`);
            const data = res.data;
            this.setState({
                data: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    onChangeHomeTeamHandler = (event) => {
        const reg = /^\d+$/;
        let regTest = reg.test(event.target.value);
        if (regTest) {
            this.setState({
                ...this.state,
                home_team_forecast: event.target.value
            }, this.postHomeTeam);
        }
    }

    onChangeAwayTeamHandler = (event) => {
        const reg = /^\d+$/;
        let regTest = reg.test(event.target.value);
        if (regTest) {
            this.setState({
                ...this.state,
                away_team_forecast: event.target.value
            }, this.postAwayTeam);
        }
    }

    async postHomeTeam() {
        if (this.state.home_team_forecast) {
            const data = {
                name: this.props.match.name,
                home_team: this.props.match.home_team,
                home_team_forecast: this.state.home_team_forecast,
                match_date: this.props.match.date,
                forecast_date: new Date().getTime()
            }
            try {
                this.preventClick();
                await axios.patch(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts/${this.props.match.name}.json?auth=${this.props.token}`, data);
                this.authorizeClick();
            } catch (err) {
                console.log(err);
                this.authorizeClick();
            }
        }
    }

    async postAwayTeam() {
        if (this.state.away_team_forecast) {
            const data = {
                name: this.props.match.name,
                home_team: this.props.match.home_team,
                away_team_forecast: this.state.away_team_forecast,
                match_date: this.props.match.date,
                forecast_date: new Date().getTime()
            }
            try {
                this.preventClick();
                await axios.patch(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts/${this.props.match.name}.json?auth=${this.props.token}`, data);
                this.authorizeClick();
            } catch (err) {
                console.log(err);
                this.authorizeClick();

            }
        }
    }

    click = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    preventClick = (e) => {
        document.body.addEventListener("click", this.click);
    };

    authorizeClick = (e) => {
        document.body.removeEventListener("click", this.click);
    };


    render() {

        // Set forecasts
        const matchName = this.props.match.name;
        let homeTeamPlaceholder = '...';
        let awayTeamPlaceholder = '...';
        if (this.state.data && this.state.data.hasOwnProperty(matchName)) {
            homeTeamPlaceholder = this.state.data[matchName].home_team_forecast;
            awayTeamPlaceholder = this.state.data[matchName].away_team_forecast;
        }

        return (

            <div className={styles.Game}>
                <div className={styles.countryA}>
                    <div className={styles.score}>
                        <img src={this.props.teams[(this.props.match.home_team) - 1].flag} alt="Flag" />
                        <input type="text" name="currentScore" placeholder={homeTeamPlaceholder} className={styles.currentScore} onChange={this.onChangeHomeTeamHandler} pattern="[0-9]+" title="numbers only" />
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
                        <input type="text" name="currentScore" placeholder={awayTeamPlaceholder} className={styles.currentScore} onChange={this.onChangeAwayTeamHandler} pattern="[0-9]+" title="number only" />
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
        token: state.auth_reducer.token
    }
}

export default connect(mapStateToProps, null)(Game);