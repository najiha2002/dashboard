import React, { useEffect, useRef, useState } from 'react';
import {
  Chart, PieController, ArcElement, Tooltip, Legend
} from 'chart.js';

// Register Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

// Dummy Data
const dummyData = {
  labels: ['Visa', 'MasterCard', 'American Express', 'Discover'],
  datasets: [{
    label: 'Card Brand Distribution',
    data: [40, 30, 20, 10], // Percentage of Total Cards Issued
    backgroundColor: [
      'rgba(54, 162, 235, 0.7)',  // Visa - Blue
      'rgba(255, 99, 132, 0.7)',  // MasterCard - Red
      'rgba(255, 205, 86, 0.7)',  // American Express - Yellow
      'rgba(75, 192, 192, 0.7)'   // Discover - Green
    ],
    hoverBackgroundColor: [
      'rgba(54, 162, 235, 0.9)',
      'rgba(255, 99, 132, 0.9)',
      'rgba(255, 205, 86, 0.9)',
      'rgba(75, 192, 192, 0.9)'
    ],
    borderWidth: 1
  }]
};

const PieChartCardBrand = ({ width, height }) => {
  const canvasRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    const ctx = canvasRef.current;
    if (chart) chart.destroy(); // Destroy previous instance

    const newChart = new Chart(ctx, {
      type: 'pie',
      data: dummyData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: 'top',
            labels: {
              color: '#4B5563'
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label;
                const value = context.raw;
                return `${label}: ${value}%`;
              }
            }
          }
        }
      }
    });

    setChart(newChart);

    return () => newChart.destroy();
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} width={width} height={height}></canvas>
    </div>
  );
};

export default PieChartCardBrand;
