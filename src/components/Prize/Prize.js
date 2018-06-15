import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Prize.module.css";

const Prize = () => {
    return (
        <div>
            <div className={styles.Prize}>
                <div className={styles.prizeWrapper}>
                    <div className={styles.prizeBox}>
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
                    <Link to="/home"><button>C'est parti !</button></Link>
                </div>
            </div>
        </div>
    );
};

export default Prize;