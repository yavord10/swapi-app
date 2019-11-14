export const  SHOW_PLANET = "SHOW_PLANET";

export function showPlanet(planet, showPlanet) {
    return {type: SHOW_PLANET, showPlanet: showPlanet, chosenPlanet: planet}
};

export const FETCH_PLANETS = "FETCH_PLANETS";

export function fetchPlanets(planets, fetch) {
    return {type: FETCH_PLANETS, planets: planets, fetch: fetch}
};

export const CHOOSE_PLANET = "CHOOSE_PLANET";

export function choosePlanet(planet) {
    return {type: CHOOSE_PLANET, chosenPlanet: planet}
}