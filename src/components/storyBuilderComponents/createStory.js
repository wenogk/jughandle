import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import PathItemInput from './PathItemInput'
function addScript(src){
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
}

const scriptUrl = process.env.PUBLIC_URL + "js/storyBuilder.js"

function CreateStory() {
  useEffect(() => {
    addScript(scriptUrl);
  });

  return (
  <React.Fragment>
  <Navbar />
  <div className="row">
  <div className="col s12">
    <ul className="tabs">
      <li className="tab col s3"><a href="#test1">Test 1</a></li>
      <li className="tab col s3"><a className="active" href="#test2">Test 2</a></li>
      <li className="tab col s3 disabled"><a href="#test3">Disabled Tab</a></li>
      <li className="tab col s3"><a href="#test4">Test 4</a></li>
    </ul>
  </div>

</div>
<div id="test1" className="col s12">
  <div className="container">
  <h1>Create Story</h1>
  <PathItemInput />
  <PathItemInput />
  <PathItemInput />
  <div className="center-align"><br />
  <a className="waves-effect waves-light btn-large"><i className="material-icons left">cloud</i>PUBLISH</a>

  </div>
    <br />  <br />
    </div>
  </div>
<div id="test2" className="col s12">Test 2</div>
<div id="test3" className="col s12">Test 3</div>
<div id="test4" className="col s12">Test 4</div>

  <Footer />

  </React.Fragment>
  );
}

export default CreateStory;
