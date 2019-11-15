export const  SHOW_OBJECT = "SHOW_OBJECT";

export function showObject(object, showObject) {
    return {type: SHOW_OBJECT, showObject: showObject, chosenObject: object}
};

export const FETCH_PLANETS = "FETCH_PLANETS";

export function fetchPlanets(planets, fetch) {
    return {type: FETCH_PLANETS, planets: planets, fetch: fetch}
};

export const FETCH_PEOPLE = "FETCH_PEOPLE";

export function fetchPeople(people, fetch) {
    return {type: FETCH_PEOPLE, people: people, fetch: fetch}
};

export const TOGGLE_FF = "TOGGLE_FF";

export function toggleFF(fetch) {
    return {type: TOGGLE_FF, fetch: fetch}
}