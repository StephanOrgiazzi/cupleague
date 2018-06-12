import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Welcome.module.css";

const welcome = (props) => {
    return (
            <div className={styles.Welcome}>
                <div className={styles.welcomeWrapper}>
                    <div className={styles.welcomeBox}>
                        <h3>Principe</h3>
                        <p>Pronostique quelle équipe remportera la coupe du monde et qui sera élu meilleur buteur !</p>
                        <p>Fais également tes pronostics sur les résultats de chacun des matchs de la coupe du monde et compare tes résultats à ceux de tes collaborateurs tout au long de l'événement.<br />
                            Ouverture des paris dès mardi 12 juin à 18h !</p>
                    </div>
                    <Link to="/scoring"><button>Suivant</button></Link>
                </div>
            </div>
    )
}

export default welcome;