import React, { useState, useEffect } from 'react';
import ChartCanvas from '../../molecules/ChartCanvas/ChartCanvas';
import { Bar } from '../../../models/Bar';
import { DataLoader } from '../../../models/DataLoader';
import config from '../../../config';

const Chart: React.FC = () => {
    const [bars, setBars] = useState<Bar[]>([]);
    const [scale, setScale] = useState<number>(1);
    const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);

    useEffect(() => {
        const dataLoader = new DataLoader(config.endpoints.eurUsd);
        dataLoader.fetchData().then(setBars);
    }, []);

    const handleMouseDown = (event: React.MouseEvent) => {
        setDragStart({ x: event.clientX, y: event.clientY });
        setIsDragging(true);
    };

    const handleMouseMove = (event: React.MouseEvent) => {
        if (isDragging && dragStart) {
            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            setOffset(prevOffset => ({ x: prevOffset.x + dx, y: prevOffset.y + dy }));
            setDragStart({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragStart(null);
    };

    const handleWheel = (event: React.WheelEvent) => {
        event.preventDefault();
        const newScale = scale * (1 - event.deltaY * 0.01);
        setScale(newScale);
    };

    return (
        <ChartCanvas
            bars={bars}
            scale={scale}
            offset={offset}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
        />
    );
};

export default Chart;
