import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import {UserContext} from '../UserContext';

function addScript(src){
  var tag = document.createElement('script');
  tag.async = true;
  tag.src = src;
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(tag);
}

const scriptUrl = "https://rivermouth.herokuapp.com/js/storyBuilder.js"

function Navbar2() {
  const {user, setUser} = useContext(UserContext);
  addScript(scriptUrl)
  return (
    //<div className="navbar-fixed">
    <nav className="nav-extended purple darken-2" role="navigation">
      <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo">rivermouth</Link>
      <ul className="right hide-on-med-and-down">

        <li><Link to="/about">About</Link></li>
        {user.loggedIn &&
          <li><Link to="/">{(user.name).split(' ')[0]}</Link></li>
        }
        {user.loggedIn &&
          <li><Link to="/logout">Logout</Link></li>
        }
      </ul>

      <ul id="nav-mobile" className="sidenav">

        <li><Link to="/about">About</Link></li>
        {user.loggedIn &&
          <li><Link to="/">Your stories</Link></li>
        }
        {user.loggedIn &&
          <li><Link to="/logout">Logout</Link></li>
        }
      </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
      <div class="nav-content ">
      <ul className="tabs tabs-transparent">
      <li className="tab col s3 " style={{width:"33.3%"}}><a className="active" href="#treeVisMode">Tree builder</a></li>

      <li className="tab col s3" style={{width:"33.3%"}}><a  href="#previewMode">Preview</a></li>

        <li className="tab col s3" style={{width:"33.3%"}}><a href="#storyMode">Simple Builder</a></li>

      </ul>
      </div>
    </nav>
    //</div>
  );
}

export default Navbar2;
