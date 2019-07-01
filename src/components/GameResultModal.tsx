import Modal from "react-bootstrap4-modal";
import React from "react";
import {StatusTypes} from "../containers/MinesweeperGame";
import {LEVELS} from "../constants";

interface GameResultModalProps {
    showModal: boolean,
    status: StatusTypes,
    level: number,
    closeModal: () => void,
    playAgain: () => void,
    changeLevel: (level: number) => void
}

const GameResultModal: React.FC<GameResultModalProps> = (props) => {
    const {status, showModal, level} = props;
    const getTitle = () => {
        switch (status) {
            case StatusTypes.Won: {
                return 'You won!'
            }
            case StatusTypes.Lose: {
                return  'You lose!'
            }
        }
    };

    const changedLevel: number = (level === LEVELS[LEVELS.length-1]) ? level - 1 : level + 1;

    return (
        <Modal dialogClassName="modal-sm" visible={showModal} onClickBackdrop={()=> props.playAgain()}>
            <div className="modal-body">
                <h4 className="text-success mb-3">{getTitle()}</h4>
                <button
                    onClick={() => props.playAgain()}
                    className="btn btn-success mr-4">
                      {status === StatusTypes.Won ? 'Play again' :'Try again'}
                </button>
                <button
                    onClick={() => {props.changeLevel(changedLevel); props.closeModal()}}
                    className="btn btn-success">
                      {level === LEVELS[LEVELS.length-1] ? 'Previous' :'Next'} level
                </button>
            </div>
        </Modal>
    )
};

export default GameResultModal;