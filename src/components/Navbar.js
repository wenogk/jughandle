import React from 'react'

function Navbar() {
  return (
    <nav className="purple darken-2" role="navigation">
      <div className="nav-wrapper container"><a id="logo-container" href="/" className="brand-logo">Storify</a>
        <ul className="right hide-on-med-and-down">
          <li><a href="/">Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/Create">Create</a></li>

        </ul>

        <ul id="nav-mobile" className="sidenav">
          <li><a href="/">Home</a></li>
          <li><a href="/About">About</a></li>
          <li><a href="/Create">Create</a></li>
        </ul>
        <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
      </div>
    </nav>
  );
}

export default Navbar;
