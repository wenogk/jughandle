import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from "react-dom";
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Logout from './components/Logout';
import Edit from './components/Edit';
import CreateStory from './components/storyBuilderComponents/createStory';
import StoryViewer from './components/StoryViewerComponents/StoryViewer';
import {UserContext} from './UserContext';
import {useState} from 'react';
function App() {

  let val = {loggedIn:false};
  let localStorageUserString = localStorage.getItem('user');
  let localUser = JSON.parse(localStorageUserString);
  const [user, setUser] = useState(localUser || val);
  return (

    <main>
            <Switch>
                <UserContext.Provider value={{user, setUser}}>
                <Route path="/" exact ><Home /></Route>
                <Route path="/about" ><About /></Route>
                <Route path="/create"><CreateStory /></Route>
                <Route path="/Logout" ><Logout /></Route>
                <Route path="/edit/:storyID" strict exact ><Edit /></Route>
                <Route path="/view/:storyID" strict exact><StoryViewer /></Route>
                </UserContext.Provider>
            </Switch>
        </main>
  );
}


export default App;
