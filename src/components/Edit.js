import React, {useContext} from 'react';
import { Link,  useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import {UserContext} from '../UserContext';
import Navbar2 from './Navbar2'
function Edit() {
  const {user, setUser} = useContext(UserContext);
  let { storyID } = useParams();
  return (
    //<div className="navbar-fixed">
    <div>
    <Navbar2 />
    <h1>STORYID --> {storyID}</h1>
    </div>
    //</div>
  );
}

export default Edit;
