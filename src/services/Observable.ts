export default interface Observable {
    observers: any[];
    observe(data: any): void;
    subscribe(cb: any): void;
    unsubscribe(cb: any): void;

}