import React from 'react';
import Video_item from '../video_item/video_item';

const Video_list = (props) => {
    console.log(props);
    return (
        <ul>
            {props.videos.map(video => <Video_item key={video.id} video={video} />)}
        </ul>

    );

};

export default Video_list;