import React, { useRef, useEffect } from 'react';
import { Chart, registerables, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';
import { ViolinController, ViolinElement } from '@sgratzl/chartjs-chart-boxplot';

// Register Chart.js and Violin components
Chart.register(...registerables, ViolinController, ViolinElement, LinearScale, CategoryScale, Tooltip, Legend);

const DashboardCardIncomeSegmentation = () => {
  const canvas = useRef(null);
  const chartInstance = useRef(null); // Track chart instance

  useEffect(() => {
    const ctx = canvas.current.getContext('2d');

    // Destroy previous instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new Chart instance
    chartInstance.current = new Chart(ctx, {
      type: 'violin',
      data: {
        labels: ['Low Income', 'Middle Income', 'High Income'],
        datasets: [
          {
            label: 'Credit Score',
            backgroundColor: 'rgba(0, 123, 255, 0.5)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1,
            data: [
              [600, 650, 700, 750, 800], // Low Income
              [650, 700, 750, 800, 850], // Middle Income
              [700, 750, 800, 850, 900]  // High Income
            ]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const value = context.raw;
                return `Credit Score: ${value}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Income Segments'
            }
          },
          y: {
            type: 'linear',
            title: {
              display: true,
              text: 'Credit Score'
            },
            min: 500,
            max: 1000
          }
        }
      }
    });

    // Cleanup on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency to run once on mount

  return (
    <div className="flex flex-col col-span-full xl:col-span-12 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Income Segmentation - Violin Plot</h2>
        </header>
      </div>
      <div className="grow">
        <canvas ref={canvas} className="w-full h-[500px]"></canvas>
      </div>
    </div>
  );
};

export default DashboardCardIncomeSegmentation;
