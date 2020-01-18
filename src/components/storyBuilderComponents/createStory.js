import React, { useState, useEffect } from 'react'
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

function CreateStory() {


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

  <PathItemInput />
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
<div id="treeVisMode" className="col s12">Test 3</div>

  <Footer />

  </React.Fragment>
  );
}

export default CreateStory;
