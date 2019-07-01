import React, {Component} from 'react';
import Redux from 'redux';
import {connect} from 'react-redux';
import {AppState} from '../reducers';
import {mineswepeer} from "../actions/mineswepeer";
import Minesweeper from "../services/Minesweeper";
import {LEVELS} from "../constants";
import { faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface HeaderProps {
    currentLevel: number,
    sound: boolean,
    changeLevel: (level: number) => void,
    toggleSound: (sound: boolean) => void,
}

interface HeaderState {
    game: Minesweeper,
    status: string
}

class Header extends Component<HeaderProps, HeaderState> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        return (
            <div className="header text-left">
                <select defaultValue={this.props.currentLevel.toString()} className="form-control text-left" onChange={(e) => this.props.changeLevel(parseInt(e.target.value))}>
                    {LEVELS.map( level =>
                        <option key={level} value={level}>Level {level}</option>
                    )}
                </select>
                <button className="btn" onClick={() => this.props.toggleSound(!this.props.sound)}>
                    <FontAwesomeIcon icon={this.props.sound? faVolumeUp : faVolumeMute} />
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        sound: state.minesweeper.sound,
        currentLevel: state.minesweeper.currentLevel
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>)=> {
    return {
        toggleSound: (sound: boolean) => dispatch(mineswepeer.toggleSound(sound)),
        changeLevel: (level: number) => dispatch(mineswepeer.changeLevel(level))
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(Header);