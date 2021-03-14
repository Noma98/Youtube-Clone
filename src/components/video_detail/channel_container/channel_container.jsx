import React from 'react';
import * as common from '../../../common';
import styles from './channel_container.module.css';

const ChannelContainer = ({ video }) => (
    <div className={styles.channelContainer}>
        <div className={styles.channelStart}>
            <img src={video.channelImg} alt="Channel" className={styles.channelImg} />
            <div className={styles.channelInfo}>
                <h4 className={styles.channelName}>{video.channelTitle}</h4>
                <div className={styles.subscribers}>구독자 {common.countConverter(video.subscriber)}명</div>
            </div>
        </div>
        <button className={styles.subscribe}>구독</button>
    </div>
);

export default ChannelContainer;