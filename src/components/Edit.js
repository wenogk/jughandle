import React, {useContext} from 'react';
import { Link,  useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import {UserContext} from '../UserContext';

function Edit() {
  const {user, setUser} = useContext(UserContext);
  let { storyID } = useParams();
  return (
    //<div className="navbar-fixed">
    <div>
    <nav className="purple darken-2" role="navigation">
      <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo">rivermouth</Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/Create">Create</Link></li>
          <li><Link to="/Edit">Edit</Link></li>
          <li><Link to="/About">About</Link></li>
          {user.loggedIn &&
            <li><Link to="/Logout">Logout</Link></li>
          }
        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Create">Create</Link></li>
          {user.loggedIn &&
            <li><Link to="/Logout">Logout</Link></li>
          }
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
    <h1>STORYID --> {storyID}</h1>
    </div>
    //</div>
  );
}

export default Edit;
