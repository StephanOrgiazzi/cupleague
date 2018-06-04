import React, { Component } from 'react';
import styles from './Header.module.css';

import alten from '../../assets/alten.png';
import win from '../../assets/winicon.png';

class Header extends Component {
    render() {
        return (
            <div className={styles.Header}>
                <div className={styles.user}>
                    <div className={styles.userName}>Benjamin</div>
                    <div className={styles.userPoints}>0 pts</div>
                </div>
                <div className={styles.logos}>
                    <img src={alten} className={styles.headerAlten} alt='Logo Alten' />
                    <img src={win} className={styles.headerWin} alt='Logo Trophé' />
                </div>
            </div>
        );
    }
}

export default Header;