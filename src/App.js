import React from 'react';
import logo from './logo.svg';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
function App() {
  return (
    <main>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/about" component={About} />
                <Route path="/create" component={CreateStory} />
            </Switch>
        </main>
  );
}


export default App;
