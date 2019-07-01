import minesweeperReducer, {initialState} from '../minesweeper';
import {OPEN_CELL, CHANGE_LEVEL, TOGGLE_SOUNDS} from '../../actions/action-types';

describe('minesweeper reducer', () => {
    test('with invalid action type', () => {
        expect(
            minesweeperReducer(initialState, {type: 'invalid', payload: {}})
        ).toEqual(initialState);
    });

    test('OPEN_CELL action', () => {
        let cells: string[][] = [
            ['0', '-'],
            ['-', '1']
        ];
        expect(
            minesweeperReducer(initialState, {type: OPEN_CELL, payload: cells})
        ).toEqual({sound: true, currentLevel: 1, cells: cells});
    });

    test('TOGGLE_SOUNDS action', () => {
        expect(
            minesweeperReducer(initialState, {type: TOGGLE_SOUNDS, payload: false})
        ).toEqual({sound: false, currentLevel: 1, cells: []});
    });

    test('SELECT_LEVEL action', () => {
        expect(
            minesweeperReducer(initialState, {type: CHANGE_LEVEL, payload: 2})
        ).toEqual({sound: true, cells: [], currentLevel: 2});
    })
});
