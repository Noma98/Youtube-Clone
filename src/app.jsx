import React, { useCallback, useEffect, useState } from 'react';
import styles from './app.module.css';
import { Route, Switch, useHistory } from 'react-router';
import Home from './pages/home';
import Search from './pages/search';
import Watch from './pages/watch';
import SearchHeader from './components/search_header/search_header';

let selectedVideo = null;
let defaultVideos = null;

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const htmlTitle = document.querySelector('title');

  const selectVideo = useCallback(
    (video) => {
      history.push(`/watch?v=${video.videoId}`);
      htmlTitle.textContent = `(8) ${video.videoTitle}`;
      setLoading(true);
      selectedVideo = video;
      youtube
        .getRcmData(video.videoId)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube, history]);

  const handleSearch = useCallback(
    query => {
      htmlTitle.textContent = `(8) ${query} - Youtube`;
      history.push(`/results?search_query=${query}`);
      setLoading(true);
      youtube
        .getSearchResult(query)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube, history]
  );

  const clickLogo = useCallback(
    () => {
      htmlTitle.textContent = 'Youtube';
      history.push('/');
      setLoading(true);
      setVideos(defaultVideos);
      setLoading(false);
    }, [defaultVideos, history]);

  useEffect(() => {
    setLoading(true);
    youtube
      .getMostPopular()
      .then(videos => {
        setVideos(videos);
        setLoading(false);
        defaultVideos = videos;
      });
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={handleSearch} onLogoClick={clickLogo} />
      <section className={styles.sidebarAndContent}>
        <Switch>
          <Route path="/" exact>
            <Home
              clickLogo={clickLogo}
              youtube={youtube}
              videos={videos}
              selectVideo={selectVideo}
              loading={loading}
            />
          </Route>
          <Route path="/results">
            <Search
              clickLogo={clickLogo}
              youtube={youtube}
              videos={videos}
              selectVideo={selectVideo}
              loading={loading}
            />
          </Route>
          <Route path="/watch">
            <Watch
              youtube={youtube}
              videos={videos}
              selectVideo={selectVideo}
              selectedVideo={selectedVideo}
              loading={loading}
            />
          </Route>
        </Switch>
      </section>
    </div>);
}

export default App;
