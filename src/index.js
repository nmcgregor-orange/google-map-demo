/** @jsx jsx */
import { Global, css, jsx } from '@emotion/core';
import React from "react";
import ReactDOM from "react-dom";
import MainLayout from './MainLayout.js';

class App extends React.Component {

  render() {
    return (
      <div >
        <React.Fragment>
          <Global/>
          <MainLayout/>
        </React.Fragment>
      </div>);
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
