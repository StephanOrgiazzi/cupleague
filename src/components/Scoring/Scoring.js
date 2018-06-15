import React from 'react';
import { Link } from 'react-router-dom';

import styles from "./Scoring.module.css";

const scoring = (props) => {
    return (
            <div className={styles.Scoring}>
                <div className={styles.scoringWrapper}>
                    <div className={styles.scoringBox}>
                        <h3>Les Points</h3>
                        <ul>
                            <li>- <span>3 points</span> pour le bon score pronostiqué</li>
                            <li>- <span>2 points</span> pour le gagnant d'un match ou une égalité bien pronostiquée</li>
                            <li>- <span>5 points</span> pour les 3 meilleurs buteurs</li>
                            <li>- <span>10 points</span> pour les finalistes</li>
                            <li>- <span>20 points</span> pour l'équipe championne du monde</li>
                        </ul>
                    </div>
                    <Link to="/prize"><button>Suivant</button></Link>
                </div>
            </div>
    )
}

export default scoring;