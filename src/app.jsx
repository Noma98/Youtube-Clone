import React, { useCallback, useEffect, useState } from 'react';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';
import VideoDetail from './components/video_detail/video_detail';
import Sidebar from './components/sidebar/sidebar';

// let loading = true;
let grid = true;
let channelImg = true;
let search = false;
let selectedVideo = null;

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  //널체크 해야하는 곳은 초기값을 {},[]이런거 말고 null로 명시하자.

  const selectVideo = useCallback(
    (video) => {
      setLoading(true);
      search = false;
      grid = false;
      channelImg = false;
      // loading = true;
      selectedVideo = video;

      //항상 들어오는 데이터의 형태가 오브젝트인지 뭔지 확인하고 쓰자. 오브젝트이면 {}를 쓸 필요가 없기때문에 미리 알아야 에러를 피할 수 있음
      youtube //
        .getRcmData(video.videoId)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube]);

  const handleSearch = useCallback(
    query => {
      setLoading(true);
      search = true;
      channelImg = true;
      grid = false;
      selectedVideo = null;
      youtube
        .getSearchResult(query)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube]
  );

  const clickLogo = useCallback(
    () => {
      setLoading(true);
      selectedVideo = null;
      channelImg = true;
      grid = true;
      search = false;
      // loading = true;
      youtube
        .getMostPopular()
        .then(videos => {
          // loading = false;
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube]);
  useEffect(() => {
    setLoading(true);
    youtube
      .getMostPopular()
      .then(videos => {
        // loading = false;
        setVideos(videos);
        setLoading(false);
      });
  }, [youtube]);

  console.log('app render🌟')
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={handleSearch} onLogoClick={clickLogo} />
      <section className={styles.sidebarAndContent}>
        {selectedVideo === null ? <Sidebar onHomeClick={clickLogo} /> : <></>}
        <section className={`${grid ? styles.grid : styles.list} ${styles.content} ${search ? styles.search : ''}`}>
          {selectedVideo && (
            <VideoDetail video={selectedVideo} />
          )}
          {loading === true ? (
            <div className={styles.loadingScreen}>
              <div className={styles.loadingSpinner}></div>
            </div>)
            : (
              <>
                <VideoList
                  channelImg={channelImg}
                  youtube={youtube}
                  videos={videos}
                  onVideoClick={selectVideo}
                  display={grid ? 'grid' : 'list'}
                  search={search}
                />
              </>
            )}
        </section>
      </section>

    </div>);
}

export default App;
