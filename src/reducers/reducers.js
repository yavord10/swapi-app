import { SHOW_PLANET, FETCH_PLANETS} from '../actions/actions';


const initialState = {
    showAll : false,
    chosenPlanet: {},
    showPlanet : false,
    fetchFinished: false,
    planets: {},
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_PLANET:
            return {
                showPlanet: action.showPlanet,
                chosenPlanet: action.chosenPlanet
            }
        case FETCH_PLANETS:
            return {
                planets: Object.assign(state.planets,action.planets),
                fetchFinished: action.fetch
            }
        default:
            return state
    };
};

export default rootReducer;