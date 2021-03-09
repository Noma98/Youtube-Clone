import React, { memo } from 'react';
import styles from './video_item.module.css';

//memo를 쓰는 이유: props이 바뀌지 않는다면 re-rendering할 필요가 없기 때문

//video 안에 있는 key인 snippet도 deconstructing이 된다
const VideoItem = memo(({ video, video: { snippet }, onVideoClick, display }) => {
    const displayType = display === 'list' ? styles.list : styles.grid;

    //해당 이벤트가 발생하는 곳에서는 굳이 새로 함수를 만들어서 전달해 주지 않고 바로 onClick={()=>{함수(인자)}}로 작성해도 됨
    return (
        <li className={`${styles.container} ${displayType}`} onClick={() => onVideoClick(video)}>
            <div className={styles.video}>
                <img className={styles.thumbnail} src={snippet.thumbnails.medium.url} alt="video thumbnail" />
                <div className={styles.metadata}>
                    <h3 className={styles.title}>{snippet.title}</h3>
                    <span className={styles.channel}>{snippet.channelTitle}</span>
                </div>
            </div>
        </li>
    );
});




export default VideoItem;