import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import styles from "./Welcome.module.css";


import React, { Component } from 'react';

class Welcome extends Component {

    state = {
        bets: null
    }

    async componentDidMount() {


        // Get user info
        if (this.props.token) {
            try {
                const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}.json?auth=${this.props.token}`);
                const data = res.data;
                console.log(data);
                if (data.bets) {
                    this.setState({
                        bets: data.bets
                    })
                }
            } catch (err) {
                console.log('header', err);
            }
        }

    }

    render() {

        

        return (
            <div className={styles.Welcome}>
                <div className={styles.welcomeWrapper}>
                    <div className={styles.welcomeBox}>
                        <h3>Principe</h3>
                        <p>Pronostique quelle équipe remportera la coupe du monde et qui sera élu meilleur buteur !</p>
                        <p>Fais également tes pronostics sur les résultats de chacun des matchs de la coupe du monde et compare tes résultats à ceux de tes collaborateurs tout au long de l'événement.</p>
                    </div>
                    {this.props.token && !this.state.bets &&
                        <Link to="/scoring"><button>Suivant</button></Link>
                    }
                    {this.props.token && this.state.bets &&
                        <Link to="/home"><button>Suivant</button></Link>
                    }
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

export default withRouter(connect(mapStateToProps, null)(Welcome));