import React, { Component } from 'react';
import styles from './GameWrapper.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import Game from '../Game/Game';

class GameWrapper extends Component {

    state = {
        data: null
    }

    async componentDidMount() {


        try {
            const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}/forecasts.json?auth=${this.props.token}`);
            const data = res.data;
            this.setState({
                ...this.state,
                data: data
            })
        } catch (err) {
            console.log(err);
        }
    }

    render() {

        return (
            <div className={styles.GameWrapper}>
                {this.props.match && this.props.teams && this.props.stadiums && this.state.data &&
                    <Game match={this.props.match} teams={this.props.teams} stadiums={this.props.stadiums} data={this.state.data}/>
                }
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

export default connect(mapStateToProps, null)(GameWrapper);