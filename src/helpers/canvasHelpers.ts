import { Bar } from '../models/Bar';

export const drawBars = (
    context: CanvasRenderingContext2D,
    bars: Bar[],
    scale: number,
    offset: number
) => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.strokeStyle = 'black';
    context.fillStyle = 'green';

    // const barWidth = 5;
    // const padding = 2;

    const barWidth = 5 * scale;
    const padding = 2 * scale;

    const maxY = Math.max(...bars.map(bar => Math.max(bar.open, bar.close, bar.high, bar.low)));
    const minY = Math.min(...bars.map(bar => Math.min(bar.open, bar.close, bar.high, bar.low)));

    bars.forEach((bar, index) => {
        const x = (index * (barWidth + padding)) + offset;
        const yOpen = context.canvas.height - ((bar.open - minY) / (maxY - minY)) * context.canvas.height;
        const yClose = context.canvas.height - ((bar.close - minY) / (maxY - minY)) * context.canvas.height;
        const yHigh = context.canvas.height - ((bar.high - minY) / (maxY - minY)) * context.canvas.height;
        const yLow = context.canvas.height - ((bar.low - minY) / (maxY - minY)) * context.canvas.height;

        context.beginPath();
        context.moveTo(x, yHigh);
        context.lineTo(x, yLow);
        context.stroke();

        const rectHeight = Math.abs(yOpen - yClose);
        const rectY = Math.min(yOpen, yClose);
        context.fillRect(x - (barWidth / 2), rectY, barWidth, rectHeight);
    });
};
