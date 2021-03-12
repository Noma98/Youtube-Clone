import React from 'react';
import Video_item from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ channelImg, youtube, videos, onVideoClick, display }) => {
    const displayType = display === 'list' ? styles.list : styles.grid;
    return (
        <ul className={`${styles.videos} ${displayType}`}>
            {videos.map(video => <Video_item
                key={video.id}
                video={video}
                onVideoClick={onVideoClick}
                display={display}
                youtube={youtube}
                channelImg={channelImg}
            />)}
        </ul>

    );

};

export default VideoList;