import React, { Component } from 'react';
import Time from './components/Time';
import UserTimeZone from './components/UserTimeZone';
import arrow from './assets/Arrow.svg';

class App extends Component {
  render() {
    return (
      <div className="react-wrapper">
        <header>
          <h1>World Time</h1>
          <UserTimeZone />
          <a href="#page">
            <img src={arrow} alt="Go down" />
          </a>
        </header>
        <div className="time-container" id="page">
          <div className="bg" />
          <Time />
          <Time />
        </div>
        <footer>
      <a href="https://github.com/filipkastovsky/world_time">View on Github</a>
      <a href="https://filipkastovsky.github.io">by Filip Kaštovský</a>
    </footer>
      </div>
    );
  }
}

export default App;
