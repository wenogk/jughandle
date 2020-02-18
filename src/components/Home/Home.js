import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link } from "react-router-dom";
import M from "materialize-css";
import Typist from 'react-typist';

function Home() {

useEffect(() => {
  M.Tooltip.init(".tooltipped");
});


  return (
    <React.Fragment>
    <Navbar />
    <div className="section no-pad-bot" id="index-banner">

      <br /><br />
      <Typist avgTypingDelay={40} cursor={{ hideWhenDone: true }}>
      <h1 className="header center hide-on-small-only" style={{color:"#4a148c"}}>Build choose-your-own-path experiences.</h1>

      <h1 className="header center hide-on-med-and-up" style={{color:"#4a148c"}}>Build choose-your-own-path experiences.</h1>
      <div className="container">
        <div className="row center">
          <h5 className="header col s12 light">You focus on the story, we'll handle the technical stuff.</h5>
        </div>
        <div className="row center">
        <Link to="/Create" id="download-button" className="tooltipped btn-large waves-effect waves-teal float-ease-in-out pulse" style={{background:"black"}} data-tooltip="No registrations or payments. We promise.">Create a story now</Link>
        </div>

        <br /><br />

      </div>
      </Typist>
    </div>


    <div className="container">
    
      <div className="section">

        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
              <h5 className="center">Speeds up development</h5>

              <p className="light">We did most of the heavy lifting for you to give you the ability to write stories with no coding knowledge.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text"><i className="material-icons">ondemand_video</i></h2>
              <h5 className="center">Video stories</h5>
              <p className="light">Capability of building choose-your-own-path videos using streamable and youtube videos.</p>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text"><i className="material-icons">settings</i></h2>
              <h5 className="center">HashStory Syntax</h5>

              <p className="light">For those of you who like to have full control. You are able to use our own syntax to build choose-your-own-path experiences with no prior coding knowledge. The syntax is converted to a Javascript JSON object and then can be run.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
    <script>
    const player = new Plyr('#player');
    </script>
    <Footer />
    </React.Fragment>
  );
}

export default Home;
