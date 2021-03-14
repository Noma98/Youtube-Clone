import React from 'react';
import VideoItem from '../video_item/video_item';
import styles from './video_list.module.css';

const VideoList = ({ search, channelImg, youtube, videos, onVideoClick, display }) => {
    console.log('list renderrrr!!');
    return (
        <ul className={`${styles.videos} ${display === 'list' ? styles.list : styles.grid}`}>
            {videos.map(video => <VideoItem
                key={video.id}
                video={video}
                onVideoClick={onVideoClick}
                display={display}
                youtube={youtube}
                channelImg={channelImg}
                search={search}
            />)}
        </ul>

    );

};

export default VideoList;