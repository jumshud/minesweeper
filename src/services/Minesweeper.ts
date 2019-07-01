import WebSocketInterface from "./WebSocketInterface";
import {LEVELS} from "../constants";

export default class Minesweeper {
    private ws: WebSocketInterface;

    constructor(ws: WebSocketInterface) {
        this.ws = ws;
    }

    start(level: number) {
        if (LEVELS.indexOf(level) === -1) {
            throw new Error(`level doesn't match. Available levels: ${LEVELS.toString()}`);
        }
        this.ws.send('new ' + level.toString());
    }

    openCell(x: number, y: number) {
        const cmd = 'open ' + x.toString() + ' ' + y.toString();
        this.ws.send(cmd);
    }

    map() {
        this.ws.send('map');
    }
}