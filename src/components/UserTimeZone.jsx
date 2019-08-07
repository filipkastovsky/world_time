import React, { Component } from 'react';

class UserTimeZone extends Component {
  state = {
    userTimeZone: '',

    timeZone: '',
    utcOffset: ''
  };

  APIURL = 'https://worldtimeapi.org/api/ip';

  fetchUserTimeZone = () => {
    fetch(`${this.APIURL}`)
      .then(res => res.json())
      .then(json => {
        this.setState({ userTimeZone: json });
        this.formatResponse();
      });
  };

  formatResponse = () => {
    const timeZone = this.state.userTimeZone.timezone;
    const utcOffset = this.state.userTimeZone.utc_offset;
    this.setState({ timeZone, utcOffset });
  };

  componentWillMount() {
    this.fetchUserTimeZone();
  }

  render() {
    return (
      <div className="user-time-zone">
        <div className="text">
          Your timezone is <strong>{this.state.timeZone}</strong> at UTC{' '}
          <strong>{this.state.utcOffset}</strong>
        </div>
      </div>
    );
  }
}

export default UserTimeZone;
