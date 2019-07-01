import LocalStorage from "../utilities/LocalStorage";
import {LEVELS} from "../constants";
import {OPEN_CELL, CHANGE_LEVEL, TOGGLE_SOUNDS} from "../actions/action-types";

let sound = LocalStorage.getItem('sound') !== null ? LocalStorage.getItem('sound') : true;
const currentLevel: number = LocalStorage.getItem('currentLevel') || LEVELS[0];
export const initialState = {
    sound,
    currentLevel,
    cells: []
};

const minesweeperReducer = (state = initialState , action: any) => {
    switch (action.type) {
        case OPEN_CELL: { //@TODO remove if doesn't need
            return {...state, cells: action.payload};
        }
        case TOGGLE_SOUNDS: {
            LocalStorage.setItem('sound', action.payload);
            return {...state, sound: action.payload};
        }
        case CHANGE_LEVEL: {
            LocalStorage.setItem('currentLevel', action.payload);
            return {...state, currentLevel: action.payload};
        }
        default:
            return state;
    }
};

export default minesweeperReducer;
