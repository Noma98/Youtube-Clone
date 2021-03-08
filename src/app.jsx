import React, { useEffect, useState } from 'react';
import './app.css';
import Video_list from './components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch("https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&maxResults=2&key=AIzaSyBT1w7LThESd2yJkNQ-FCb-RS5EDgBN2kc", requestOptions)
      .then(response => response.json())
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
  }, []);
  return <Video_list videos={videos} />
}

export default App;
