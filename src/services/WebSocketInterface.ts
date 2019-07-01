export default interface WebSocketInterface {
    ws: WebSocket;
    send(message: string): void;
}