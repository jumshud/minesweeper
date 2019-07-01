import { combineReducers } from 'redux';
import minesweeperReducer from './minesweeper';

const rootReducer = combineReducers({
    minesweeper: minesweeperReducer
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>
