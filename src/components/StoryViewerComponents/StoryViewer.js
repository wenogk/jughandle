import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link,  useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import axios from 'axios';
import RotateLoader from "react-spinners/RotateLoader";
import ImageItem from "./ImageItem";
import VideoItem from "./VideoItem";
import TextItem from "./TextItem";
function StoryViewer() {
  let { storyID } = useParams();
  const [storyTitle,setStoryTitle] = useState(false);
  const [lastSaveTime,setLastSaveTime] = useState("time");
  const [storyDataLoaded,setStoryDataLoaded] = useState(false);
  const [failed,setFailed] = useState(false);
  const [PATHS,setPATHS] = useState({});
  const [currentPathID, setCurrentPathID] = useState("root");
  const [previousPathID, setPreviousPathID] = useState("root");

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getStoryInstance(storyID) {
    const API = axios.create({
      baseURL : "https://rivermouth.herokuapp.com/api/"
    });
    const authToken = localStorage.getItem('jwtToken');
    let authConfig = {
      headers: {
          'authorization': authToken,
      }
    };
    API.get("/stories/published/"+storyID).then(result => {
    setStoryTitle(result.data[0].title);
    setLastSaveTime(result.data[0].lastSaveTime);
    setPATHS(JSON.parse(result.data[0].storyString))
    setTimeout(function(){
      setStoryDataLoaded(true);
    }, getRandomInt(3000,5000));
    }).catch(err=> {
    setStoryDataLoaded(true);
    setFailed(true);
    });
  }

  function loadPath(idVal) {
    setPreviousPathID(currentPathID)
    setCurrentPathID(idVal)
  }

  useEffect(()=> {
    getStoryInstance(storyID);
  },[]);
  let currentStoryItem;
  console.log(PATHS)
  if(PATHS["root"] != null) {
    if(PATHS[currentPathID].video) {
      currentStoryItem = <VideoItem PATH={PATHS[currentPathID]} />
    } else if(PATHS[currentPathID].image != null) {
      currentStoryItem = <ImageItem PATH={PATHS[currentPathID]} loadPath={loadPath} />
    } else {
      currentStoryItem = <TextItem PATH={PATHS[currentPathID]} loadPath={loadPath} />
    }
  }

  return (
    //<div className="navbar-fixed">

    <div
    style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
    {storyDataLoaded&&
      <div>
      <h1>{currentStoryItem}</h1>
      </div>
    }
    {(!storyDataLoaded)&&
      <div>
      <RotateLoader
                size="200"
               color={"purple"}
               loading={!storyDataLoaded}
             />
      </div>
    }
    {(failed)&&
      <div>
      <h1>Not found.</h1>
      </div>
    }
  </div>


    //</div>
  );
}

export default StoryViewer;
