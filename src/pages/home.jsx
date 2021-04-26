import React from 'react';
import VideoList from '../components/video_list/video_list';
import styles from '../app.module.css';
import Sidebar from '../components/sidebar/sidebar';

const Home = ({ clickLogo, youtube, videos, loading, selectVideo }) => {
    return (
        <>
            <Sidebar onHomeClick={clickLogo} />
            {loading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.loadingSpinner}></div>
                </div>) : (
                <section className={`${styles.grid} ${styles.content}`}>
                    <VideoList
                        youtube={youtube}
                        videos={videos}
                        onVideoClick={selectVideo}
                        display='grid'
                        channelImg={true}
                        search={false}
                    />
                </section>
            )}
        </>
    );
};

export default Home;