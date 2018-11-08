import React, { Component } from 'react';
import {Switch,Route} from "react-router-dom";
import HScroll from "./demo/h-scroll";
import myCarousel from "./demo/carousel"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/hscroll" component={HScroll} />
            <Route path="/carousel" component={myCarousel}/>
        </Switch>
      </div>
    );
  }
}

export default App;
