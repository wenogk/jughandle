import React, { useState, useEffect, useLayoutEffect } from 'react'
import ReactPlayer from 'react-player'
const VideoItem = ({ PATH}) => {
  return(
    <ReactPlayer playing={true} url={PATH.video} width='100%' height='100%' />
  );
}
export default VideoItem;
