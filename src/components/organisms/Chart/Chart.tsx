import React, { useState, useEffect } from 'react';
import ChartCanvas from '../../molecules/ChartCanvas/ChartCanvas';
import PriceScale from '../../molecules/PriceScale/PriceScale';
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

        if (event.shiftKey) {
            // Горизонтальная прокрутка при удерживании клавиши Shift
            setOffset(prevOffset => ({ x: prevOffset.x - event.deltaY, y: prevOffset.y }));
        } else {
            // Вертикальная прокрутка или увеличение
            const deltaScale = event.deltaY < 0 ? 1.1 : 0.9;
            const newScale = scale * deltaScale;

            const boundingRect = event.currentTarget.getBoundingClientRect();
            const mouseX = event.clientX - boundingRect.left;
            const mouseY = event.clientY - boundingRect.top;

            const offsetX = mouseX - ((mouseX - offset.x) * newScale) / scale;
            const offsetY = mouseY - ((mouseY - offset.y) * newScale) / scale;

            setScale(newScale);
            setOffset({ x: offsetX, y: offsetY });
        }
    };

    const updatePriceScaleCursor = (mouseX: number, mouseY: number) => {
        // Здесь вы можете выполнить какие-либо действия с координатами курсора мыши, если это необходимо
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <ChartCanvas
                bars={bars}
                scale={scale}
                offset={offset}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                updatePriceScaleCursor={updatePriceScaleCursor}
            />
            <PriceScale
                bars={bars}
                height={window.innerHeight}
            />
        </div>
    );
};

export default Chart;
