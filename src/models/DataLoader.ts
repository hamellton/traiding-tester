import { Bar } from './Bar';

export class DataLoader {
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async fetchData(): Promise<Bar[]> {
        const response = await fetch(this.url);
        const data = await response.json();
        const bars: Bar[] = data.flatMap((chunk: any) => {
            const chunkStart = chunk.ChunkStart;
            return chunk.Bars.map((item: any) => {
                return new Bar(
                    item.Open,
                    item.High,
                    item.Low,
                    item.Close,
                    item.TickVolume,
                    chunkStart + item.Time
                );
            });
        });
        return bars;
    }
}
