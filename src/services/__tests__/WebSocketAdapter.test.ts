import WS from "jest-websocket-mock";
import WebSocketAdapter from "../WebSocketAdapter";
import Observer from "../Observer";
import Observable from "../Observable";

describe('WebSocketAdapter', () => {
    const str: string = `map: 0000002□□□
        0011225□□□
        111□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□
        □□□□□□□□□□`;
    let server = new WS("ws://localhost:1234");

    test('addOnMessageObserver, send, onMessage', ()=> {
        let cbMap = (data: string[][]) => {
            expect(data.length).toBe(10);
        };
        let mapObserver: Observable = new Observer();
        mapObserver.subscribe(cbMap);

        let cbOpen = (res: string) => {
            expect(res).toEqual('You lose');
        };
        let openObserver: Observable = new Observer();
        openObserver.subscribe(cbOpen);

        let ws: WebSocketAdapter = new WebSocketAdapter(new WebSocket('ws://localhost:1234'));
        ws.addOnMessageObserver({map: mapObserver, open: openObserver});
        ws.send('map');
        ws.send('open 1 1');
        server.send(str); /*simulate socket server data sending */
        server.send('open: You lose'); /*simulate socket server data sending */
    });

    test('cellsToArray', ()=> {
        let ws: WebSocketAdapter = new WebSocketAdapter(new WebSocket('ws://localhost:1234'));
        ws.cellsToArray(str);
        expect(ws.getCells().length).toBe(10);
        expect(ws.getCells()[1][2]).toBe('1');
        expect(ws.getCells()[0][9]).toBe('-');
    });
});