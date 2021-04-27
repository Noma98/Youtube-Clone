import React, { memo } from 'react';
import styles from './sidebar.module.css'

const Sidebar = memo(({ onHomeClick }) => {
    return (
        <div className={styles.sidebar}>
            <button className={styles.btn} onClick={onHomeClick}>
                <i className="fas fa-home"></i>
                홈
            </button>
            <button className={styles.btn}>
                <i className="fas fa-fire"></i>
                인기
            </button >
            <button className={styles.btn}>
                <i className="fab fa-youtube"></i>
                구독
            </button>
            <button className={styles.btn}>
                <i className="fas fa-archive"></i>
                Originals
            </button>
            <button className={styles.btn}>
                <i className="fas fa-box"></i>
                보관함
            </button>
        </div>
    );
});

export default Sidebar;