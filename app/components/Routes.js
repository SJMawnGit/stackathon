import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './homePage'
import Scatter from './Scatter'
import HeadToHead from './HeadToHead'
const Routes = () => {
    return (
      <Router>
        <div>
          <main>
            <Route path = '/home' component = {HomePage}/>
            <Route path = '/scatter' component = {Scatter}/>
            <Route path = '/compare' component = {HeadToHead}/>
  
          </main>
        </div>
      </Router>
    );
};

export default Routes