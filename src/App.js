import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from "./NumberOfEvents";
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      console.log(city, number);
      return { city, number };

    })
    return data;
  };


  render() {
    if (this.state.showWelcomeScreen)
      return (
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );
    return (
      <div className="App">
        <div className="header">
          <h1>Welcome to Meet</h1>
        </div>
        <p>This app allows you to search for events that are happening in your city, or all around the world. Choose the number of events you want to see and have a look at the charts too see how many and what kind of events are happening in which city. </p>
        {!navigator.onLine ? (<WarningAlert text='You are currently offline! Some features might not be availabele!' />) : (<div></div>)}
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumberOfEvents={(e) => this.updateNumberOfEvents(e)} />
        <h4>Events in each city</h4>
        <div className="data-vis-wrapper">
          <EventGenre events={this.state.events} />
          <ResponsiveContainer height={400}>
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20, }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#006c9a" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        <EventList events={this.state.events} />
      </div>
    );
  }


}

export default App;
