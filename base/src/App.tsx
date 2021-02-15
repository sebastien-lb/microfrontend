import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { Switch, Route, Link } from "react-router-dom";
import { MicroFrontEnd } from "./components/MicroFrontEnd";

function App() {
  return (
    <div className="App">
      <h1>Base h1</h1>
      <Link to={"/micro1"}>Micro 1</Link>
      <Switch>
        <Route
          path={"/micro1"}
          render={({ history }) => (
            <MicroFrontEnd history={history} name="Micro1" host={"micro1"} />
          )}
        />
        <Route
          path={"/micro2"}
          render={({ history }) => (
            <MicroFrontEnd history={history} name="Micro2" host={"micro2"} />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
