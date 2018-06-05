import React, { Component } from 'react';
import axios from 'axios';
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import Game from '../Game/Game';
import Spinner from '../../components/Spinner/Spinner';

class Home extends Component {

    state = {
        id: '',
        home_name: '',
        away_name: '',
        date: '',
        location: '',
        time: ''
    }

    async componentDidMount() {
        try {
            const res = await axios.get('https://cors-anywhere.herokuapp.com/http://livescore-api.com/api-client/fixtures/matches.json?key=Tk3aVqlzkk4qm9eO&secret=OwUcVM64dtw9GjCzDFKz659qpdRLm5Aa&league=793');
            const data = res.data.data.fixtures[0];
            this.setState({
                id: data.id,
                home_name: data.home_name,
                away_name: data.away_name,
                date: data.date,
                location: data.location,
                time: data.time
            });

        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <div className={styles.Home}>
                <div className={styles.homeWrapper}>
                    <div className={styles.buttonsWrapper}>
                        <Link to="/forecasts"><button>Mes pronostics</button></Link>
                        <Link to="/rank"><button>Mon classement</button></Link>
                    </div>
                    <h3>Prochain match</h3>
                    { this.state.time ? <Game data={this.state} /> : <Spinner/> }
                    <p>Vous pouvez modifier vos pronostics jusqu'à 24h avant chaque match.</p>
                </div>
            </div>
        );
    }
}

export default Home;