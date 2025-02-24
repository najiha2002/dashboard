import React, { useRef, useEffect, useState } from 'react';
import { Chart, registerables, LinearScale, CategoryScale, BarController, BarElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(...registerables, BarController, BarElement, LinearScale, CategoryScale, Tooltip, Legend);

function Histogram({ data, width, height }) {
  const [chart, setChart] = useState(null);
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current;

    // Destroy previous instance to prevent overlapping
    if (chart) chart.destroy();

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: (context) => `Credit Score Range: ${context[0].label}`,
              label: (context) => `Customers: ${context.raw}`
            }
          }
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Credit Score Range'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Customers'
            }
          }
        }
      }
    });

    setChart(newChart);
    return () => newChart.destroy();
  }, [data]);

  return (
    <div className="grow">
      <canvas ref={canvas} width={width} height={height}></canvas>
    </div>
  );
}

export default Histogram;
