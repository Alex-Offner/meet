import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    numberOfEvents: 32,
    events: [],
    locations: [],
    currentLocation: 'all',
    showWelcomeScreen: undefined

  }

  updateEvents = (location, numberOfEvents) => {
    if (this.mounted) {
      getEvents().then((events) => {
        const locationEvents = (location === 'all') ?
          events.slice(0, numberOfEvents)
          :
          events.filter((event) => event.location === location);
        this.setState({
          events: locationEvents.slice(0, numberOfEvents),
          currentLocation: location,
          numberOfEvents: numberOfEvents
        });
      });
    }
  }

  updateNumberOfEvents(eventNumber) {
    this.setState({ numberOfEvents: eventNumber });
    const { currentLocation } = this.state;
    this.updateEvents(currentLocation, eventNumber);
  }

  // componentDidMount() {
  //   const { numberOfEvents } = this.state;
  //   this.mounted = true;
  //   getEvents().then((events) => {
  //     if (this.mounted) {
  //       this.setState({
  //         events: events.slice(0, numberOfEvents),
  //         locations: extractLocations(events)
  //       });
  //     }
  //   });
  // }

  async componentDidMount() {
    this.mounted = true;
    const { numberOfEvents } = this.state;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, numberOfEvents), locations: extractLocations(events) });
        }
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <h1>Welcome to Alex2 Meet</h1>
        {!navigator.onLine ? (<WarningAlert text='You are currently offline! Some features might not be availabele!' />) : (<div></div>)}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }


}

export default App;
