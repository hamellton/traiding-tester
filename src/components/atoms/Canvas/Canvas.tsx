import React, { forwardRef } from 'react';

interface CanvasProps {
    width: number;
    height: number;
    onWheel: (event: React.WheelEvent) => void;
    onMouseDown: (event: React.MouseEvent) => void;
}

const Canvas = forwardRef<HTMLCanvasElement, CanvasProps>(({ width, height, onWheel, onMouseDown }, ref) => (
    <canvas
        ref={ref}
        width={width}
        height={height}
        onWheel={onWheel}
        onMouseDown={onMouseDown}
    />
));

export default Canvas;
