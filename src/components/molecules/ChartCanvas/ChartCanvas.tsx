import React, { useRef, useEffect } from 'react';
import { drawBars } from '../../../helpers/canvasHelpers';
import { Bar } from '../../../models/Bar';

interface ChartCanvasProps {
    bars: Bar[];
    scale: number;
    offset: number;
    onWheel: (event: React.WheelEvent) => void;
    onMouseDown: (event: React.MouseEvent) => void;
}

const ChartCanvas: React.FC<ChartCanvasProps> = ({ bars, scale, offset, onWheel, onMouseDown }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                console.log("🚀 ~ useEffect ~ context:", context);
                console.log("🚀 ~ useEffect ~ bars:", bars);
                console.log("🚀 ~ useEffect ~ scale:", scale);
                console.log("🚀 ~ useEffect ~ offset:", offset);
                drawBars(context, bars, scale, offset);
            }
        }
    }, [bars, scale, offset]);

    return (
        <canvas
            ref={canvasRef}
            width={800}
            height={600}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
        />
    );
};

export default ChartCanvas;
