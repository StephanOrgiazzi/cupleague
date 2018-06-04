import React from 'react';

import styles from "./Spinner.module.css";

const spinner = (props) => {
    return (
        <div className={styles.Spinner}>
            <div className={styles.doubleBounce1}></div>
            <div className={styles.doubleBounce2}></div>
        </div>
    )
}
 
export default spinner;