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

  //This is the old componentDidMount function, that was used before getting the app ready for verification. If you comment out the new one and the WelcomeSceen component,
  //and activate this one the app runs again online and offline

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

  //This is the new async componentDidMount function. If this is active and the WelcomeScreen render is active the app doesn't load offline and loads an error in console log.
  //This is the state it is deployed right now.

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
    //commenting the next line out and activating the old component did mount function makes the app run again online and offline
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <div className="App">
        <h1>Welcome to Meet</h1>
        {!navigator.onLine ? (<WarningAlert text='You are currently offline! Some features might not be availabele!' />) : (<div></div>)}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)} />
        <EventList events={this.state.events} />
        {/* commenting the next line out and activating the old component did mount function makes the app run again online and offline */}
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }


}

export default App;
