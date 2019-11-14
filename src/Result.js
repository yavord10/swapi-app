import React, { Component } from 'react';
import store from './store/store';
import img from '../public/149511-space-planet-Mercury-black_background.png';

export default class Result extends Component {
    constructor() {
        super();
        this.storeState = {};
        this.state = {
            planet: {}
        }
    }
    componentDidMount() {
        this.storeState = store.getState();
        this.setState({planet: this.storeState.chosenPlanet})
    }
    render() {
        return (
            <div className="row">
                <div className="col">
                    <img src={img} className="img-fluid planet-img" alt="planet"/>
                </div>
                <div className="col">
                    <div className="container planet-details">
                        <h1 className="my-3"><span className="green">Name :</span> {this.state.planet.name}</h1>
                        <h2 className="my-3"><span className="green">Terrain :</span> {this.state.planet.terrain}</h2>
                        <h2 className="my-3"><span className="green">Climate :</span> {this.state.planet.climate}</h2>
                        <h3 className="my-3"><span className="green">Rotation period :</span> {this.state.planet.rotation_period}</h3>
                        <h3 className="my-3"><span className="green">Created :</span> {this.state.planet.created}</h3>
                        <h3 className="my-3"><span className="green">Diameter :</span> {this.state.planet.diameter}</h3>
                    </div>
                </div>
            </div>
        )
    }
}
