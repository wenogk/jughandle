import React, { useState, useEffect,useContext } from 'react';
import Navbar from '../Navbar'
import Footer from '../Footer'
import { Link } from "react-router-dom";
import M from "materialize-css";
import Typist from 'react-typist';
import SocialButton from './SocialButton';
import { GithubLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { UserContext } from '../../UserContext';
import { Redirect } from 'react-router';
function Home() {
const {user, setUser} = useContext(UserContext);
useEffect(() => {
  M.Tooltip.init(".tooltipped");
});
const handleSocialLogin = (loggedInUser) => {
  //console.log(loggedInUser);
  let userObject = {
    loggedIn: true,
    email: loggedInUser["_profile"].email,
    name:loggedInUser["_profile"].name,
    userID:loggedInUser["_profile"].id,
    type:loggedInUser["_provider"]
  };
  localStorage.setItem('user', JSON.stringify(userObject));
  setUser(userObject)
 console.log(localStorage.getItem('user'))
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

  return (
    <React.Fragment>
    <Navbar />
    <div className="section no-pad-bot" id="index-banner">

      <br /><br />
      <Typist avgTypingDelay={40} cursor={{ hideWhenDone: true }}>
      <h1 className="header center hide-on-small-only" style={{color:"#4a148c"}}>Build choose-your-own-path experiences.</h1>

      <h1 className="header center hide-on-med-and-up" style={{color:"#4a148c"}}>Build choose-your-own-path experiences.</h1>
      </Typist>
      <div className="container">
        <div className="row center">
          <h5 className="header col s12 light">You focus on the story, we'll handle the technical stuff.</h5>
        </div>
        {!user.loggedIn &&
        <div className="row center">
        <SocialButton
          provider='google'
          appId='1048507317343-nvfritcgv71asc4ld7lg4gt421grq42j.apps.googleusercontent.com'
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          ><center>
          <GoogleLoginButton style={{width:"auto"}}/>
          </center>
            </SocialButton>
            </div>
          }
          {user.loggedIn &&
          <div className="row center">
        <Link to="/Create" id="download-button" className="tooltipped btn-large waves-effect waves-teal float-ease-in-out pulse" style={{background:"black"}} data-tooltip="It's free, I promise.">Create a story now</Link>
        </div>
      }

        <br /><br />

      </div>

    </div>


    <div className="container">

      <div className="section">

        <div className="row">
          <div className="col s12 m4">
            <div className="icon-block">
              <h2 className="center light-blue-text"><i className="material-icons">flash_on</i></h2>
              <h5 className="center">Speeds up development</h5>

              <p className="light">Current user id is {user.userID} with name {user.name} with type {user.type}.We did most of the heavy lifting for you to give you the ability to write stories with no coding knowledge.</p>
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
