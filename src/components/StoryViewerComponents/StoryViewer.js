import React, {useContext} from 'react';
import { Link,  useParams } from "react-router-dom";
import { Redirect } from 'react-router';
import {UserContext} from '../../UserContext';
import Navbar from '../Navbar'
function StoryViewer() {
  const {user, setUser} = useContext(UserContext);
  let { storyID } = useParams();
  return (
    //<div className="navbar-fixed">
    <div>
    <Navbar />
    <h1>Viewer STORYID --> {storyID}</h1>
    </div>
    //</div>
  );
}

export default StoryViewer;
