import React, { Component } from 'react';
import styles from './Bets.module.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

class Bets extends Component {

    state = {
        betTeam1: '',
        betTeam2: '',
        betTeamWin: '',
        betPlayer1: '',
        betPlayer2: '',
        betPlayer3: '',
        bets: null
    }

    async componentDidMount() {
        if (this.props.token) {
            try {
                const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}.json?auth=${this.props.token}`);
                const data = res.data;
                this.setState({
                    ...this.state,
                    bets: data.bets
                })
            } catch (err) {
                return err;
            }
        }
    }

    onChangeHandler = (event, input) => {
        switch (input) {
            case 'betTeam1':
                this.setState({
                    ...this.state,
                    betTeam1: event.target.value
                });
                break;
            case 'betTeam2':
                this.setState({
                    ...this.state,
                    betTeam2: event.target.value
                });
                break;
            case 'betTeamWin':
                this.setState({
                    ...this.state,
                    betTeamWin: event.target.value
                });
                break;
            case 'betPlayer1':
                this.setState({
                    ...this.state,
                    betPlayer1: event.target.value
                });
                break;
            case 'betPlayer2':
                this.setState({
                    ...this.state,
                    betPlayer2: event.target.value
                });
                break; case 'betPlayer3':
                this.setState({
                    ...this.state,
                    betPlayer3: event.target.value
                });
                break;
            default:
                return '';
        }
    }

    async postBets() {
        if (this.state.betPlayer1 && this.state.betPlayer2 && this.state.betPlayer3) {
            const data = {
                betTeam1: this.state.betTeam1,
                betTeam2: this.state.betTeam2,
                betTeamWin: this.state.betTeamWin,
                betPlayer1: this.state.betPlayer1,
                betPlayer2: this.state.betPlayer2,
                betPlayer3: this.state.betPlayer3,
                userId: this.props.userId
            }
            try {
                await axios.patch(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/bets.json?auth=${this.props.token}`, data);
                this.props.history.push('/success');
            } catch (err) {
                console.log(err);
            }
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.postBets();
    }

    render() {

        return (
                <div className={styles.Bets}>
                    {this.state.bets || !this.props.token ? <Redirect to='/home' /> :
                        <div className={styles.betsWrapper}>
                            <form className={styles.betsForm} onSubmit={this.onSubmitHandler}>
                                <h3>Choisis tes favoris !</h3>
                                <p>Les équipes qui iront en finale ?</p>
                                <select onChange={(event) => this.onChangeHandler(event, 'betTeam1')}>
                                    <option default>Choisis une équipe</option>
                                    {this.props.teams ? this.props.teams.map((team, index) => {
                                        return <option value={this.props.teams[index].name} key={index}>{this.props.teams[index].name}</option>
                                    }) : ''
                                    }
                                </select>
                                <select onChange={(event) => this.onChangeHandler(event, 'betTeam2')}>
                                    <option default>Choisis une équipe</option>
                                    {this.props.teams ? this.props.teams.map((team, index) => {
                                        return <option value={this.props.teams[index].name} key={index}>{this.props.teams[index].name}</option>
                                    }) : ''
                                    }
                                </select>
                                <p>L'équipe qui sera championne du monde ?</p>
                                <select onChange={(event) => this.onChangeHandler(event, 'betTeamWin')}>
                                    <option default>Choisis une équipe</option>
                                    {this.props.teams ? this.props.teams.map((team, index) => {
                                        return <option value={this.props.teams[index].name} key={index}>{this.props.teams[index].name}</option>
                                    }) : ''
                                    }
                                </select>
                                <p>Les meilleurs buteurs du championnat ?</p>
                                <label>Meilleur Buteur<input type="text" className={styles.bestScorers} name="bestScorer1" placeholder="ex: Griezmann" onChange={(event) => this.onChangeHandler(event, 'betPlayer1')} required /></label>
                                <label>2ème meilleur<input type="text" className={styles.bestScorers} name="bestScorer2" placeholder="ex: Neymar" onChange={(event) => this.onChangeHandler(event, 'betPlayer2')} required /></label>
                                <label>3ème meilleur<input type="text" className={styles.bestScorers} name="bestScorer3" placeholder="ex: Messi" onChange={(event) => this.onChangeHandler(event, 'betPlayer3')} required /></label>
                                <p className={styles.warning}>Attention à bien choisir car tu ne pourras pas revenir sur ta décision !</p>
                                <button>Je valide !</button>
                            </form>
                        </div>}
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        userId: state.auth_reducer.userId,
    }
}

export default withRouter(connect(mapStateToProps, null)(Bets));