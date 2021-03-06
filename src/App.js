import React, { Component } from 'react';
import './App.css';

import axios from './axios';
import Auth from './containers/Auth/Auth';
import Welcome from './components/Welcome/Welcome';
import Scoring from './components/Scoring/Scoring';
import Prize from './components/Prize/Prize';
import Success from './components/Success/Success';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Rank from './containers/Rank/Rank';
import Forecasts from './containers/Forecasts/Forecasts';
import Logout from './containers/Logout/Logout';
import Auth2 from './containers/Auth2/Auth2';
import Rank2 from './containers/Rank2/Rank2';
import MyBetsWrapper from './containers/MyBetsWrapper/MyBetsWrapper';
import * as actionTypes from "./store/actions/auth";
import { connect } from 'react-redux';

import { slide as Menu } from 'react-burger-menu';

import { Route, Switch, Redirect, Link, withRouter } from "react-router-dom";

import logoburger from './assets/logoburger.png';

class App extends Component {

    state = {
        menuOpen: false,
        matches: '',
        previousMatches: '',
        teams: '',
        stadiums: '',
        firstName: '',
        lastName: '',
        points: '',
    }

    async componentDidMount() {

        this.props.onTryAutoSignup();

        try {
            const res = await axios.get('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json');
            const data = res.data;
            const resTime = await axios.get('https://api.timezonedb.com/v2/get-time-zone?key=XWNL6CM5UTRR&format=json&by=zone&zone=Europe/Paris');
            const dataTime = resTime.data;
            const now = (dataTime.timestamp - dataTime.gmtOffset) * 1000 + 3600000;

            const matchesToSort = [];
            const previousMatchesToSort = [];

            ////////////////////// matches //////////////////////

            for (let pool in data.groups) {
                data.groups[pool].matches.map(match => {
                    if (new Date(match.date).getTime() > now) {
                        matchesToSort.push(match);
                    }
                    return null;
                })
            }

            if (now > new Date("2018-06-28T20:00:00+02:00").getTime()) {
                for (let round in data.knockout) {
                    console.log(data.knockout[round]);
                    data.knockout[round].matches.map(match => {
                        if (new Date(match.date).getTime() > now) {
                            matchesToSort.push(match)
                        }
                        return null;
                    })
                }
            }

            // Sort games by date
            const mapped = matchesToSort.map((e, i) => {
                return { index: i, value: new Date(e.date).getTime() };
            })
            mapped.sort((a, b) => {
                if (a.value > b.value) { return 1 }
                if (a.value < b.value) { return -1; }
                return 0;
            });
            const result = mapped.map(el => {
                return matchesToSort[el.index];
            });

            ////////////////////// previousMatches //////////////////////

            for (let pool in data.groups) {
                data.groups[pool].matches.map(match => {
                    if (new Date(match.date).getTime() < now) {
                        previousMatchesToSort.push(match);
                    }
                    return null;
                })
            }

            if (now > new Date("2018-06-28T20:00:00+02:00").getTime()) {
                for (let round in data.knockout) {
                    console.log(data.knockout[round]);
                    data.knockout[round].matches.map(match => {
                        if (new Date(match.date).getTime() < now) {
                            previousMatchesToSort.push(match)
                        }
                        return null;
                    })
                }
            }

            // Sort games by date
            const previousMapped = previousMatchesToSort.map((e, i) => {
                return { index: i, value: new Date(e.date).getTime() };
            })
            previousMapped.sort((a, b) => {
                if (a.value > b.value) { return 1 }
                if (a.value < b.value) { return -1; }
                return 0;
            });
            const previousResult = previousMapped.map(el => {
                return previousMatchesToSort[el.index];
            });


            this.setState({
                ...this.state,
                matches: result,
                previousMatches: previousResult,
                teams: data.teams,
                stadiums: data.stadiums
            })
        } catch (err) {
            console.log(err);
        }

    }

    handleChange = (points, firstName) => {
        this.setState({
            points: points,
            firstName: firstName
        });
    }

    async buttonClickHandler() {
        const data = {
            team1: '7',
            team2: '3'
        }
        try {
            const res = await axios.patch('/test.json', data);
            return res;
        } catch (err) {
            console.log(err);
        }
    }

    closeMenuHandler = () => {
        this.setState({ menuOpen: false })
    }

    render() {

        let routes = (
            <Switch>
                <Route exact path="/home" render={() => <Home matches={this.state.matches} teams={this.state.teams} stadiums={this.state.stadiums} handleChange={this.handleChange} />} />
                <Route exact path="/" render={() => <Auth />} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/welcome" component={Welcome} />
                <Route exact path="/scoring" component={Scoring} />
                <Route exact path="/prize" component={Prize} />
                <Route exact path="/success" component={Success} />
                <Route exact path="/mybets" render={() => <MyBetsWrapper matches={this.state.previousMatches} teams={this.state.teams} />} />
                <Route exact path="/forecasts" render={() => <Forecasts matches={this.state.matches} teams={this.state.teams} stadiums={this.state.stadiums} />} />
                <Route exact path="/rank" component={Rank} />
                <Route exact path="/global_rank" component={Rank2} />
                <Route exact path="/auth" component={Auth2} />
                <Redirect to="/auth" />
            </Switch>
        )

        return (
            <div className="App">
                <Menu isOpen={this.state.menuOpen} className="Menu">
                    <img src={logoburger} className='logoburger' alt='Logos altencup-dev et Yammer' />
                    {this.props.token &&
                        <Link to="/Home" onClick={() => this.closeMenuHandler} >Accueil</Link>
                    }
                    {!this.props.token &&
                        <Link to="/" onClick={() => this.closeMenuHandler}>Connexion</Link>
                    }
                    {this.props.token &&
                        <Link to="/forecasts" onClick={() => this.closeMenuHandler}>Mes pronostics</Link>
                    }
                    {this.props.token &&
                        <Link to="/mybets" onClick={() => this.closeMenuHandler}>Historique</Link>
                    }
                    <Link to="/rank" onClick={() => this.closeMenuHandler}>Classement</Link>
                    {this.props.token &&
                        <Link to="/welcome" onClick={() => this.closeMenuHandler}>Règles</Link>
                    }
                    <a href="https://www.yammer.com/altengroup.eu/#/threads/inGroup?type=in_group&feedId=13919000" target="_blank" rel="noopener noreferrer">Fifa'lten<span>(Forum, Classements, Communautés...)</span></a>
                    {this.props.token &&
                        <Link to="/logout" onClick={() => this.closeMenuHandler}>Se déconnecter</Link>
                    }
                </Menu>
                <Header
                    lastName={this.state.lastName}
                    firstName={this.state.firstName}
                    points={this.state.points} />
                {routes}
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actionTypes.authCheckState())
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
        userId: state.auth_reducer.userId,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
