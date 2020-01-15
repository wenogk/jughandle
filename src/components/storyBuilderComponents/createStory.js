import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'

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
  <h1>Create page</h1>
  <br />
  <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s6">
            <input id="input_text" type="text" data-length="10" />
            <label for="input_text">Input text</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <textarea id="textarea2" className="materialize-textarea" data-length="120"></textarea>
            <label for="textarea2">Textarea</label>
          </div>
        </div>


  <ul className="list-inline">
    <li><a className="btn-floating red"><i className="material-icons">queue</i></a></li>
    <li><a className="btn-floating yellow darken-1"><i className="material-icons">video_call</i></a></li>
    <li><a className="btn-floating green"><i className="material-icons">collections</i></a></li>
    </ul>

      </form>
    </div>
  <Footer />
  </React.Fragment>
  );
}

export default CreateStory;
