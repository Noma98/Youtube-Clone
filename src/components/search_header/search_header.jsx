import styles from './search_header.module.css';
import React, { memo, useState, useEffect } from 'react';
import SearchForm from './search_form/search_form';
import MiniSearchForm from './mini_search_form/mini_search_form';
import { Link } from 'react-router-dom';

const SearchHeader = memo(({ onSearch, onLogoClick }) => {
    const [mQuery, setMQuery] = useState(
        window.innerWidth < 650 ? true : false,
    );
    const [miniSearch, setMiniSearch] = useState(false);
    const screenChange = (event) => {
        const matches = event.matches;
        setMQuery(matches);
    }
    const setState = (state) => {
        setMiniSearch(state);
    }
    useEffect(() => {
        let mql = window.matchMedia("screen and (max-width:650px)");
        mql.addEventListener("change", screenChange);
        return () => mql.removeEventListener("change", screenChange)
    }, [])

    return (

        <>
            {miniSearch ? (
                <MiniSearchForm onSearch={onSearch} setState={setState} />
            ) : (
                <div className={styles.header}>
                    <div className={styles.start}>
                        <button className={styles.menuBtn}>
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link to='/'>
                            <div className={styles.logo} onClick={onLogoClick}>
                                <img className={styles.logoImage} src="/images/logo.png" alt="logo" />
                                <h4 className={styles.logoTitle}>Youtube</h4>
                            </div>
                        </Link>
                    </div>
                    {mQuery ? (
                        <></>
                    ) : (
                        <div className={styles.center}>
                            <SearchForm onSearch={onSearch} />
                            <button className={styles.btn}><i className="fas fa-microphone"></i></button>
                        </div>
                    )}

                    <div className={styles.end}>
                        {mQuery && (<button className={styles.btn} onClick={() => setMiniSearch(true)}>
                            <i className="fas fa-search"></i>
                        </button>)}
                        <button className={styles.btn}><i className="fas fa-plus-square"></i></button>
                        <button className={styles.btn}><i className="fas fa-th"></i></button>
                        <button className={styles.btn}><i className="fas fa-bell"></i></button>
                    </div>
                </div>)}
        </>


    );
});

export default SearchHeader;