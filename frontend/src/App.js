import React from "react";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
import Homepage from "./Pages/Homepage";
import Report from "./Pages/Report";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={Homepage} />
      <Route exact path="/queries" component={Chatpage} />
      <Route exact path="/report" component={Report} />
    </div>
  );
};

export default App;
