import React, { Component } from 'react';
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import GameWrapper from '../GameWrapper/GameWrapper';
import Spinner from '../../components/Spinner/Spinner';
import { connect } from 'react-redux';
import axios from 'axios';

class Home extends Component {

    state = {
        firstName: null,
        points: null
    }

    async componentDidMount() {
        // Get user info
        if (this.props.token) {
            try {
                const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}.json?auth=${this.props.token}`);
                const data = res.data;
                this.setState({
                    ...this.state,
                    points: data.points,
                    firstName: data.firstName,
                })
                this.sendData();
            } catch (err) {
                console.log('header', err);
            }
        }
    }

    sendData = () => {
        this.props.handleChange(this.state.points, this.state.firstName);
    }

    render() {

        return (
            <div className={styles.Home}>
                <div className={styles.homeWrapper}>
                    <div className={styles.buttonsWrapper}>
                        <Link to="/forecasts"><button>Mes pronostics</button></Link>
                        {/*  <Link to="/rank"><button>Mon classement</button></Link> */}
                    </div>
                    <h3>Prochain match</h3>
                    {this.props.matches && this.props.teams && this.props.stadiums ?
                        <GameWrapper match={this.props.matches[0]} teams={this.props.teams} stadiums={this.props.stadiums} /> : <Spinner />
                    }
                    <p>Vous pouvez modifier vos pronostics jusqu'à 1h avant chaque match.</p>
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

export default connect(mapStateToProps, null)(Home);