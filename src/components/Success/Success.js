import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Success.module.css";

const success = (props) => {
    return (
            <div className={styles.Welcome}>
                <div className={styles.welcomeWrapper}>
                    <div className={styles.welcomeBox}>
                        <h3>Félicitations !</h3>
                        <p>Vos paris ont bien été enregistrés.</p>
                        <p>Prenez dès maintenant vos paris sur les prochains matchs !</p>
                    </div>
                    <Link to="/home"><button>C'est parti !</button></Link>
                </div>
            </div>
    )
}

export default success;