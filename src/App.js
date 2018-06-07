import React, { Component } from 'react';
import './App.css';

import axios from './axios';
import Auth from './containers/Auth/Auth';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import Rank from './containers/Rank/Rank';
import Forecasts from './containers/Forecasts/Forecasts';
import * as actionTypes from "./store/actions/auth";
import { connect } from 'react-redux';

import { slide as Menu } from 'react-burger-menu';

import { Route, Switch, Redirect, Link, withRouter } from "react-router-dom";

import logoburger from './assets/logoburger.png';

class App extends Component {

    state = {
        menuOpen: false,
        matches: '',
        teams: '',
        stadiums: ''
    }

    async componentDidMount() {

        this.props.onTryAutoSignup();

        try {
            const res = await axios.get('https://altencup-dev.firebaseio.com/users.json');
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }

        try {
            const res = await axios.get('https://raw.githubusercontent.com/lsv/fifa-worldcup-2018/master/data.json');
            const data = res.data;
            const now = new Date()
            const matchesToSort = [];

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

            // Sorting Algorithm
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
            console.log(result);
            this.setState({
                ...this.state,
                matches: result,
                teams: data.teams,
                stadiums: data.stadiums
            })
        } catch (err) {
            console.log(err);
        }
    }

    async buttonClickHandler() {
        const data = {
            team1: '7',
            team2: '3'
        }
        try {
            const res = await axios.patch('/test.json', data)
            console.log(res.data);
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
                <Route exact path="/" render={() => <Home matches={this.state.matches} teams={this.state.teams} stadiums={this.state.stadiums} />} />
                <Route exact path="/login" component={Auth} />
                <Route exact path="/forecasts" render={() => <Forecasts matches={this.state.matches} teams={this.state.teams} stadiums={this.state.stadiums} />} />
                <Route exact path="/rank" component={Rank} />
                <Redirect to="/" />
            </Switch>
        )

        return (
            <div className="App">
                <Menu isOpen={this.state.menuOpen} className="Menu">
                    <img src={logoburger} className='logoburger' alt='Logos Mondial10 et Yammer' />
                    <Link to="/" onClick={() => this.closeMenuHandler} >Accueil</Link>
                    <Link to="/login" onClick={() => this.closeMenuHandler}>Connexion</Link>
                    <Link to="/forecasts" onClick={() => this.closeMenuHandler}>Mes pronostics</Link>
                    <Link to="/rank" onClick={() => this.closeMenuHandler}>Classement</Link>
                    <a href="/">Fifa'lten<span>(Forum, Classements, Communautés...)</span></a>
                </Menu>
                <Header />
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

export default withRouter(connect(null, mapDispatchToProps)(App));
