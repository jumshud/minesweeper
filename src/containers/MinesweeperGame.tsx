import React, {Component} from 'react';
import Redux from 'redux';
import Cell from '../components/Cell';
import {connect} from 'react-redux';
import {AppState} from '../reducers';
import {mineswepeer} from "../actions/mineswepeer";
import Observable from "../services/Observable";
import Observer from "../services/Observer";
import WebSocketAdapter from "../services/WebSocketAdapter";
import Minesweeper from "../services/Minesweeper";
import {SOUND_LOSER, SOUND_OPEN, SOUND_WINNER} from "../constants";
import Header from "./Header";
import GameResultModal from "../components/GameResultModal";

interface MinesweeperGameProps {
    currentLevel: number,
    sound: boolean,
    cells: string[][],
    openCell: (data: string[][]) => void,
    changeLevel: (level: number) => void
}

interface MinesweeperGameState {
    game: Minesweeper,
    status: StatusTypes,
    showModal: boolean
}

export enum StatusTypes {
    New,
    Open,
    Won,
    Lose
}

class MinesweeperGame extends Component<MinesweeperGameProps, MinesweeperGameState> {
    constructor(props: MinesweeperGameProps) {
        super(props);
        this.init();

        this.openCell = this.openCell.bind(this);
        this.startGame = this.startGame.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openObserver = this.openObserver.bind(this);
    }

    openCell(x: number, y: number) {
        if (this.state.status === StatusTypes.New || this.state.status === StatusTypes.Open) {
            this.state.game.openCell(x, y);
            this.state.game.map();
        }
    }

    componentDidMount(): void {
        this.startGame();
    }

    startGame() {
        this.state.game.start(this.props.currentLevel);
        this.state.game.map();
        this.setState({...this.state, status: StatusTypes.New, showModal: false});
    }

    componentDidUpdate(prevProps: Readonly<MinesweeperGameProps>, prevState: Readonly<MinesweeperGameState>, snapshot?: any): void {
        if (prevProps.currentLevel !== this.props.currentLevel) {
            this.startGame();
        }
    }

    private init() {
        let ws: WebSocketAdapter = new WebSocketAdapter(new WebSocket('wss://hometask.eg1236.com/game1/'));
        ws.addOnMessageObserver({map: this.mapObserver(), open: this.openObserver()});

        let game = new Minesweeper(ws);

        this.state = {
            game: game,
            status: StatusTypes.New,
            showModal: false
        }
    }

    private mapObserver(): Observable {
        let cbMap = (data: string[][]) => {
            this.props.openCell(data);
        };

        let mapObserver: Observable = new Observer();
        mapObserver.subscribe(cbMap);

        return mapObserver;
    }

    private openObserver(): Observable {
        let cbOpen = (res: string) => {
            let status: StatusTypes = this.state.status;
            let mp3Path: string = SOUND_OPEN;
            if (res === 'OK') {
                status = StatusTypes.Open;
            } else if (res === 'You lose') {
                status = StatusTypes.Lose;
                mp3Path = SOUND_LOSER;
            } else if (res.includes('You win')) {
                status = StatusTypes.Won;
                mp3Path = SOUND_WINNER;
            }
            this.setState({...this.state, status: status});
            if (this.props.sound) {
                const audio = new Audio(mp3Path);
                audio.play();
            }

            setTimeout(() => {
                if (status === StatusTypes.Lose || status === StatusTypes.Won) {
                    this.setState({...this.state, showModal: true})
                }
            }, 500);
        };

        let openObserver: Observable = new Observer();
        openObserver.subscribe(cbOpen);

        return openObserver;
    }

    closeModal() {
        this.setState({...this.state, showModal: false})
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> {
        let sClass: string = `minesweeper level${this.props.currentLevel}`;
        const cells: string[][] = this.props.cells;

        return (
            <section className={sClass}>
                <Header/>
                {cells && cells.map( (row, i) =>
                    <div key={i} className="d-flex flex-row justify-content-around">
                        {row.map((v, j) =>
                            <Cell key ={`${i}${j}`}
                                disabled={v !== '-'}
                                level={this.props.currentLevel}
                                x={j}
                                y={i}
                                openCell={this.openCell}
                                value={v === '-' ? '' : v}
                            />
                        )}
                    </div>
                    )
                }
                <GameResultModal
                    level={this.props.currentLevel}
                    status={this.state.status}
                    showModal={this.state.showModal}
                    changeLevel={this.props.changeLevel}
                    closeModal={this.closeModal}
                    playAgain={this.startGame}
                />
            </section>);
    }
}

const mapStateToProps = (state: AppState) => {
    return {
        cells: state.minesweeper.cells || [],
        currentLevel: state.minesweeper.currentLevel,
        sound: state.minesweeper.sound
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>)=> {
    return {
        openCell: (cells: string[][]) => dispatch(mineswepeer.openCell(cells)),
        changeLevel: (level: number) => dispatch(mineswepeer.changeLevel(level))
    };
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(MinesweeperGame);