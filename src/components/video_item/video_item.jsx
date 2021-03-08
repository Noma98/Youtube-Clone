import React from 'react';

const Video_item = props => {
    return (
        <h1>{props.video.snippet.title}</h1>
    );
};

export default Video_item;