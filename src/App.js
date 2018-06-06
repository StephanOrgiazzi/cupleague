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

import mondial10 from './assets/mondial.png';
import punchline from './assets/punchline.png';
import yammer from './assets/yammer.png';

class App extends Component {

    state = {
        menuOpen: false,
        data: ''
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
            const res = await axios.get('https://cors-anywhere.herokuapp.com/http://livescore-api.com/api-client/fixtures/matches.json?key=Tk3aVqlzkk4qm9eO&secret=OwUcVM64dtw9GjCzDFKz659qpdRLm5Aa&league=793');
            const data = res.data.data.fixtures;
            this.setState({
                data: data
            });

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
                <Route exact path="/" render={() => <Home data={this.state.data} />} />
                <Route exact path="/login" component={Auth} />
                <Route exact path="/forecasts" render={() => <Forecasts data={this.state.data} />} />
                <Route exact path="/rank" component={Rank} />
                <Redirect to="/" />
            </Switch>
        )

        return (
            <div className="App">
                <Menu isOpen={this.state.menuOpen} className="Menu">
                    <img src={mondial10} className='menu-mondial' alt='Logo Mondial10' />
                    <img src={punchline} className='menu-punchline' alt='Logo Pariez Gagnez' />
                    <img src={yammer} className='menu-yammer' alt='Logo Yammer' />
                    <Link to="/" onClick={() => this.closeMenuHandler} >Accueil</Link>
                    <Link to="/login" onClick={() => this.closeMenuHandler}>Connexion</Link>
                    <Link to="/forecasts" onClick={() => this.closeMenuHandler}>Mes pronostics</Link>
                    <Link to="/rank" onClick={() => this.closeMenuHandler}>Classement</Link>
                    <a href="/">Fifa'lten</a>
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
