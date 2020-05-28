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
      let newStory = [...stories, result.data];
      setStories(newStory);
    }).catch(err=> {
      console.log("Error while adding new story to database." + err);
    });
  }

  function deleteStory(id) {
    console.log("req to delete story id: " + id);
    API.delete("/stories/" + id, authConfig).then((result)=> {
      let newStories = [...stories];
      newStories.splice(stories.findIndex(function(i){
        return i.storyID === id;
      }), 1);
      setStories(newStories);
    }).catch(err=> {
      console.log("Error while deleting story from database." + err);
    });
  }


  let displayStories = stories.map((story) =>  {
    return(
    <li className="collection-item">
      <div>{story.title}
        <a  className="secondary-content"><i onClick={() => { if (window.confirm('Are you sure you wish to delete this story forever?')) deleteStory(story.storyID)}} className="material-icons" style={{color:"red"}}>delete_forever</i></a>
        <a href="#!" className="secondary-content" style={{paddingLeft:"15px",paddingRight:"15px",color:"blue"}}><i className="material-icons">edit</i></a>
        <a href="#!" className="secondary-content"><i className="material-icons">play_circle_outline</i></a>
      </div>
    </li>
  );
});
let descriptions = ["wonderful","marvelous","magnificent","superb","glorious","sublime","lovely","first-class","amazeball","sensational","fab","fantabulous","rad"]
let description = descriptions[Math.floor(Math.random() * descriptions.length)];

  return (
    <div>
      <button onClick={newStoryGenerator}>New Story</button>
      <br />
      <ul class="collection with-header">
  <li class="collection-header"><h4>Your <u>{description}</u> stories</h4></li>
{displayStories}
</ul>
    </div>
  );
}

export default StoryList;
