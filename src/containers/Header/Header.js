import React, { PureComponent } from 'react';
import styles from './Header.module.css';
import { connect } from 'react-redux';

import alten from '../../assets/alten.png';
import win from '../../assets/winicon.png';

import mondial10 from '../../assets/mondial10.png';

class Header extends PureComponent {
    
    render() {
        return (
            <div className={styles.Header}>
                <div className={styles.user}>
                    <div className={styles.userName}>{this.props.token ? this.props.firstName : ''}</div>
                    <div className={styles.userPoints}>{this.props.token ? '0 pts' : ''}</div>
                </div>
                <img src={mondial10} alt="logo mondial10" className={styles.mondial10}/>
                <div className={styles.logos}>
                    <img src={alten} className={styles.headerAlten} alt='Logo Alten' />
                    <img src={win} className={styles.headerWin} alt='Logo Trophé' />
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

export default connect(mapStateToProps, null)(Header);