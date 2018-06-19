import React, { Component } from 'react';
import styles from './Rank.module.css';
import { connect } from 'react-redux';
import axios from 'axios';
import trophies from '../../assets/treetrophies.png';
import Spinner from '../../components/Spinner/Spinner';

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
        let top0 = '';
        let top0Points = '';
        let top1 = '';
        let top1Points = '';
        let top2 = '';
        let top2Points = '';

        if (this.state.data) {
            for (let user in this.state.data) {
                const newObj = {
                    points: this.state.data[user].points,
                    firstName: this.state.data[user].firstName,
                    lastName: this.state.data[user].lastName,
                    rank: this.state.data[user].rank,
                };
                array.push(newObj);
                array.sort((a, b) => {
                    if (a.rank > b.rank) { return 1 }
                    if (a.rank < b.rank) { return -1; }
                    if (a.points === 0) { return 1; }
                    return 0;
                });
                array.filter(e => e.points === 0);
            }
        }

        if (array.length > 20) {
            top0 = `${array[0].firstName} ${array[0].lastName}`;
            top1 = `${array[1].firstName} ${array[1].lastName}`;
            top2 = `${array[2].firstName} ${array[2].lastName}`;
            top0Points = `${array[0].points}`;
            top1Points = `${array[1].points}`;
            top2Points = `${array[2].points}`;
        }

        const ranking = array.map((user, index) => {
            return (
                <tr key={index}>
                    <td>{user.firstName + ' '}{user.lastName}</td>
                    <td>{user.points}</td>
                    <td>{user.rank}</td>
                </tr>
            )
        })

        const nextTop = ranking;


        return (
            <div className={styles.Rank}>
                {(array.length > 20) ?
                    <div className={styles.rankWrapper}>
                        <div className={styles.title}>
                            <img src={trophies} alt="trophies" />
                            <h3>Classement Alten</h3>
                            <img src={trophies} alt="trophies" />
                        </div>
                        <div className={styles.podium}>
                            <div className={styles.silver}>
                                <span>{top1 ? top1 : ''}</span>
                                <div className={styles.step}>
                                    {top1Points ? top1Points : ''}
                                </div>
                                2ème
                        </div>
                            <div className={styles.gold}>
                                <span>{top0 ? top0 : ''}</span>
                                <div className={styles.step}>
                                    {top0Points ? top0Points : ''}
                                </div>
                                1er
                        </div>
                            <div className={styles.bronze}>
                                <span>{top2 ? top2 : ''}</span>
                                <div className={styles.step}>
                                    {top2Points ? top2Points : ''}
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
                                {nextTop}
                            </tbody>
                        </table>
                    </div>
                    : <Spinner /> }
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