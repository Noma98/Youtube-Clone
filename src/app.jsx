import React, { useEffect, useState } from 'react';
import SearchHeader from './components/search_header/search_header';
import Video_list from './components/video_list/video_list';
import styles from './app.module.css';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const search = query => {
    youtube
      .search(query) //
      .then(videos => setVideos(videos));
  };
  useEffect(() => {
    youtube
      .mostPopular() //
      .then(videos => setVideos(videos));
  }, []);
  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <Video_list videos={videos} />
    </div>);
}

export default App;
