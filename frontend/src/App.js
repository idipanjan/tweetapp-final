import { useEffect, useState } from "react";
import './App.css';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/Landing";
import { Switch, Route } from "react-router-dom";


export const config = {
  endpoint: `https://www.tweetapp.ml/api/v1/tweets`,
};


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
