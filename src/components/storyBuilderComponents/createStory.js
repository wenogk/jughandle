import React, { useReducer, useState, useEffect } from 'react'
import Navbar2 from '../Navbar2'
import Footer from '../Footer'
import PathItemInput from './PathItemInput'
import TreeView from './TreeView'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import {useSelector, useDispatch} from 'react-redux';

function addScript(src){
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
}

const scriptUrl = process.env.PUBLIC_URL + "js/storyBuilder.js"

export default function CreateStory() {

const dispatch = useDispatch();
const PATHS = useSelector((state) => {return(state)});

function getParentTitle(pathID) {
//console.log("get parent title function called")
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
<div id="treeVisMode" className="col s12">
<TreeView paths = {PATHS} callback={dispatch} />
</div>

  <Footer />

  </React.Fragment>
  );
}
