// // import React, { useRef, useEffect } from 'react';
// // import { drawBars } from '../../../helpers/canvasHelpers';
// // import { Bar } from '../../../models/Bar';

// // interface ChartCanvasProps {
// //     bars: Bar[];
// //     scale: number;
// //     offset: { x: number; y: number } | null;
// //     onWheel: (event: React.WheelEvent) => void;
// //     onMouseDown: (event: React.MouseEvent) => void;
// //     onMouseMove: (event: React.MouseEvent) => void;
// //     onMouseUp: () => void;
// // }

// // const ChartCanvas: React.FC<ChartCanvasProps> = ({ bars, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp }) => {
// //     const canvasRef = useRef<HTMLCanvasElement>(null);

// //     useEffect(() => {
// //         const canvas = canvasRef.current;
// //         if (canvas) {
// //             const context = canvas.getContext('2d');
// //             if (context && offset) {
// //                 drawBars(context, bars, scale, offset);
// //             }
// //         }
// //     }, [bars, scale, offset]);

// //     return (
// //         <canvas
// //             ref={canvasRef}
// //             width={800}
// //             height={600}
// //             onWheel={onWheel}
// //             onMouseDown={onMouseDown}
// //             onMouseMove={onMouseMove}
// //             onMouseUp={onMouseUp}
// //         />
// //     );
// // };

// // export default ChartCanvas;

// import React, { useRef, useEffect } from 'react';
// import { drawBars } from '../../../helpers/canvasHelpers';
// import { Bar } from '../../../models/Bar';

// interface ChartCanvasProps {
//     bars: Bar[];
//     scale: number;
//     offset: { x: number; y: number } | null;
//     onWheel: (event: React.WheelEvent) => void;
//     onMouseDown: (event: React.MouseEvent) => void;
//     onMouseMove: (event: React.MouseEvent) => void;
//     onMouseUp: () => void;
// }

// const ChartCanvas: React.FC<ChartCanvasProps> = ({ bars, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp }) => {
//     const canvasRef = useRef<HTMLCanvasElement>(null);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (canvas) {
//             const context = canvas.getContext('2d');
//             if (context && offset) {
//                 drawBars(context, bars, scale, offset);
//             }
//         }
//     }, [bars, scale, offset]);

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         if (canvas) {
//             const handleResize = () => {
//                 canvas.width = window.innerWidth;
//                 canvas.height = window.innerHeight;
//                 const context = canvas.getContext('2d');
//                 if (context && offset) {
//                     drawBars(context, bars, scale, offset);
//                 }
//             };

//             window.addEventListener('resize', handleResize);
//             handleResize(); // Set initial size

//             return () => {
//                 window.removeEventListener('resize', handleResize);
//             };
//         }
//     }, [bars, scale, offset]);

//     return (
//         <canvas
//             ref={canvasRef}
//             onWheel={onWheel}
//             onMouseDown={onMouseDown}
//             onMouseMove={onMouseMove}
//             onMouseUp={onMouseUp}
//             style={{ width: '100vw', height: '100vh' }}
//         />
//     );
// };

// export default ChartCanvas;

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
}

const ChartCanvas: React.FC<ChartCanvasProps> = ({ bars, scale, offset, onWheel, onMouseDown, onMouseMove, onMouseUp }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: window.innerWidth, height: window.innerHeight });

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
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={dimensions.width}
            height={dimensions.height}
            onWheel={onWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            style={{ width: '100vw', height: '100vh' }}
        />
    );
};

export default ChartCanvas;
