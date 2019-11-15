import { SHOW_OBJECT, FETCH_PLANETS, TOGGLE_FF, FETCH_PEOPLE} from '../actions/actions';


const initialState = {
    showAll : false,
    chosenObject: {},
    showObject : false,
    fetchFinished: false,
    planets: {},
    people: {},
};

function rootReducer(state = initialState, action) {
    switch(action.type) {
        case SHOW_OBJECT:
            return {
                ...initialState,
                showObject: action.showObject,
                chosenObject: action.chosenObject
            }
        case FETCH_PLANETS:
            return {
                ...initialState,
                planets: Object.assign(state.planets, action.planets),
                fetchFinished: action.fetch
            }
        case FETCH_PEOPLE:
            return {
                ...initialState,
                people: Object.assign(state.people, action.people),
                fetchFinished: action.fetch
            }
        case TOGGLE_FF:
            return {
                ...initialState,
                fetchFinished: action.fetch
            }
        default:
            return state
    };
};

export default rootReducer;