import React from 'react';

import styles from "./Success.module.css";

const success = (props) => {
    return (
        <div className={styles.Welcome}>
            <div className={styles.welcomeWrapper}>
                <div className={styles.welcomeBox}>
                    <h3>Félicitations !</h3>
                    <p>Vos paris ont bien été enregistrés.</p>
                    <p>Revenez mardi 12 juin à partir de 18h pour prendre vos premiers paris sur les matchs.</p>
                </div>
            </div>
        </div>
    )
}

export default success;