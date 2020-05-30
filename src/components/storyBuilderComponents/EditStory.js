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
const API = axios.create({
  baseURL : "https://rivermouth.herokuapp.com/api/"
});

export default function EditStory() {

  const {user, setUser} = useContext(UserContext);
  const PATHS = useSelector((state) => {return(state)});
  const dispatch = useDispatch();
  const [storyTitle,setStoryTitle] = useState("title");
  const [storyDataLoaded,setStoryDataLoaded] = useState(false);
  let { storyID } = useParams();
  const authToken = localStorage.getItem('jwtToken');

  let authConfig = {
    headers: {
        'authorization': authToken,
    }
  };

  function getStoryInstance(storyID) {
    function dispatchFromStoryString(storyString) {
      let storyObj = JSON.parse(storyString);
      //alert(JSON.stringify(storyString));

      dispatch({type:"reset-state"});
      Object.keys(storyObj).forEach(pathID => {
        //console.log(pathID);        // the name of the current key.
        //alert(storyObj[pathID].options); // the value of the current key.
      dispatch({type: "add-new-path", newPathID: pathID, newTitle: storyObj[pathID].title, newOptions : storyObj[pathID].options, newText: storyObj[pathID].text, newVideo: storyObj[pathID].video});
      });
    }
    let pathLoader, titleLoader;
    API.get("/stories/"+storyID, authConfig).then(result => {
    //pathLoader = result.data.storyString;
    setStoryDataLoaded(false);
    setStoryTitle(result.data[0].title);
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
    }, authConfig).then(result=> {
      onSaveSuccess();
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
        <input onChange={event => setStoryTitle(event.target.value)} placeholder="Placeholder" id="first_name" type="text" className="validate" value={storyTitle} />

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
