import React, { useRef, useEffect, useState } from 'react';
import { drawBars } from '../../../helpers/canvasHelpers';
import { Bar } from '../../../models/Bar';

interface ChartCanvasProps {
    bars: Bar[];
    scale: number;
    offset: { x: number; y: number };
    onWheel: (event: React.WheelEvent) => void;
    onMouseDown: (event: React.MouseEvent) => void;
    onMouseMove: (event: React.MouseEvent) => void;
    onMouseUp: () => void;
    updatePriceScaleCursor: (mouseX: number, mouseY: number) => void;
}

const ChartCanvas: React.FC<ChartCanvasProps> = ({
    bars,
    scale,
    offset,
    onWheel,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    updatePriceScaleCursor
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: window.innerWidth - 60, height: window.innerHeight });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                context.clearRect(0, 0, dimensions.width, dimensions.height);
                drawBars(context, bars, scale, offset);
            }
        }
    }, [bars, scale, offset, dimensions]);

    useEffect(() => {
        const handleResize = () => {
            setDimensions({ width: window.innerWidth - 60, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault();
        onWheel(event);

        const boundingRect = canvasRef.current?.getBoundingClientRect();
        if (!boundingRect) return;
        const mouseX = event.clientX - boundingRect.left;
        const mouseY = event.clientY - boundingRect.top;

        updatePriceScaleCursor(mouseX, mouseY);
    };

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onWheel={handleWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            style={{ display: 'block', width: dimensions.width, height: dimensions.height }}
        />
    );
};

export default ChartCanvas;
