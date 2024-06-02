import React, { useRef, useEffect } from 'react';
import { Bar } from '../../../models/Bar';

interface PriceScaleProps {
    bars: Bar[];
    height: number;
}

const PriceScale: React.FC<PriceScaleProps> = ({ bars, height }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const context = canvas.getContext('2d');
            if (context) {
                drawPriceScale(context);
            }
        }
    }, [bars, height]);

    const drawPriceScale = (context: CanvasRenderingContext2D) => {
        context.clearRect(0, 0, 60, height);

        if (bars.length === 0) return;

        // Получаем массив цен закрытия
        const prices = bars.map(bar => bar.close);

        // Находим минимальное и максимальное значение цены
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        // Определение количества шагов на шкале
        const numberOfSteps = 10;
        const priceStep = (maxPrice - minPrice) / numberOfSteps;

        // Рисуем метки шкалы с ценами
        for (let i = 0; i <= numberOfSteps; i++) {
            const price = minPrice + i * priceStep;
            const y = height - (i * height) / numberOfSteps;
            context.fillText(price.toFixed(5), 5, y);
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={60}
            height={height}
            style={{ position: 'absolute', right: 0, top: 0, background: 'rgba(255,255,255,0.9)' }}
        />
    );
};

export default PriceScale;
