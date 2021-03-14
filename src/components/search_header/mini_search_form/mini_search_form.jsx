import React, { useEffect, useRef, useState } from 'react';
import styles from './mini_search_form.module.css';

const MiniSearchForm = ({ onSearch, setState }) => {
    const formRef = useRef();
    const inputRef = useRef();
    const onSubmit = event => {
        event.preventDefault();
        const input = inputRef.current.value;
        input && onSearch(input);
    }
    const screenChange = (event) => {
        !event.matches && setState(false);
    }
    useEffect(() => {
        let mql = window.matchMedia("screen and (max-width:650px)");
        mql.addEventListener("change", screenChange);
        return () => mql.removeEventListener("change", screenChange)
    }, [])

    return (
        <div className={styles.header}>
            <button className={styles.btn} onClick={() => setState(false)}>
                <i className="fas fa-arrow-left"></i>
            </button>
            <form ref={formRef} className={styles.search} onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    placeholder='검색'
                    type="text"
                    className={styles.searchInput}
                    autoFocus
                />
                <button className={styles.searchIconBtn} >
                    <img className={styles.searchIcon} src="/images/search.png" alt="search icon" />
                </button>
            </form>
            <button className={styles.btn}><i className="fas fa-microphone"></i></button>
        </div>

    );

};

export default MiniSearchForm