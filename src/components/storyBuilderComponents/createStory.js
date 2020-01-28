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
      return;
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
        for(let x = 0; x < newState[path].options.length ; x++) {
          let option = newState[path].options[x]
          console.log("looking path id: " + action.pathID + "--- current: " + option.pathID)
          if(option.pathID == action.pathID) {
            console.log("found! setting action text to " + action.text);
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
  console.log(PATHS)
}
var paths = []
for (let idVal in PATHS) {
  paths.push(<PathItemInput title={PATHS[idVal].title} pathID={idVal} textVal={PATHS[idVal].text} onChanged={dispatch} />);
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
Preview Mode
</div>
<div id="treeVisMode" className="col s12">Tree visualization mode</div>

  <Footer />

  </React.Fragment>
  );
}
