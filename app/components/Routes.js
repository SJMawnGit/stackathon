import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './homePage'
import Scatter from './Scatter'
// import Maps from './Maps'
const Routes = () => {
    return (
      <Router>
        <div>
          <main>
            <Route path = '/home' component = {HomePage}/>
            {/* <Route path = '/maps' component = {Maps}/> */}
            <Route path = '/scatter' component = {Scatter}/>
  
          </main>
        </div>
      </Router>
    );
};

export default Routes