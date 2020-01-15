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
  <div className="container">
  <h1>Create Story</h1>
  <PathItemInput />
  <PathItemInput />
  <PathItemInput />
  <div className="center-align"><br />
  <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>PUBLISH</a>

  </div>
    <br />  <br />
    </div>
  <Footer />

  </React.Fragment>
  );
}

export default CreateStory;
