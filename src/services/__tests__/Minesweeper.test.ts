import Minesweeper from "../Minesweeper";
import WebSocketInterface from "../WebSocketInterface";

let sendMock: jest.Mock = jest.fn();
jest.doMock('../WebSocketAdapter', () => {
    return jest.fn().mockImplementation(() => {
        return {
            send: sendMock
        };
    });
});

const webSocketAdapter = require('../WebSocketAdapter');
const wsAdapter: WebSocketInterface = new webSocketAdapter(new WebSocket('ws://localhost:1234'));

describe('Minesweeper', () => {
    beforeEach(() => {
        webSocketAdapter.mockClear();
        sendMock.mockClear();
    });

    test('Minesweeper.start with different args', ()=> {
        let ms: Minesweeper = new Minesweeper(wsAdapter);
        ms.start(1);
        expect(wsAdapter.send).toBeCalledTimes(1);
        expect(sendMock).toBeCalledWith('new 1');
        ms.start(2);
        expect(wsAdapter.send).toBeCalledTimes(2);
        expect(sendMock).toBeCalledWith('new 2');
        expect(() => {
            ms.start(5)
        }).toThrow(new Error("level doesn't match. Available levels: 1,2,3,4"));
    });

    test('openCell', ()=> {
        let ms = new Minesweeper(wsAdapter);
        ms.openCell(1, 2);
        expect(wsAdapter.send).toBeCalledTimes(1);
        expect(sendMock).toBeCalledWith('open 1 2');
    });

    test('map', ()=> {
        let ms = new Minesweeper(wsAdapter);
        ms.map();
        expect(wsAdapter.send).toBeCalledTimes(1);
        expect(sendMock).toBeCalledWith('map');
    });
});