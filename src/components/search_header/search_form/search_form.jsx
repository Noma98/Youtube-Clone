import React, { useRef } from 'react';
import styles from './search_form.module.css';

const SearchForm = ({ onSearch }) => {
    const formRef = useRef();
    const inputRef = useRef();

    const onSubmit = event => {
        event.preventDefault();
        const input = inputRef.current.value;
        input && onSearch(input);
    }
    return (
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


    );
};

export default SearchForm;