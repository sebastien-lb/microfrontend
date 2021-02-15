import React from "react";
import logo from "./logo.svg";
import "./App.css";

interface OwnProps {
  history: any;
}

type Props = OwnProps;

const App: React.FC<Props> = ({ history }) => {
  return (
    <div className="App">
      <h1>MicroFrontend 1 !!!!</h1>
    </div>
  );
};

export default App;
