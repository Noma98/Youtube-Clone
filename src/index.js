import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import Youtube from './service/youtube.js';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY2 },
});
const youtube = new Youtube(httpClient);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App youtube={youtube} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
