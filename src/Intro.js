import React, { Component } from 'react';
import logo from '../public/star_wars_logo_PNG34.png';
import store from './store/store';
import { showObject } from './actions/actions';
import { Link } from 'react-router-dom';

export default class Intro extends Component {
    constructor() {
        super();
        this.planetArray = [];
        this.stateStore = store.getState();
        this.inputValue = '';
        this.state = {
            inputValue: "",
            planets: [],
            planet : {},
            people : [],
            showPlanets : false,
            showPeople: false,
            fetchFinished: false
        }
    };
    handleInput = (e) => {
        store.dispatch(showObject(false));
        this.stateStore = store.getState();
        this.inputValue = e.target.value.toLowerCase();
        this.setState(() => {return {inputValue: this.inputValue}});
    };
    handleFetchPlanet = () => {
        console.log(this.stateStore.planets)
        this.inputValue = "";
        if (this.state.planets.length === 0) {
            this.stateStore = store.getState();
            this.setState({planets: this.stateStore.planets.results});
        }
        for (let planet in this.state.planets) {
            let planetName = this.state.planets[planet].name.toLowerCase();
            if (this.state.inputValue !== '') {
                if (planetName === this.state.inputValue) {
                    this.setState({planet: this.state.planets[planet]})
                    console.log(this.state.planet)
                    console.log(this.state.planets[planet])
                }
            }
        }
        if (this.stateStore.showObject === true) {
            store.dispatch(showObject(this.state.planet, false));
        } else {
            store.dispatch(showObject(this.state.planet, true));
        }
        this.stateStore = store.getState();
    };
    showPlanets = (e) => {
        console.log(this.stateStore)
        this.handleFetchPlanet();
        this.setState({hasClicked: false}) 
        if (this.state.showPlanets === true) {
            this.setState({showPlanets: false})
        } else {
            this.setState({showPlanets: true})
        }       
    };
    handleFetchPeople = () => {
        console.log(this.stateStore.people)
        this.inputValue = "";
        if (this.state.people.length === 0) {
            this.stateStore = store.getState();
            this.setState({people: this.stateStore.people.results});
        }
        for (let people in this.state.people) {
            let peopleName = this.state.people[people].name.toLowerCase();
            if (this.state.inputValue !== '') {
                if (peopleName === this.state.inputValue) {
                    this.setState({people: this.state.people[people]})
                    console.log(this.state.people)
                    console.log(this.state.people[people])
                }
            }
        }
        if (this.stateStore.showObject === true) {
            store.dispatch(showObject(this.state.people, false));
        } else {
            store.dispatch(showObject(this.state.people, true));
        }
        this.stateStore = store.getState();
    };
    showPeople = (e) => {
        console.log(this.stateStore)
        this.handleFetchPeople();
        this.setState({hasClicked: false}) 
        if (this.state.showPeople === true) {
            this.setState({showPeople: false})
        } else {
            this.setState({showPeople: true})
        }       
    };
    showDetails = (planet) => {
        this.setState({showAll: false})
        this.setState({planet: planet});
        store.dispatch(showObject(planet, true));
    };
    componentDidMount() {
        window.addEventListener('click', (event) => {
            event.preventDefault();
        })
        store.subscribe(() => {
            this.stateStore = store.getState();
            console.log('state changed')
            if (this.state.fetchFinished === false) {
                this.setState({fetchFinished: this.stateStore.fetchFinished})
            }
            console.log(this.stateStore)
            console.log(this.state.fetchFinished)
        })
        this.setState({fetchFinished: this.stateStore.fetchFinished})
    }
    render() {
        return (
            <div>
                <div className="App">
                    <div className="main-feature">
                        <div className="container">
                            <div className="App-header">
                                <img src={logo} className="App-logo mt-5" alt="logo" />
                            </div>
                            <div className={this.state.fetchFinished ? "form-field mt-5 container" : "form-field mt-5 container noshow"}>
                                <div className="title-header mx-auto">Explore</div>
                                <form className="form-group mb-3 mx-auto">
                                    <div>
                                        <label className="title mt-5 mx-auto">Character</label>
                                        <div className="mx-auto"><button className="button mb-5 showall" onClick={this.showPeople}>Show all</button></div>
                                        <div className={this.state.showPeople ? "row planets-show" : "planets-show row noshow"}>
                                            {this.state.people ? this.state.people.map((people) => {
                                                return <div className="col-4" key={this.state.people.indexOf(people)}><Link to={`/result/${people.name}`}><button onClick={() => this.showDetails(people)}className="planet mx-auto mb-5">{people.name}</button></Link></div>
                                            }) : <div className="planet mx-auto mb-5">planet data is unavaialable</div>}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="title mt-5 mx-auto">Planet</label>
                                        <div className="mx-auto"><button className="button mb-5 showall" onClick={this.showPlanets}>Show all</button></div>
                                        <div className={this.state.showPlanets ? "row planets-show" : "planets-show row noshow"}>
                                            {this.state.planets ? this.state.planets.map((planet) => {
                                                return <div className="col-4" key={this.state.planets.indexOf(planet)}><Link to={`/result/${planet.name}`}><button onClick={() => this.showDetails(planet)}className="planet mx-auto mb-5">{planet.name}</button></Link></div>
                                            }) : <div className="planet mx-auto mb-5">planet data is unavaialable</div>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className={this.state.fetchFinished ? "row container loading-main mx-auto mt-5 noshow" : "row container loading-main mx-auto mt-5"}>
                                <div className={this.state.fetchFinished ? "loading-screen one mx-auto mt-5 noshow" : "loading-screen one mt-5 mx-auto"}>
                                    L
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen two mx-auto mt-5 noshow" : "loading-screen two mt-5 mx-auto"}>
                                    o
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen three mx-auto mt-5 noshow" : "loading-screen three mt-5 mx-auto"}>
                                    a
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen four mx-auto mt-5 noshow" : "loading-screen four mt-5 mx-auto"}>
                                    d
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen five mx-auto mt-5 noshow" : "loading-screen five mt-5 mx-auto"}>
                                    i
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen six mx-auto mt-5 noshow" : "loading-screen six mt-5 mx-auto"}>
                                    n
                                </div>
                                <div className={this.state.fetchFinished ? "loading-screen seven mx-auto mt-5 noshow" : "loading-screen seven mt-5 mx-auto"}>
                                    g
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
