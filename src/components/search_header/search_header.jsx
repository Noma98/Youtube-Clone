import styles from './search_header.module.css';
import React, { memo } from 'react';
import SearchForm from './search_form/search_form';

const SearchHeader = memo(({ onSearch, onLogoClick }) => {

    return (
        <div className={styles.header}>
            <div className={styles.start}>
                <button className={styles.menuBtn}>
                    <i className="fas fa-bars"></i>
                </button>
                <a className={styles.logo} href='#' onClick={onLogoClick}>
                    <img className={styles.logoImage} src="/images/logo.png" alt="logo" />
                    <h4 className={styles.logoTitle}>Youtube</h4>
                </a>
            </div>
            <div className={styles.center}>
                <SearchForm onSearch={onSearch} />
                <button className={styles.btn}><i className="fas fa-microphone"></i></button>
            </div>
            <div className={styles.end}>
                <button className={styles.btn}><i className="fas fa-plus-square"></i></button>
                <button className={styles.btn}><i className="fas fa-th"></i></button>
                <button className={styles.btn}><i className="fas fa-bell"></i></button>
            </div>
        </div>
    );
});

export default SearchHeader;