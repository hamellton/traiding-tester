import React, { useState, useEffect } from 'react';
import ChartCanvas from '../../molecules/ChartCanvas/ChartCanvas';
import { Bar } from '../../../models/Bar';
import { DataLoader } from '../../../models/DataLoader';

interface ChartProps {
    dataUrl: string;
}

const Chart: React.FC<ChartProps> = ({ dataUrl }) => {
    const [bars, setBars] = useState<Bar[]>([]);
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        const dataLoader = new DataLoader(dataUrl);
        dataLoader.fetchData().then(setBars);
    }, [dataUrl]);

    const handleWheel = (event: React.WheelEvent) => {
        setOffset(prevOffset => prevOffset + event.deltaY);
    };

    const handleZoom = (event: React.MouseEvent) => {
        if (event.shiftKey) {
            setScale(prevScale => prevScale * 1.1);
        } else {
            setScale(prevScale => prevScale / 1.1);
        }
    };

    return (
        <ChartCanvas
            bars={bars}
            scale={scale}
            offset={offset}
            onWheel={handleWheel}
            onMouseDown={handleZoom}
        />
    );
};

export default Chart;
