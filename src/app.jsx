import React, { useEffect, useState } from 'react';
import SearchHeader from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';
import styles from './app.module.css';
import VideoDetail from './components/video_detail/video_detail';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);//널체크 해야하는 곳은 초기값을 {},[]이런거 말고 null로 명시하자.

  const selectVideo = (video) => {
    setSelectedVideo(video);
    //항상 들어오는 데이터의 형태가 오브젝트인지 뭔지 확인하고 쓰자. 오브젝트이면 {}를 쓸 필요가 없기때문에 미리 알아야 에러를 피할 수 있음
  }

  const search = query => {
    setSelectedVideo(null);
    youtube
      .search(query)
      .then(videos => {
        setVideos(videos);
      });
  };

  useEffect(() => {
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList
            videos={videos}
            onVideoClick={selectVideo}
            display={selectedVideo ? 'list' : 'grid'}
          />
        </div>

      </section>
    </div>);
}

export default App;
