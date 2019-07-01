import WebSocketInterface from "./WebSocketInterface";
import Observable from "./Observable";

export type OnMessageObserver = {
    open: Observable;
    map: Observable
}

export default class WebSocketAdapter implements WebSocketInterface {
    ws: WebSocket;
    private isOpen: boolean = false;
    private cells: any[] = [];
    private onMessageObserver!: OnMessageObserver;

    static CMD_MAP = 'map';
    static CMD_NEW = 'new';
    static CMD_OPEN = 'open';

    constructor(ws: WebSocket) {
        this.ws = ws;
        this.init();
    }

    private init() {
        this.ws.onopen = () => {
            this.isOpen = true;
        };

        this.ws.onmessage = (evt) => this.onMessage(evt.data);

        this.ws.onclose = () => {
            this.isOpen = false;
        };
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    isConnected = async () => {
        if (this.ws.readyState === WebSocket.OPEN) {
            return true;
        } else {
            await this.delay(200).then(this.isConnected);
        }
    };

    onMessage(data: string) {
        const command: string = data.split(':')[0];
        switch (command) {
            case WebSocketAdapter.CMD_MAP: {
                this.cellsToArray(data);
                if (this.onMessageObserver && this.onMessageObserver.map) {
                    this.onMessageObserver.map.observe(this.getCells());
                }
                break;
            }
            case WebSocketAdapter.CMD_NEW: {
                break;
            }
            case WebSocketAdapter.CMD_OPEN: {
                if (this.onMessageObserver && this.onMessageObserver.open) {
                    this.onMessageObserver.open.observe(data.split(':')[1].trim());
                }
                break;
            }
        }
    }

    cellsToArray(str: string) {
        this.cells = [];
        const cells: string[] = str.split(':')[1].trim().split('\n');
        for (let cell of cells) {
            cell = cell.trim().replace(/□/g, '-');
            this.cells.push(cell.split(''))
        }
    }

    addOnMessageObserver(omObserver: OnMessageObserver) {
        this.onMessageObserver = omObserver;
    }

    getCells(): string[] {
        return this.cells;
    }

    send(message: string) {
        this.isConnected().then(() => {
            this.ws.send(message);
        });
    }
}