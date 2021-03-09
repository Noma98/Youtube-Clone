import React from 'react';
import styles from './video_item.module.css';
//video 안에 있는 key인 snippet도 deconstructing이 된다
const Video_item = ({ video: { snippet } }) =>
    <li className={styles.container}>
        <div className={styles.video}>
            <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} alt="video thumbnail" />
            <div className={styles.metadata}>
                <h3 className={styles.title}>{snippet.title}</h3>
                <span className={styles.channel}>{snippet.channelTitle}</span>
            </div>
        </div>
    </li>;



export default Video_item;