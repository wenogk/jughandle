import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
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
  <Navbar />
  <div className="row" id="option">
  <div className="col s12">

    <ul className="tabs">

      <li className="tab col s3" style={{width:"33.3%"}}><a className="active" href="#simpleMode">Simple Mode</a></li>
      <li className="tab col s3" style={{width:"33.3%"}}><a  href="#syntaxMode">Syntax mode</a></li>
      <li className="tab col s3 " style={{width:"33.3%"}}><a href="#treeVisMode">Tree visualization</a></li>

    </ul>
  </div>

</div>
{/*start simple mode */}

<div id="simpleMode" className="col s12">
  <div className="container">
  <h1>Create Story</h1>

  <PathItemInput />
  <div className="center-align"><br />
  <a className=" btn-large"><i className="material-icons left">cloud</i>PUBLISH</a>

  </div>
    <br />  <br />
    </div>
  </div>

{/*end simple mode */}

<div id="syntaxMode" className="col s12">Test 2</div>
<div id="treeVisMode" className="col s12">Test 3</div>

  <Footer />

  </React.Fragment>
  );
}

export default CreateStory;
