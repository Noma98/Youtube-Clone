import React from 'react';
import Video_item from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ videos, onVideoClick, display }) => {
    return (
        <ul className={styles.videos}>
            {videos.map(video => <Video_item
                key={video.id}
                video={video}
                onVideoClick={onVideoClick}
                display={display}
            />)}
        </ul>

    );

};

export default VideoList;