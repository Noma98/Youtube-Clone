import React, { useCallback, useEffect, useState } from 'react';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';
import VideoDetail from './components/video_detail/video_detail';

let loading = true;
let grid = false;
let channelImg = true;
let search = false;

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  //널체크 해야하는 곳은 초기값을 {},[]이런거 말고 null로 명시하자.

  const selectVideo = (video) => {
    search = false;
    grid = false;
    channelImg = false;
    setSelectedVideo(video);
    //항상 들어오는 데이터의 형태가 오브젝트인지 뭔지 확인하고 쓰자. 오브젝트이면 {}를 쓸 필요가 없기때문에 미리 알아야 에러를 피할 수 있음
    youtube
      .getRcmData(video.videoId)
      .then(videos => {
        setVideos(videos);
      });
  }

  const handleSearch = useCallback(
    query => {
      search = false;
      channelImg = true;
      grid = false;
      setSelectedVideo(null);
      youtube
        .getSearchResult(query)
        .then(videos => {
          loading = false;
          setVideos(videos);
        });
    }, [youtube]
  );
  const clickLogo = useCallback(
    () => {
      setSelectedVideo(null);
      channelImg = true;
      grid = true;
      loading = true;
      youtube
        .getMostPopular()
        .then(videos => {
          loading = false;
          setVideos(videos);
        });
    }, [youtube]);
  useEffect(() => {
    channelImg = true;
    grid = true;
    loading = true;
    youtube
      .getMostPopular()
      .then(videos => {
        loading = false;
        setVideos(videos);
      });
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={handleSearch} onLogoClick={clickLogo} />
      <section className={`${grid ? styles.grid : styles.list} ${styles.content}`}>
        {selectedVideo && (
          <VideoDetail video={selectedVideo} />
        )}
        {loading === true ? (
          <div className={styles.loadingScreen}>
            <div className={styles.loadingSpinner}></div>
          </div>)
          : (
            // <div className={styles.list}>
            <VideoList
              channelImg={channelImg}
              youtube={youtube}
              videos={videos}
              onVideoClick={selectVideo}
              display={grid ? 'grid' : 'list'}
              description={search}
            />
            //</div> 
          )}
      </section>
    </div>);
}

export default App;
