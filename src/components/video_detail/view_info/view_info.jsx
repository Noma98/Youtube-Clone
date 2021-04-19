import React, { useState, useEffect } from 'react';
import styles from './view_info.module.css';
import * as common from '../../../common';

const ViewInfo = ({ video }) => {
    const [smallViewCount, setSmallViewCount] = useState(false);
    const screenChange = (event) => {
        event.matches ? setSmallViewCount(true) : setSmallViewCount(false);
    }
    useEffect(() => {
        let mql = window.matchMedia("screen and (max-width:570px)");
        mql.addEventListener("change", screenChange);
        return () => mql.removeEventListener("change", screenChange)
    }, [])
    return (
        <div className={styles.viewInfo}>
            {!smallViewCount ? (<p className={styles.viewCountAndDate}>{
                `조회수 ${common.numberWithCommas(video.viewCount)}회 • `
            }<span className={styles.date}>{common.dateConverter(video.date)}</span>
            </p>) : (<p className={styles.viewCountAndDate}>{
                `조회수 ${common.countConverter(video.viewCount)}회`
            }</p>)}
            <div className={styles.btnContainer}>
                <button className={styles.btnBold}><i className="fas fa-thumbs-up"></i>{common.countConverter(video.viewCount)}</button>
                <button className={styles.btnBold}><i className="fas fa-thumbs-down"></i>{common.countConverter(video.dislike)}</button>
                <button><i className="fas fa-share"></i>공유</button>
                <button><i className="fas fa-folder-plus"></i>저장</button>
                <button>•••</button>
            </div>
        </div>
    );
};


export default ViewInfo;