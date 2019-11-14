import React, { Component } from 'react';
import logo from '../public/star_wars_logo_PNG34.png';
import store from './store/store';
import { showPlanet } from './actions/actions';
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
            showAll : false,
            fetchFinished: false
        }
    };
    handleInput = (e) => {
        store.dispatch(showPlanet(false));
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
        if (this.stateStore.showPlanet === true) {
            store.dispatch(showPlanet(this.state.planet, false));
        } else {
            store.dispatch(showPlanet(this.state.planet, true));
        }
        this.stateStore = store.getState();
    };
    showAll = () => {
        console.log(this.stateStore)
        this.handleFetchPlanet();
        this.setState({hasClicked: false}) 
        if (this.state.showAll === true) {
            this.setState({showAll: false})
        } else {
            this.setState({showAll: true})
        }       
        this.stateStore = store.getState();
        console.log(this.stateStore.showAll)
        console.log(this.state.planets)
    };
    showDetails = (planet) => {
        this.setState({showAll: false})
        this.setState({planet: planet});
        store.dispatch(showPlanet(planet, true));
    }
    componentDidMount() {
        window.addEventListener('click', (event) => {
            event.preventDefault();
        })
        console.log('Before:', this.stateStore);
        store.subscribe(() => {
            this.stateStore = store.getState();
            console.log('state changed')
            if (this.state.fetchFinished === false) {
                this.setState({fetchFinished: this.stateStore.fetchFinished})
            }
            console.log(this.stateStore)
        })
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
                                    <label className="title mt-3">Character</label>
                                    <div className="input-field row">
                                    <div className="col-10"><input onChange={this.handleInput} type="input" className="form-control" placeholder="Your Favourite Character"></input></div>
                                    <div className="col-2"><button className="btn"><i className="fas fa-rocket"></i></button></div>
                                    </div>
                                    <div>
                                        <label className="title mt-5 mx-auto">Planet</label>
                                        <div className="mx-auto"><button className="button mb-5 showall" onClick={this.showAll}>Show all</button></div>
                                        <div className={this.state.showAll ? "row planets-show" : "planets-show row noshow"}>
                                            {this.state.planets ? this.state.planets.map((planet) => {
                                                return <div className="col-4" key={this.state.planets.indexOf(planet)}><Link to={`/result/${planet.name}`}><button onClick={() => this.showDetails(planet)}className="planet mx-auto mb-5">{planet.name}</button></Link></div>
                                            }) : <div className="planet mx-auto mb-5">planet data is unavaialable</div>}
                                        </div>
                                    </div>
                                    <div className="input-field row">
                                    <div className="col-10"><input value={this.inputValue} onChange={this.handleInput} type="input" className="form-control" placeholder="Your Favourite Planet"></input></div>
                                    <div className="col-2"><button onClick={this.handleFetchPlanet} className="btn"><i className="fas fa-rocket"></i></button></div>
                                    </div>
                                    <label className="title mt-5">Starship</label>
                                    <div className="input-field row">
                                    <div className="col-10"><input onChange={this.handleInput} type="input" className="form-control" placeholder="Your Favourite Starship"></input></div>
                                    <div className="col-2"><button className="btn"><i className="fas fa-rocket"></i></button></div>
                                    </div>
                                </form>
                            </div>
                            {this.state.planets ? 
                            <div className={this.stateStore.showPlanet ? "container" : "container noshow"}>
                                <h1 className="my-3"><span className="green">Name :</span> {this.state.planet.name}</h1>
                                <h2 className="my-3"><span className="green">Terrain :</span> {this.state.planet.terrain}</h2>
                                <h2 className="my-3"><span className="green">Climate :</span> {this.state.planet.climate}</h2>
                                <h3 className="my-3"><span className="green">Rotation period :</span> {this.state.planet.rotation_period}</h3>
                                <h3 className="my-3"><span className="green">Created :</span> {this.state.planet.created}</h3>
                                <h3 className="my-3"><span className="green">Diameter :</span> {this.state.planet.diameter}</h3>
                            </div> :
                            <h1>planet data is unavailable</h1>
                            }
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
