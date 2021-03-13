import React, { memo, useState, useEffect } from 'react';
import styles from './video_item.module.css';
import * as common from '../../common';
//video 안에 있는 key인 snippet도 deconstructing이 된다

let loading = true;
const VideoItem = memo(({ video, video: { snippet }, onVideoClick, display, youtube, channelImg, description }) => {
    const [videoData, setVideoData] = useState({
        videoId: video.id,
        channelId: snippet.channelId,
        description: '',
        videoTitle: '',
        date: '',
        videoThumbnail: '',
        viewCount: '',
        like: '',
        dislike: '',
        comment: '',
        tags: '',
        channelTitle: '',
        channelImg: '',
        subscriber: '',
    });
    //해당 이벤트가 발생하는 곳에서는 굳이 새로 함수를 만들어서 전달해 주지 않고 바로 onClick={()=>{함수(인자)}}로 작성해도 됨
    useEffect(() => {
        youtube.getAllData(videoData.videoId, videoData.channelId).then(result => {
            const video = result[0];
            const channel = result[1];
            setVideoData({
                ...videoData,
                description: video.snippet.description,
                videoTitle: video.snippet.title,
                date: video.snippet.publishedAt,
                videoThumbnail: video.snippet.thumbnails.medium.url,
                viewCount: video.statistics.viewCount,
                like: video.statistics.likeCount,
                dislike: video.statistics.dislikeCount,
                comment: video.statistics.commentCount,
                tags: video.snippet.tags,
                channelTitle: channel.snippet.title,
                channelImg: channel.snippet.thumbnails.default.url,
                subscriber: channel.statistics.subscriberCount
            });
        }).then(loading = false);

    }, [video]);//여기 warning에서는 videoData나 youtube 넣으라는데 videoData 넣으면 무한루프 생김...

    console.log('render!!!!');
    return (
        <>
            {loading === true ? (
                <div></div>)
                : (
                    <li className={`${styles.video} ${display === 'list' ? styles.list : styles.grid}`} onClick={() => onVideoClick(videoData)}>
                        <img src={videoData.videoThumbnail} className={styles.thumbnail} alt='thumbnail'></img>
                        <div className={styles.metadata}>
                            {channelImg && (<img src={videoData.channelImg} className={styles.channelImg} alt='channel' />)}
                            <div className={styles.infoBox}>
                                <p className={styles.videoTitle}>{videoData.videoTitle}</p>
                                <p className={styles.channelName}>{videoData.channelTitle}</p>
                                <p className={styles.viewCountAndDate}>{`${common.countConverter(videoData.viewCount)}회 • `}
                                    <span className={styles.date}>{common.agoConverter(videoData.date)}</span>
                                </p>
                                {description && <div className={styles.description}>{videoData.description}</div>}
                            </div>
                        </div>
                    </li>
                )}
        </>
    );


});
export default VideoItem;