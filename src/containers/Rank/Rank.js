import React, { Component } from 'react';
import styles from './Rank.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import trophies from '../../assets/treetrophies.png';

class Rank extends Component {

    state = {
        data: null
    }

    async componentDidMount() {

        try {
            const res = await axios.get(`https://altencup-dev.firebaseio.com/users.json?auth=${this.props.token}`);
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

        const array = [];

        if (this.state.data) {
            let i = 0;
            for (let user in this.state.data) {
                if (i < 20) {
                    const newObj = {
                        points: this.state.data[user].points,
                        firstName: this.state.data[user].firstName,
                        lastName: this.state.data[user].lastName,
                        rank: this.state.data[user].rank,
                    };
                    array.push(newObj)
                }
                i++;
            }
        }

        console.log(array);

        const ranking = array.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.firstName} {user.lastName}</td>
                    <td>{user.points}</td>
                    <td>{user.rank}</td>
                </tr>
            )
        })

        const top = ranking.slice(0,3);
        const nextTop = ranking.slice(3,18);

        return (
            <div className={styles.Rank}>
                <div className={styles.rankWrapper}>
                    <div className={styles.title}>
                        <img src={trophies} alt="trophies" />
                        <h3>Classement Alten</h3>
                        <img src={trophies} alt="trophies" />
                    </div>
                    <div className={styles.podium}>
                        <div className={styles.silver}>
                            <span>Michelle</span>
                            <div className={styles.step}>
                                31
                        </div>
                            2ème
                        </div>
                        <div className={styles.gold}>
                            <span>Fabrice</span>
                            <div className={styles.step}>
                                32
                        </div>
                            1er
                        </div>
                        <div className={styles.bronze}>
                            <span>Daniel</span>
                            <div className={styles.step}>
                                27
                            </div>
                            3ème
                        </div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Points</th>
                                <th>Rang</th>
                            </tr>
                        </thead>
                        <tbody>

                            {top}

                            yo

                            {nextTop}

                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.auth_reducer.token,
    }
}

export default connect(mapStateToProps, null)(Rank);