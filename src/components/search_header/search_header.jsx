import styles from './search_header.module.css';

import React, { memo, useRef } from 'react';

const SearchHeader = memo(({ onSearch }) => {
    const inputRef = useRef();
    const handleSearch = () => {
        const value = inputRef.current.value;
        onSearch(value);
    }
    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };
    const onClick = () => {
        handleSearch();
    }
    console.log('header!!!!!');
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <img className={styles.img} src="/images/logo.png" alt="logo" />
                <h1 className={styles.title}>Youtube</h1>
            </div>
            <input
                className={styles.input}
                ref={inputRef}
                type="search"
                placeholder='search..'
                onKeyUp={onKeyPress}
            />
            <button className={styles.btn} onClick={onClick}>
                <img src="/images/search.png" alt="search" />
            </button>
        </header>
    );
});


export default SearchHeader;