import { success } from './index';
import {CHANGE_LEVEL, OPEN_CELL, TOGGLE_SOUNDS} from "./action-types";
import Redux from "redux";

/**
 * Open a cell of game
 *
 * @param cells
 * @return {Function}
 */
function openCell(cells: string[][]): Redux.Dispatch<any> {
    return dispatch => dispatch(success(cells, OPEN_CELL));
}

/**
 * Turn on or off the game sounds
 *
 * @param sound
 * @return {Function}
 */
function toggleSound(sound: boolean): Redux.Dispatch<any> {
    return dispatch => dispatch(success(sound, TOGGLE_SOUNDS));
}

/**
 * Change level of game
 *
 * @param level
 * @return {Function}
 */
function changeLevel(level: number): Redux.Dispatch<any> {
    return dispatch => dispatch(success(level, CHANGE_LEVEL));
}

export const mineswepeer = {
    openCell,
    toggleSound,
    changeLevel
};
