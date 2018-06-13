import React, { Component } from 'react';
import styles from './Game.module.css';
import { connect } from 'react-redux';
import axios from 'axios';


class Game extends Component {

    state = {
        home_team_forecast: null,
        away_team_forecast: null,
        validated: false,
    }

    componentDidMount() {
        // console.log(this.props.data[1].home_team_forecast);
        // console.log(this.props);

    }

    onChangeHomeTeamHandler = (event) => {
        const reg = /^\d+$/;
        let regTest = reg.test(event.target.value);
        if (regTest) {
            this.setState({
                ...this.state,
                home_team_forecast: event.target.value
            }, () => { console.log(this.state) });
        } else {
            this.setState({
                ...this.state,
                home_team_forecast: 0
            });
        }
    }

    onChangeAwayTeamHandler = (event) => {
        const reg = /^\d+$/;
        let regTest = reg.test(event.target.value);
        if (regTest) {
            this.setState({
                ...this.state,
                away_team_forecast: event.target.value,
            }, () => { console.log(this.state) });
        } else {
            this.setState({
                ...this.state,
                away_team_forecast: 0
            });
        }
    }

    async postTeams() {
        if (this.state.home_team_forecast && this.state.away_team_forecast) {
            const data = {
                name: this.props.match.name,
                away_team: this.props.match.away_team,
                away_team_forecast: this.state.away_team_forecast,
                home_team: this.props.match.home_team,
                home_team_forecast: this.state.home_team_forecast,
                match_date: this.props.match.date,
                forecast_date: new Date().getTime()
            }
            try {
                this.preventClick();
                this.authorizeClick();
                this.setState({
                    ...this.state,
                    validated: true
                })
                const res = await axios.patch(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts/${this.props.match.name}.json?auth=${this.props.token}`, data);
                console.log(res.data);
            } catch (err) {
                console.log(err);
                this.authorizeClick();
            }
        }
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        this.postTeams();
    }

    click = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    preventClick = (e) => {
        document.body.addEventListener("click", this.click);
    };

    authorizeClick = (e) => {
        setTimeout(() => {
            document.body.removeEventListener("click", this.click);
        }, 1200);
    };

    render() {

        let buttonStyle = {};

        if (this.state.validated) {
            buttonStyle = {
                background: '#00C663',
                border: 'none'
            }
        }


        // Set forecasts
        const matchName = this.props.match.name;
        let homeTeamPlaceholder = '...';
        let awayTeamPlaceholder = '...';
        let validateButton = <button onClick={this.onSubmitHandler} style={buttonStyle}>{!this.state.validated ? 'Valider' : 'Validé !'}</button>;
        let changeButton = this.state.validated ? <button onClick={this.onSubmitHandler}>Modifier</button> : '';
            if (this.props.data) {
                if (this.props.data[matchName]) {
                    homeTeamPlaceholder = this.props.data[matchName].home_team_forecast;
                    awayTeamPlaceholder = this.props.data[matchName].away_team_forecast;
                    validateButton = <button onClick={this.onSubmitHandler} style={{
                        background: '#00C663',
                        border: 'none'
                    }}>{this.props.data[matchName].home_team_forecast && this.props.data[matchName].away_team_forecast ? 'Validé' : 'Valider'}</button>;
                    if (this.props.data[matchName].home_team_forecast && this.props.data[matchName].away_team_forecast) {
                        changeButton = <button onClick={this.onSubmitHandler}>Modifier</button>;
                    }
                }
            }


        return (

            <div className={styles.Game}>
                <form>
                    <div className={styles.gameWrapper}>
                        <div className={styles.countryA}>
                            <div className={styles.score}>
                                <img src={this.props.teams[(this.props.match.home_team) - 1].flag} alt="Flag" />
                                <input type="text" name="currentScore" placeholder={homeTeamPlaceholder} className={styles.currentScore} onChange={this.onChangeHomeTeamHandler} pattern="[0-9]+" title="numbers only" required />
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
                                <input type="text" name="currentScore" placeholder={awayTeamPlaceholder} className={styles.currentScore} onChange={this.onChangeAwayTeamHandler} pattern="[0-9]+" title="number only" required />
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
                    {validateButton}
                    {changeButton}
                </form>
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