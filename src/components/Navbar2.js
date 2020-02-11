import React from 'react'
import { Link } from "react-router-dom";


function Navbar2() {
  return (
    //<div className="navbar-fixed">
    <nav className="nav-extended purple darken-2" role="navigation">
      <div className="nav-wrapper container"><Link id="logo-container" to="/" className="brand-logo">rivermouth</Link>
        <ul className="right hide-on-med-and-down">
          <li><Link to="/Create">Create</Link></li>
          <li><Link to="/Edit">Edit</Link></li>
          <li><Link to="/About">About</Link></li>


        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Create">Create</Link></li>
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
