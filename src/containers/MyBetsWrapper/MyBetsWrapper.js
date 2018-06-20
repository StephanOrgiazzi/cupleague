import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import MyBets from '../MyBets/MyBets';


class MyBetsWrapper extends Component {
    
    state = {
        forecasts: null,
    }

    async componentDidMount() {
        if (this.props.token) {
            try {
                const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}.json?auth=${this.props.token}`);
                const data = res.data;
                this.setState({
                    ...this.state,
                    forecasts: data.forecasts,
                })
            } catch (err) {
                console.log('header', err);
            }
        }
    }

    render() {

        return (
            <div>
            {this.props.matches && this.props.teams ?
                <MyBets matches={this.props.matches} teams={this.props.teams} forecasts={this.state.forecasts}/> : <Spinner />
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

export default connect(mapStateToProps, null)(MyBetsWrapper);