import React, { useReducer, useState, useEffect } from 'react'
import Navbar2 from '../Navbar2'
import Footer from '../Footer'
import PathItemInput from './PathItemInput'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

function addScript(src){
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
}

const scriptUrl = process.env.PUBLIC_URL + "js/storyBuilder.js"

function cleanPathState(state) {
  let memoizationMap = {} //memoization for doesPathIDExistInOptions function
  function doesPathIDExistInOptions(pathID) {
      if(memoizationMap[pathID]===true) {
        return true;
      } else if(memoizationMap[pathID]===false) {
        return false;
      }
      for(let pathID in newState) {
        for(let optionIndex in newState[pathID].options) {
          if(newState[pathID].options[optionIndex].pathID === pathID) {
            memoizationMap[pathID] = true;
            return true;
          }
        }
      }
      memoizationMap[pathID] = false;
      return false;
  }
  //takes in the paths state and checks if there are path ids that are not options and then deletes that path if not an option
  let newState = {...state}
  let cleanPaths = true;
  do {
    for(let pathID in newState) {
      if(!doesPathIDExistInOptions(pathID)) {
        delete newState[pathID];
        cleanPaths = false;
      }
    }
    cleanPaths = true;
  } while(!cleanPaths);
  return state;
}

function reducer(state, action) {
  let newState = {...state}
  console.log("action: " + action.type);
  switch (action.type) {
    case "add-option" :
      let newOption = {
        pathID : action.newOptionID,
        text : action.text
      }
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : state[action.pathID].text,
        options : [...state[action.pathID].options, newOption],
      };
      newState[action.newOptionID] = {
        title : action.text,
        text : "",
        options: []
      }
      console.log(JSON.stringify(newState));
      return newState;
    case "delete-option" :
      let index = newState[action.parentID].options.findIndex(x => x.pathID === action.pathID);
      newState[action.parentID].options.splice(index, 1)
      delete newState[action.pathID];
      console.log(JSON.stringify(action));
      console.log(JSON.stringify(newState));
      return cleanPathState(newState);
    case "change-path-text":
      newState[action.pathID] = {
        title : state[action.pathID].title,
        text : action.text,
        options : [...state[action.pathID].options],
      };
      console.log(JSON.stringify(newState));
      return newState;

    case "change-option-text":
      for(var path in newState) {
        if(path == action.pathID) {
          newState[path].title = action.text;
        }
        for(let x = 0; x < newState[path].options.length ; x++) {
          let option = newState[path].options[x]
          if(option.pathID == action.pathID) {
            option.text = action.text;
          }
        }
      }

      console.log(JSON.stringify(newState));
      return newState;
    case "add-video" :
      return;
    case "add-image":
      return;
    default:
      return state;
  }
}

export default function CreateStory() {

const [PATHS, dispatch] = useReducer(reducer,
  {
    "root" : {
      title: "Start Root Path",
      text: "",
      options: []
    }
  }
); //k
function updatePathItem(idVal, newPathItemObject) {
  let newObj = {
    ...PATHS,
  }
  newObj[idVal] = newPathItemObject;
  //setPathObject(newObj);
  //console.log(PATHS)
}
function getParentTitle(pathID) {
  console.log("get parent title function called")
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
  paths.push(<PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} parentTitle={getParentTitle(idVal)}  hasVideoDefault={false} />);
}
  return (
  <React.Fragment>
  <Navbar2 />
  <div className="row" id="option">
  <div className="col s12">


  </div>

</div>
{/*start simple mode */}

<div id="storyMode" className="col s12">
  <div className="container">
  <div className="typewriter">
  <h1 className="header center hide-on-small-only" >create your story.</h1><br/>
  </div>
  {paths}
  <div className="center-align"><br />
  <a className=" btn-large"><i className="material-icons left">cloud</i>PUBLISH</a>

  </div>
    <br />  <br />
    </div>
  </div>

{/*end simple mode */}

<div id="previewMode" className="col s12">
<pre>
{JSON.stringify(PATHS, null, "\t")}
</pre>
</div>
<div id="treeVisMode" className="col s12">Tree visualization mode</div>

  <Footer />

  </React.Fragment>
  );
}
