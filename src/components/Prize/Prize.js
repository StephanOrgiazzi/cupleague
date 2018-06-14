import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

import styles from "./Prize.module.css";


import React, { Component } from 'react';

class Prize extends Component {

    state = {
        bets: null
    }

    async componentDidMount() {
        // Get user info
        if (this.props.token) {
            try {
                const res = await axios.get(`https://altencup-dev.firebaseio.com/users/${this.props.userId}.json?auth=${this.props.token}`);
                const data = res.data;
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
                        <h3>Les Cadeaux</h3>
                        <ul>
                            <li><span>Lot 1</span>: iMac 4k</li>
                            <li><span className={styles.prize2}>Lot 2</span>: iPhone X</li>
                            <li><span className={styles.prize3}>Lot 3</span>: Ecran Plat 4K SAMSUNG 55 pouces</li>
                            <li><span className={styles.prize4}>Lot 4</span>: PS4 SLIM + FIFA 18</li>
                            <li><span className={styles.prize5}>Lot 5</span>: Casque Beats Solo 3</li>
                            <li><span className={styles.prize6}>Lot 6</span>: Maillot Equipe de France</li>
                            <li><span className={styles.prize7}>Lot 7 à 10</span>: Google Home</li>
                        </ul>
                        <p>Que le meilleur gagne !</p>
                    </div>
                    {this.props.token && !this.state.bets &&
                        <Link to="/bets"><button>C'est parti !</button></Link>
                    }
                    {this.props.token && this.state.bets &&
                        <Link to="/home"><button>C'est parti !</button></Link>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.auth_reducer.userId,
        token: state.auth_reducer.token
    }
}

export default withRouter(connect(mapStateToProps, null)(Prize));