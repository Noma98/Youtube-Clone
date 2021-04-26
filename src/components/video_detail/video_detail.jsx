import React from 'react';
import styles from './video_detail.module.css';
import * as common from '../../common';
import ViewInfo from './view_info/view_info';
import ChannelContainer from './channel_container/channel_container';
import DescriptionBox from './description_box/description_box';

const VideoDetail = ({ video }) => {
    return (
        <div className={styles.playVideoBox}>
            <div className={styles.iframeBox}>
                <iframe
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title='youtube video'
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    frameBorder='0'></iframe>
            </div>
            <div className={styles.videoContainer}>
                {video.tags && <p className={styles.tags}>{common.tagMaker(video.tags)}</p>}
                <h2 className={styles.title}>{video.videoTitle}</h2>
                <ViewInfo video={video} />
                <ChannelContainer video={video} />
                <DescriptionBox video={video} />
            </div>
            <span className={styles.comments1}>댓글 {common.numberWithCommas(video.comment)}개</span>
        </div>
    );
};




export default VideoDetail;
