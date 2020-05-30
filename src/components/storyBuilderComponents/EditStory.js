import React, { useReducer, useState, useEffect, useContext } from 'react'
import Navbar2 from '../Navbar'
import Footer from '../Footer'
import PathItemInput from './PathItemInput'
import TreeView from './TreeView'
import Preview from './Preview'
import { Link,  useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import {UserContext} from '../../UserContext';
import {useSelector, useDispatch} from 'react-redux';
import M from "materialize-css";
import axios from 'axios';
import TimeAgo from 'react-timeago'
const API = axios.create({
  baseURL : "https://rivermouth.herokuapp.com/api/"
});

export default function EditStory() {

  const {user, setUser} = useContext(UserContext);
  const PATHS = useSelector((state) => {return(state)});
  const dispatch = useDispatch();
  const [storyTitle,setStoryTitle] = useState("title");
  const [published,setPublished] = useState(true);
  const [lastSaveTime,setLastSaveTime] = useState("time");
  const [storyDataLoaded,setStoryDataLoaded] = useState(false);
  const [currentStateUnsaved,setCurrentStateUnsaved] = useState(false);
  let { storyID } = useParams();
  const authToken = localStorage.getItem('jwtToken');

  let authConfig = {
    headers: {
        'authorization': authToken,
    }
  };

  function getStoryInstance(storyID) {
    function dispatchFromStoryString(storyString) {
      dispatch({type:"reset-state"});
      dispatch({type:"set-state", newStoryString: storyString})
    }
    let pathLoader, titleLoader;
    API.get("/stories/"+storyID, authConfig).then(result => {
    //pathLoader = result.data.storyString;
    setStoryDataLoaded(false);
    setStoryTitle(result.data[0].title);
    setLastSaveTime(result.data[0].lastSaveTime);
    setPublished(result.data[0].published);
    dispatchFromStoryString(result.data[0].storyString);
    setStoryDataLoaded(true);
    }).catch(err=> {
      console.log("Error while getting stories from database." + err);
    });
    //alert("pathLoader: " + pathLoader + " ---- " + "titleLoader: " + titleLoader)
  }

  function updateStoryInstance() {
    function onSaveSuccess() {
        const options = {
          html: "Saved!",
          inDuration: 300,
          outDuration: 375,
          displyLength: 4000,
          classes: "rounded",
        };
        M.toast(options);
    }
    API.put("/stories",{
      storyID: storyID,
      title: storyTitle,
      storyString: JSON.stringify(PATHS),
      published: published
    }, authConfig).then(result=> {
      onSaveSuccess();
      setLastSaveTime(Date.now());
      setCurrentStateUnsaved(false);
    }).catch(err=> {
      console.log("Error while getting stories from database." + err);
    });
  }

  //updateStoryInstance(storyID, "romeno","hahahahah");
//  getStoryInstance(storyID);


useEffect(()=> {
  getStoryInstance(storyID);
  window.storyBuilderUI(); //for the tab changing (preview, tree view etc.) in materialize UI stuff
},[]);

useEffect(()=> {
  setCurrentStateUnsaved(true); //for the tab changing (preview, tree view etc.) in materialize UI stuff
},[PATHS]);


function getParentTitle(pathID) {
  for (let idVal in PATHS) {
    for(let optionIndex in PATHS[idVal].options) {
      if(PATHS[idVal].options[optionIndex].pathID === pathID) {
        console.log("PARENT TITLE IS " + PATHS[idVal].title)
        return PATHS[idVal].title;
      }
    }
  }
}

var paths = []
for (let idVal in PATHS) {
  paths.push(<PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)}  hasVideoDefault={(PATHS[idVal].video=="") ? false : true} defaultVideoURL={PATHS[idVal].video} />);
}
let date = new Date(Number(lastSaveTime));
let prettyDate = date.toLocaleString();
  return (
  <React.Fragment>
  <Navbar2 />
  <ul className="collection">
        <li className="collection-item">
        <input onChange={event => {setStoryTitle(event.target.value);setCurrentStateUnsaved(true);}} placeholder="Placeholder" id="first_name" type="text" className="validate" value={storyTitle} />

        <div class="valign-wrapper center-align secondary-content">

          <div class="">
            {currentStateUnsaved &&
            <p style={{color:"red"}}>Current state not saved</p>
          }{!currentStateUnsaved &&
            <p>Saved last on {prettyDate} </p>
          }
          </div>
          <div  class="switch" style={{paddingLeft:"15px",paddingRight:"15px"}}>
            <label>
                <span style={{fontWeight: (!published) ? "bold" : ""}}>Unpublished</span>
                <input onChange={(e) => {setPublished(!published); setCurrentStateUnsaved(true);}} type="checkbox" checked={(published) ? "checked" : ""}  />
                <span class="lever"></span>
                <span style={{fontWeight: (published) ? "bold" : ""}}>Published</span>
            </label>
          </div>
          <div className="" style={{paddingRight:"15px"}} >
            <a className="btn-small"><i className="material-icons right">play_circle_filled</i>Preview</a>

          </div>
          <div className="" >
            <a onClick={()=>{updateStoryInstance()}} className="btn-small"><i className="material-icons right">cloud</i>Save</a>

          </div>
          <div>

          </div>
        </div>


        </li>

      </ul>
<div style={{minHeight:"80vh"}}>
{storyDataLoaded &&
<TreeView />
}
</div>

  <Footer />

  </React.Fragment>
  );
}
