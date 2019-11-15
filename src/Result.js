import React, { Component } from 'react';
import store from './store/store';
import img from '../public/149511-space-planet-Mercury-black_background.png';
import imgPeople from '../public/91Au8mepKtL._SX425_.png'
import { Link } from 'react-router-dom';
import { toggleFF } from './actions/actions';

export default class Result extends Component {
    constructor() {
        super();
        this.storeState = {};
        this.state = {
            planet: {},
            people: {}
        }
    }
    backToHome = () => {
        store.dispatch(toggleFF(true))
    };
    componentDidMount() {
        this.storeState = store.getState();
        if (this.storeState.chosenObject.climate === undefined) {
            this.setState({people: this.storeState.chosenObject})
            console.log('people')
        } else {
            this.setState({planet: this.storeState.chosenObject})
            console.log('planet')
        }
    }
    render() {
        return (
            <div className="row">
                <div className="col">
                    <div className="container">
                        {this.state.planet.climate === undefined ? <img src={imgPeople} className="img-fluid people-img" alt="planet"/> : 
                        <img src={img} className="img-fluid planet-img" alt="planet"/>}
                    </div>
                </div>
                <div className="col">
                    <div className={this.state.planet.climate === undefined ? "container planet-details noshow" : "container planet-details"}>
                        <h1 className="my-3"><span className="green">Name :</span> {this.state.planet.name}</h1>
                        <h2 className="my-3"><span className="green">Terrain :</span> {this.state.planet.terrain}</h2>
                        <h2 className="my-3"><span className="green">Climate :</span> {this.state.planet.climate}</h2>
                        <h3 className="my-3"><span className="green">Rotation period :</span> {this.state.planet.rotation_period}</h3>
                        <h3 className="my-3"><span className="green">Orbital period :</span> {this.state.planet.orbital_period}</h3>
                        <h3 className="my-3"><span className="green">Diameter :</span> {this.state.planet.diameter}</h3>
                        <h3 className="my-3"><span className="green">Gravity :</span> {this.state.planet.gravity}</h3>
                        <h3 className="my-3"><span className="green">Population :</span> {this.state.planet.population}</h3>
                    </div>
                    <div className={this.state.people.name === undefined ? "container planet-details noshow" : "container planet-details"}>
                        <h1 className="my-3"><span className="green">Name :</span> {this.state.people.name}</h1>
                        <h2 className="my-3"><span className="green">Height :</span> {this.state.people.height}</h2>
                        <h2 className="my-3"><span className="green">Mass :</span> {this.state.people.mass}</h2>
                        <h3 className="my-3"><span className="green">Hair color :</span> {this.state.people.hair_color}</h3>
                        <h3 className="my-3"><span className="green">Skin color :</span> {this.state.people.skin_color}</h3>
                        <h3 className="my-3"><span className="green">Eye color:</span> {this.state.people.eye_color}</h3>
                        <h3 className="my-3"><span className="green">Gender :</span> {this.state.people.gender}</h3>
                        <h3 className="my-3"><span className="green">Birth year :</span> {this.state.people.birth_year}</h3>
                    </div>
                    <div className="back-btn-ctn row">
                        <div className="ml-auto"><Link to="/"><button className="button back-btn" onClick={this.backToHome}>Back</button></Link></div>
                    </div>
                </div>
            </div>
        )
    }
}
