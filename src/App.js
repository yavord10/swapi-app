import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Intro from './Intro';
import Result from './Result';
import store from './store/store';
import { fetchPlanets,fetchPeople } from './actions/actions';

class App extends Component {
  constructor() {
    super();
    this.stateStore = store.getState();
    fetch("https://swapi.co/api/planets/")
      .then(res => res.json())
      .then(res => {
        console.log(this.stateStore)
        store.dispatch(fetchPlanets(res, true))
        this.stateStore = store.getState();
        console.log('planets fetched')
        console.log(this.stateStore);
      })
      .catch((err) => {
        console.log(err)
      })
    fetch("https://swapi.co/api/people/")
      .then(res => res.json())
      .then(res => {
        console.log(this.stateStore)
        store.dispatch(fetchPeople(res, true))
        this.stateStore = store.getState();
        console.log('planets fetched')
        console.log(this.stateStore);
      })
      .catch((err) => {
        console.log(err)
      })
  };
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Intro} />
          <Route path="/result" component={Result} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
