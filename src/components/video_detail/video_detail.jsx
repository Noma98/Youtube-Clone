import React from 'react';
import styles from './video_detail.module.css';
import * as common from '../../common';

const VideoDetail = ({ video }) => (
    <div className={styles.playVideoBox}>
        <div className={styles.iframeBox}>
            <iframe
                src={`https://www.youtube.com/embed/${video.videoId}`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder='0'></iframe>
        </div>
        <div className={styles.container}>
            <div className={styles.videoContainer}>
                <p className={styles.tags}>{common.tagMaker(video.tags)}</p>
                <h2 className={styles.title}>{video.videoTitle}</h2>
                <div className={styles.viewInfo}>
                    <p className={styles.viewCountAndDate}>{
                        `조회수 ${common.numberWithCommas(video.viewCount)}회 • `
                    }<span className={styles.date}>{common.dateConverter(video.date)}</span>
                    </p>
                    <div className={styles.btnContainer}>
                        <button className={styles.btnBold}><i className="fas fa-thumbs-up"></i>{common.countConverter(video.viewCount)}</button>
                        <button className={styles.btnBold}><i className="fas fa-thumbs-down"></i>{common.countConverter(video.dislike)}</button>
                        <button><i className="fas fa-share"></i>공유</button>
                        <button><i className="fas fa-folder-plus"></i>저장</button>
                        <button>•••</button>
                    </div>

                </div>
                <div className={styles.line}></div>
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
                <pre className={styles.notMore}>
                    {video.description}
                </pre>
                <button className={styles.moreBtn}>더보기</button>
                <div className={styles.line}></div>
                <span className={styles.comments1}>댓글 {common.numberWithCommas(video.comment)}개</span>
            </div>
        </div>
    </div>

);


export default VideoDetail;

{/* <section className={styles.detail}>
        <iframe
            type="text/html"
            title="youtube video player"
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${video.videoId}`}
            frameBorder="0"
            allowFullScreen
        ></iframe>
        <h2>{video.videoTitle}</h2>
        <h3>{video.channelTitle}</h3>
        <pre className={styles.description}>{video.description}</pre>
    </section> */}