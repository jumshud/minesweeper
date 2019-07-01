import Observable from "./Observable";

export default class Observer implements Observable{
    observers: any[] = [];

    observe(data: any): void {
        this.observers.forEach(observer => observer(data))
    }

    subscribe(cb: any): void {
        this.observers.push(cb);
    }

    unsubscribe(cb: any): void {
        const index = this.observers.indexOf(cb);
        if(index > -1) {
            this.observers.splice(index, 1);
        }
    }

}