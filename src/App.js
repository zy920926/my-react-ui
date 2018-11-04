import React, { Component } from 'react';
import {Switch,Route} from "react-router-dom";
import HScroll from "./demo/h-scroll"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/hscroll" component={HScroll} />
          </Switch>
      </div>
    );
  }
}

export default App;
