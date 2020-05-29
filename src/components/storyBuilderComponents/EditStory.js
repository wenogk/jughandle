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

export default function EditStory() {
  const {user, setUser} = useContext(UserContext);
  let { storyID } = useParams();
const dispatch = useDispatch();
const PATHS = useSelector((state) => {return(state)});

useEffect(()=> {
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


<div id="storyMode" className="col s12">
  <div className="container">
  <div className="typewriter">
  <h1 className="header center hide-on-small-only" >create your story.</h1><br/>
  <h1>STORYID --> {storyID}</h1>
  </div>
  {paths}
  <div className="center-align"><br />
  <a className=" btn-large"><i className="material-icons left">cloud</i>PUBLISH</a>

  </div>
    <br />  <br />
    </div>
  </div>
<div id="previewMode" className="col s12">
<Preview />

</div>
<div id="treeVisMode" className="col s12" style={{overflow:"auto", minHeight: "100vh"}}>
<TreeView />
</div>

  <Footer />

  </React.Fragment>
  );
}
