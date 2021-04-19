import React, { memo, useState, useEffect } from 'react';
import styles from './video_item.module.css';
import * as common from '../../common';
//video 안에 있는 key인 snippet도 deconstructing이 된다

// let loading = true;
const VideoItem = memo(({ video, video: { snippet }, onVideoClick, display, youtube, channelImg, search }) => {
    const [loading, setLoading] = useState(true);
    const [videoData, setVideoData] = useState({
        videoId: '',
        channelId: '',
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
        youtube.getAllData(video.id, snippet.channelId).then(result => {
            const video = result[0];
            const channel = result[1];
            setVideoData({
                videoId: video.id,
                channelId: channel.id,
                description: video.snippet.description,
                videoTitle: video.snippet.title,
                date: video.snippet.publishedAt,
                videoThumbnail: video.snippet.thumbnails.maxres ? video.snippet.thumbnails.maxres.url : video.snippet.thumbnails.medium.url,
                viewCount: video.statistics.viewCount,
                like: video.statistics.likeCount,
                dislike: video.statistics.dislikeCount,
                comment: video.statistics.commentCount,
                tags: video.snippet.tags,
                channelTitle: channel.snippet.title,
                channelImg: channel.snippet.thumbnails.default.url,
                subscriber: channel.statistics.subscriberCount
            });
            setLoading(false);
        });

    }, [video]);//여기 warning에서는 videoData나 youtube 넣으라는데 videoData 넣으면 무한루프 생김...

    console.log('item render!!!!');
    return (
        <>
            {loading === true ? (
                <div></div>)
                : (
                    <li className={`${styles.video} ${display === 'list' ? styles.list : styles.grid} ${search ? styles.search : ''}`} onClick={() => onVideoClick(videoData)}>
                        <img src={videoData.videoThumbnail} className={styles.thumbnail} alt='thumbnail'></img>
                        <div className={styles.metadata}>
                            {channelImg && !search && (<img src={videoData.channelImg} className={styles.channelImg} alt='channel' />)}
                            <div className={styles.infoBox}>
                                <p className={styles.videoTitle}>{videoData.videoTitle}</p>
                                {search && <p className={styles.viewCountAndDate}>{`조회수 ${common.countConverter(videoData.viewCount)}회 • `}
                                    <span className={styles.date}>{common.agoConverter(videoData.date)}</span>
                                </p>}
                                <div className={styles.channelBox}>
                                    {search && <img src={videoData.channelImg} className={styles.searchChannelImg} alt='channel' />}
                                    <p className={styles.channelName}>{videoData.channelTitle}</p>
                                </div>
                                {!search && <p className={styles.viewCountAndDate}>{`조회수 ${common.countConverter(videoData.viewCount)}회 • `}
                                    <span className={styles.date}>{common.agoConverter(videoData.date)}</span>
                                </p>}
                                {search && <div className={styles.description}>{videoData.description}</div>}
                            </div>
                        </div>
                    </li>
                )}
        </>
    );


});
export default VideoItem;