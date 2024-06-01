export class Bar {
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    time: number;

    constructor(open: number, high: number, low: number, close: number, volume: number, time: number) {
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.volume = volume;
        this.time = time;
    }
}
