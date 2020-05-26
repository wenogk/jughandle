import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import About from './components/About/About';
import Logout from './components/Logout';
import CreateStory from './components/storyBuilderComponents/createStory';
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
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
                <Route path="/create" component={CreateStory} />
                <Route path="/Logout" component={Logout} />
                </UserContext.Provider>
            </Switch>
        </main>
  );
}


export default App;
