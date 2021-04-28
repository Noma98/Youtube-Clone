
<h1 align="center"><b>Youtube Clone</b></h1>
<p align="center">
<img src="https://img.shields.io/badge/made by-merry-red">
<img src="https://img.shields.io/badge/JS-71.5%25-blueviolet">
<img src="https://img.shields.io/badge/React-17.0.2-blue">
<img src="https://img.shields.io/badge/Open%20Source-%F0%9F%A7%A1-brightgreen">
</p>
  
<img width="100%" alt="thumbnail" src="https://user-images.githubusercontent.com/69305320/116347815-e1c66a80-a827-11eb-9e32-6a7ccb82031c.PNG">
  
<h2 align="center"><a href="https://merrytube.netlify.app/"><b>Live Demo</b></a></h2>    


# **📝 Description**

Youtube에서 제공하는 Data API를 이용한 클론 코딩 프로젝트로, Youtube의 필수 기능들(검색, 인기 영상, 동영상 재생)을 구현했습니다.  
## **How to use ❓**
### **1. 비디오를 클릭해보세요!**
📍 썸네일 클릭시 해당 영상을 재생할 수 있는 페이지가 뜨고, 관련된 영상들을 추천해 줍니다.

![playVideo](https://user-images.githubusercontent.com/69305320/116347802-decb7a00-a827-11eb-80b0-39e2927d667c.gif)

📍 하단의 `더보기`를 클릭하면 영상의 자세한 정보를 확인할 수 있습니다.


![more](https://user-images.githubusercontent.com/69305320/116347797-dd9a4d00-a827-11eb-9108-62f82ba34ad8.gif)


### **2. 보고싶은 영상을 검색창에 입력하세요.**

📍 검색 결과가 영상만 나오도록 필터링 되어 있어, 채널 관련 결과는 나오지 않습니다.  

📍 검색어를 이용해 타이틀과 URL 주소가 변경됩니다.


![search](https://user-images.githubusercontent.com/69305320/116347811-e0953d80-a827-11eb-9722-58105d60b802.gif)
### **3. 사이드바에 있는 '홈'버튼으로 화면 이동이 가능합니다.**  


![sideHome](https://user-images.githubusercontent.com/69305320/116347814-e12dd400-a827-11eb-9e13-1f866f4d6847.gif)

> ❗ 참고  
>
>`새로고침(F5)`은 가능하나, `뒤로가기`는 사용하지 않는 것을 권장합니다.

  
# **🔍 About the project**

### **💻 Development Environment** 
: React.js, React Router, PostCSS, Postman, Youtube API, VScode, Github

> ❗ 아래 코드들은 설명을 위해 필요한 부분만 일부 가져온 것으로, 분량상 나머지는 `//...`으로 생략하겠습니다.

자세한 코드는 [이곳](https://github.com/MerryHa/youtube/tree/master/src)에서 확인하세요.
### **✅ Dependency Injection & axios**

📍 데이터 통신을 `App` 컴포넌트로부터 분리시키기 위해 외부에서 `Youtube` 클래스를 생성하여 컴포넌트로 주입하였습니다.
```jsx
// src/index.js
//...
import App from './app';
import Youtube from './service/youtube.js';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: { key: process.env.REACT_APP_YOUTUBE_API_KEY},
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

```
📍 `axios` 라이브러리를 사용해 `fetch` API보다 가독성 좋게 서버로부터 데이터를 받아왔습니다. 

📍 API 할당량을 절약하기 위해 꼭 필요한 데이터만 `fields`를 이용해 파라미터로 전달하였습니다.
```jsx
// src/service/youtube.js
class Youtube {
    constructor(httpClient) {
        this.youtube = httpClient;
    }

    async getMostPopular() {
        const response = await this.youtube.get('videos', {
            params: {
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 28,
                fields: 'items(id,snippet(channelId))',
                regionCode: 'KR',
            },
        });
        return response.data.items;
    }
    //...
}
export default Youtube;
```
### **✅ React Router & useHistory**
📍 React Router와 `useHistory`를 사용해 상황에 따라 적절한 URL과 title로 변경되도록 하였습니다. 

▽ 검색 시

![searchURL](https://user-images.githubusercontent.com/69305320/116347812-e12dd400-a827-11eb-9f5f-ad295b332fa0.gif)

▽ 비디오 클릭 시

![watchURL](https://user-images.githubusercontent.com/69305320/116347816-e25f0100-a827-11eb-8eae-333adc04be07.gif)

```jsx
// src/index.js
//...
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App youtube={youtube} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
```
```jsx
// src/app.jsx
//...
import { Route, Switch, useHistory } from 'react-router';
const htmlTitle = document.querySelector('title');

function App({ youtube }) {
  //...
  const history = useHistory();

  const selectVideo = useCallback(
    (video) => {
      history.push(`/watch?v=${video.videoId}`);
      htmlTitle.textContent = `(8) ${video.videoTitle}`;
      //...
    }, [youtube, history]);

  const handleSearch = useCallback(
    query => {
      htmlTitle.textContent = `(8) ${query} - Youtube`;
      history.push(`/results?search_query=${query}`);
     //...
    }, [youtube, history]
  );
 //...

  return (
    //...
        <Switch>
          <Route path="/" exact>
            <Home
              clickLogo={clickLogo}
              //...
            />
          </Route>
          <Route path="/results">
            <Search
              clickLogo={clickLogo}
              //...
            />
          </Route>
          <Route path="/watch">
            <Watch
              youtube={youtube}
              //...
            />
          </Route>
        </Switch>
     //...
}
export default App;
```
### **✅ sessionStorage & useEffect**
📍 `sessionStorage`를 이용해 화면이 새로고침 되어도 현재 페이지와 타이틀를 유지할 수 있도록 구현했습니다.
```jsx
// src/app.jsx
//...
import React, { useCallback, useEffect, useState } from 'react';

let selectedVideo = JSON.parse(sessionStorage.getItem('selectedVideo')) || null;
let defaultVideos = JSON.parse(sessionStorage.getItem('defaultVideos')) || null;
const htmlTitle = document.querySelector('title');
htmlTitle.textContent = sessionStorage.getItem('htmlTitle') || 'Youtube';

function App({ youtube }) {
  const [videos, setVideos] = useState(() =>
    JSON.parse(sessionStorage.getItem('videos')) || null
  );
 //...
  useEffect(() => {
    sessionStorage.setItem('htmlTitle', htmlTitle.textContent);
    sessionStorage.setItem('videos', JSON.stringify(videos));
    sessionStorage.setItem('selectedVideo', JSON.stringify(selectedVideo));
    sessionStorage.setItem('defaultVideos', JSON.stringify(defaultVideos));
  }, [videos, selectedVideo]);

  return (
    //...
    );
}
export default App;
```
### **✅ memo**
📍 `Sidebar` 컴포넌트를 `memo`로 바꿔줌으로써 불필요한 렌더링을 방지했습니다.  
```jsx
import React, { memo } from 'react';
import styles from './sidebar.module.css'

const Sidebar = memo(({ onHomeClick }) => {
    return (
        <div className={styles.sidebar}>
           //...
        </div>
    );
});

export default Sidebar;
```
### **✅ Netlify Redirect**
📍 `public`에 `_redirects` 파일을 생성해 아래와 같이 작성함으로써 Netlify의 새로고침 문제를 해결했습니다.
```
// public/_redirects

/* /index.html 200
```

## **About UI**
### **✅ matchMedia**
📍 `matchMedia`를 이용해서 화면 크기에 적절한 검색창을 제공했습니다.  

(➕ `useEffect`의 `return`구문에 `removeEventListener`을 사용함으로써 컴포넌트가 언마운트된 이후로 불필요하게 이벤트를 감지하지 않도록 하였습니다.)

![responsibleSearch](https://user-images.githubusercontent.com/69305320/116347809-dffca700-a827-11eb-9ebe-16055afe0552.gif)

```jsx
// src/component/search_header/search_header.jsx
const SearchHeader = ({ onSearch, onLogoClick }) => {
    const [mQuery, setMQuery] = useState(
        window.innerWidth < 650 ? true : false,
    );
    const [miniSearch, setMiniSearch] = useState(false);
    const screenChange = (event) => {
        const matches = event.matches;
        setMQuery(matches);
    }
    const setState = (state) => {
        setMiniSearch(state);
    }
    useEffect(() => {
        let mql = window.matchMedia("screen and (max-width:650px)");
        mql.addEventListener("change", screenChange);
        return () => mql.removeEventListener("change", screenChange)
    }, [])

    return (
        <>
            {miniSearch ? (
                <MiniSearchForm onSearch={onSearch} setState={setState} />
            ) : (
                <div className={styles.header}>
                    <div className={styles.start}>
                        <button className={styles.menuBtn}>
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link to='/'>
                            <div className={styles.logo} onClick={onLogoClick}>
                                <img className={styles.logoImage} src="/images/logo.png" alt="logo" />
                                <h4 className={styles.logoTitle}>Youtube</h4>
                            </div>
                        </Link>
                    </div>
                    {mQuery ? (
                        <></>
                    ) : (
                        <div className={styles.center}>
                            <SearchForm onSearch={onSearch} />
                            <button className={styles.btn}><i className="fas fa-microphone"></i></button>
                        </div>
                    )}

                    <div className={styles.end}>
                        {mQuery && (<button className={styles.btn} onClick={() => setMiniSearch(true)}>
                            <i className="fas fa-search"></i>
                        </button>)}
                        <button className={styles.btn}><i className="fas fa-plus-square"></i></button>
                        <button className={styles.btn}><i className="fas fa-th"></i></button>
                        <button className={styles.btn}><i className="fas fa-bell"></i></button>
                    </div>
                </div>)}
        </>
    );
};
export default SearchHeader;
```
📍 위와 동일한 방법으로 화면 크기가 작아졌을 경우 조회수 표시 단위를 변경하고 업로드 일자를 없애 공간을 확보했습니다.

![responsiblePlayScreen](https://user-images.githubusercontent.com/69305320/116347808-dffca700-a827-11eb-8500-9ef816d11911.gif)
  
### **✅ Responsible UI**
📍 `flex`를 사용해 화면 크기에 따라 영상을 배치하였고, `rem`과 `em`단위로 작성해 `media query`에 따라 자동으로 크기(폰트, 여백, 요소 크기)가 조절되도록 만들었습니다.  


![responsibleHome](https://user-images.githubusercontent.com/69305320/116347807-df641080-a827-11eb-8c0b-02f2e4cd37b4.gif)

### **✅ Loading Spinner**
📍 서버에서 데이터를 받아오는 동안 로딩 중임을 사용자가 인지할 수 있도록 로딩 스피너를 구현했습니다.

![playVideo](https://user-images.githubusercontent.com/69305320/116347802-decb7a00-a827-11eb-80b0-39e2927d667c.gif)

```jsx
// src/app.jsx
//...
function App({ youtube }) {
  //...
  const [loading, setLoading] = useState(true);
  //...
  const selectVideo = useCallback(
    (video) => {
      //...
      setLoading(true);
      youtube
        .getRcmData(video.videoId)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube, history]);

  const handleSearch = useCallback(
    query => {
      //...
      setLoading(true);
      youtube
        .getSearchResult(query)
        .then(videos => {
          setVideos(videos);
          setLoading(false);
        });
    }, [youtube, history]
  );
//...
  useEffect(() => {
    if (!defaultVideos) {
      youtube
        .getMostPopular()
        .then(videos => {
          setVideos(videos);
          setLoading(false);
          defaultVideos = videos;
        });
    } else {
      setLoading(false);
    }
  }, [youtube]);
 //...
  return (
    //...
    );
}
export default App;
``` 

# **⏳ Future scope**

- Firebase 로그인 기능 추가하기
- 실시간 데이터베이스를 더해 개인 id별로 '좋아요'한 동영상 저장할 수 있게 하기
- 영상 플레이 화면에서 버튼들('좋아요', '싫어요', ...) 활성화 하기
- 다크모드, 라이트 모드 전활할 수 있게 하기
- 채널 썸네일 누르면 채널 페이지 나오도록 만들기
- 플레이 화면에서 동영상 검정 여백 flex하게 만들기
- '뒤로가기' 클릭 시 적절한 state로 렌더링 되도록 하기