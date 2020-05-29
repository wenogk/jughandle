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
import axios from 'axios';
const API = axios.create({
  baseURL : "https://rivermouth.herokuapp.com/api/"
});

export default function EditStory() {

  const {user, setUser} = useContext(UserContext);

  let { storyID } = useParams();
  const authToken = localStorage.getItem('jwtToken');

  let authConfig = {
    headers: {
        'authorization': authToken,
    }
  };

  function getStoryInstance(storyID) {

  }

  function updateStoryInstance(storyID, title, storyString) {
    API.put("/stories",{
      storyID: storyID,
      title: title,
      storyString: storyString
    }, authConfig).then(result=> {
    alert(JSON.stringify(result));
    }).catch(err=> {
      console.log("Error while getting stories from database." + err);
    });
  }

  updateStoryInstance(storyID,"romeno","hahahahah");
  getStoryInstance(storyID);
  let PATHS = useSelector((state) => {return(state)});
  const dispatch = useDispatch();
  const [storyTitle,setStoryTitle] = useState("title");

useEffect(()=> {
  let pathLoader, titleLoader;
  API.get("/stories/"+storyID, authConfig).then(result => {
  pathLoader = result.data.storyString;
  titleLoader = result.data.title;
  }).catch(err=> {
    console.log("Error while getting stories from database." + err);
  });
  alert("pathLoader: " + pathLoader + " ---- " + "titleLoader: " + titleLoader)
  window.storyBuilderUI(); //for the tab changing (preview, tree view etc.) in materialize UI stuff
},[]);

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
  return (
  <React.Fragment>
  <Navbar2 />
  <ul className="collection">
        <li className="collection-item">
        <input placeholder="Placeholder" id="first_name" type="text" className="validate" />

        <div class="valign-wrapper center-align secondary-content">

          <div class="">
            <p>Saved last at 10/10/2020</p>
          </div>
          <div class="switch" style={{paddingLeft:"15px",paddingRight:"15px"}}>
            <label>
                Unpublished
                <input type="checkbox" checked />
                <span class="lever"></span>
                Published
            </label>
          </div>
          <div className="" style={{paddingRight:"15px"}} >
            <a className="waves-effect waves-light btn-small"><i className="material-icons right">play_circle_filled</i>Preview</a>

          </div>
          <div className="" >
            <a className="waves-effect waves-light btn-small"><i className="material-icons right">cloud</i>Save</a>

          </div>
          <div>

          </div>
        </div>


        </li>

      </ul>
<div style={{minHeight:"80vh"}}>
<TreeView />
</div>

  <Footer />

  </React.Fragment>
  );
}
