import React from 'react';
import VideoList from '../components/video_list/video_list';
import styles from '../app.module.css';
import Sidebar from '../components/sidebar/sidebar';

const Search = ({ clickLogo, selectVideo, youtube, videos, loading }) => {
    return (
        <>

            <Sidebar onHomeClick={clickLogo} />
            {loading ? (
                <div className={styles.loadingScreen}>
                    <div className={styles.loadingSpinner}></div>
                </div>) : (
                <section className={`${styles.list} ${styles.content} ${styles.search}`}>
                    <VideoList
                        youtube={youtube}
                        videos={videos}
                        onVideoClick={selectVideo}
                        display='list'
                        channelImg={true}
                        search={true}
                    />
                </section>
            )}


        </>
    );
};

export default Search;