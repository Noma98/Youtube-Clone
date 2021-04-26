import React from 'react';
import VideoList from '../components/video_list/video_list';
import styles from '../app.module.css';
import VideoDetail from '../components/video_detail/video_detail';

const Watch = ({ youtube, videos, selectVideo, loading, selectedVideo }) => {
    return (
        <>
            {loading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.loadingSpinner}></div>
                </div>) : (
                <section className={`${styles.list} ${styles.content}`}>
                    <VideoDetail video={selectedVideo} />
                    <VideoList
                        channelImg={false}
                        youtube={youtube}
                        videos={videos}
                        onVideoClick={selectVideo}
                        display='list'
                        search={false}
                    />
                </section>
            )}
        </>
    );
};

export default Watch;