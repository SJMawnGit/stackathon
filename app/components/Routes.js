import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomePage from './homePage'
// import Maps from './Maps'
const Routes = () => {
    return (
      <Router>
        <div>
          <main>
            <Route path = '/home' component = {HomePage}/>
            {/* <Route path = '/maps' component = {Maps}/> */}
  
          </main>
        </div>
      </Router>
    );
};

export default Routes