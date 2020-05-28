import React, { useState, useEffect } from 'react'
import axios from 'axios';
const API = axios.create({
  baseURL : "https://rivermouth.herokuapp.com/api/"
});

function StoryList() {
  const [stories, setStories] = useState([]);
  const authToken = localStorage.getItem('jwtToken');
  console.log("JWT IS :" + authToken)
  let authConfig = {
    headers: {
        'authorization': authToken,
    }
  };
  useEffect(()=>{
    API.get("/stories", authConfig).then(result=> {
      setStories(result.data)
    }).catch(err=> {
      console.log("Error while getting stories from database." + err);
    });
}, []) // <-- empty dependency array


  function newStoryGenerator() {
    let r = Math.random().toString(36).substring(7);
    let s = Math.random().toString(36).substring(7);
    API.post("/stories", {
      title: r,
      storyString:s
    }, authConfig).then((result)=> {
      let newStory = [...stories, result];
      setStories(newStory);
    }).catch(err=> {
      console.log("Error while adding new story to database." + err);
    });
  }
  let initialStories

  return (
    <div>
      <button onClick={newStoryGenerator}>New Story</button>
      <br />
      {JSON.stringify(stories)}
    </div>
  );
}

export default StoryList;
