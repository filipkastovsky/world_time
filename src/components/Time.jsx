import React, { Component } from 'react';

class Time extends Component {
  state = {
    timeZones: [],
    timeZonesFormatted: [],
    inputValue: '',

    // Response values
    dateTime: '',
    timeZone: '',
    utcOffset: '',
    dayOfWeekNUM: NaN,

    // Formatted response
    location: '',
    hours: '',
    minutes: '',
    utc: '',
    dayOfWeek: '',
    day: '',
    month: '',
    year: ''
  };

  APIURL = 'https://worldtimeapi.org/api/timezone/';

  fetchTimeZones = () => {
    fetch(this.APIURL)
      .then(res => res.json())
      .then(json => this.setState({ timeZones: json }))
      .then(this.formatTimeZones);
  };

  formatTimeZones = () => {
    const timeZonesFormatted = this.state.timeZones
      .join(';')
      .replace(/_/g, ' ')
      .split(';');

    this.setState({ timeZonesFormatted: timeZonesFormatted });
  };

  getInputValue = e => {
    this.setState({ inputValue: e.target.value });
  };

  resetInput = e => {
    const input = document.querySelectorAll('.input');
    input.forEach(input => (input.value = ''));
  };

  fetchTime = () => {
    fetch(`${this.APIURL}/${this.state.inputValue.replace(/ /g, '_')}`)
      .then(res => res.json())
      .then(({ datetime, timezone, utc_offset, day_of_week }) => {
        this.setState({
          dateTime: datetime,
          timeZone: timezone,
          utcOffset: utc_offset,
          dayOfWeekNUM: day_of_week
        });
        this.resetInput();
        this.formatResponse();
      })
      .catch(err => console.log(err));
    setInterval(async () => {
      fetch(`${this.APIURL}/${this.state.inputValue.replace(/ /g, '_')}`)
        .then(res => res.json())
        .then(({ datetime, timezone }) => {
          this.setState({
            dateTime: datetime,
            timeZone: timezone
          });

          this.formatResponse();
        })
        .catch(err => console.log(err));
    }, 60000);
  };

  formatResponse = () => {
    const getDayOfWeek = dayOfWeek => {
      switch (dayOfWeek) {
        case 0:
          return (dayOfWeek = 'Sunday');

        case 1:
          return (dayOfWeek = 'Monday');

        case 2:
          return (dayOfWeek = 'Tuesday');

        case 3:
          return (dayOfWeek = 'Wednesday');

        case 4:
          return (dayOfWeek = 'Thursday');

        case 5:
          return (dayOfWeek = 'Friday');

        case 6:
          return (dayOfWeek = 'Saturday');

        default:
          throw new Error('Invalid dayOfWeekNUM');
      }
    };
    // RESPONSE FORMAT 2019-08-05T03:02:15.979314-07:00

    let dateTime = this.state.dateTime.slice(0, -6);
    const location = this.state.timeZone.replace(/_/g, ' ');
    const minutes = dateTime.slice(14, 16);
    const hours = dateTime.slice(11, 13) + ':';

    const utc = `UTC${this.state.utcOffset}`;
    const dayOfWeek = getDayOfWeek(this.state.dayOfWeekNUM);
    const day = dateTime.slice(8, 10) + '.';
    const month = dateTime.slice(5, 7) + '.';
    const year = dateTime.slice(0, 4);

    this.setState({
      location,
      hours,
      minutes,
      utc,
      dayOfWeek,
      day,
      month,
      year
    });
  };

  componentDidMount() {
    this.fetchTimeZones();
  }
  render() {
    return (
      <div className="time-card">
        <input
          list="timezones"
          type="text"
          name="timezones"
          className="input"
          placeholder="Enter timezone"
          onChange={this.getInputValue}
        />
        <datalist id="timezones">
          {this.state.timeZonesFormatted.map(timeZone => (
            <option key={timeZone}>{timeZone}</option>
          ))}
        </datalist>
        <button onClick={this.fetchTime}>GO!</button>

        <div className="location">{this.state.location}</div>
        <div className="time">{`${this.state.hours}${this.state.minutes}`}</div>
        <div className="utc">{this.state.utc}</div>
        <div className="day-of-week">{this.state.dayOfWeek}</div>
        <div className="date">{`${this.state.day}${this.state.month}${
          this.state.year
        }`}</div>
      </div>
    );
  }
}

export default Time;
