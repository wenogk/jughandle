import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from "react-dom";
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Logout from './components/Logout';
import EditStory from './components/storyBuilderComponents/EditStory';
import CreateStory from './components/storyBuilderComponents/createStory';
import StoryViewer from './components/StoryViewerComponents/StoryViewer';
import {UserContext} from './UserContext';
import { ProtectedRoute } from "./components/ProtectedRoute";
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
                <ProtectedRoute path="/create" component={CreateStory} />
                <ProtectedRoute path="/Logout" component={Logout} />
                <ProtectedRoute path="/edit/:storyID" strict exact component={EditStory} />
                <Route path="/view/:storyID" strict exact><StoryViewer /></Route>
                </UserContext.Provider>
            </Switch>
        </main>
  );
}


export default App;
