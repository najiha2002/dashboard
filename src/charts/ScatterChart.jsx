// src/charts/ScatterChart.jsx

import React, { useRef, useEffect, useState } from 'react';
import { useThemeProvider } from '../utils/ThemeContext';

import { chartColors } from './ChartjsConfig';
import {
  Chart, ScatterController, PointElement, LinearScale, Tooltip, Legend,
} from 'chart.js';

// Register Chart.js components
Chart.register(ScatterController, PointElement, LinearScale, Tooltip, Legend);

// Function to Get Color Based on Credit Score
const getColorByCreditScore = (credit_score) => {
  if (credit_score >= 750) return 'rgba(0, 200, 83, 0.7)';   // Green (Excellent)
  if (credit_score >= 700) return 'rgba(255, 193, 7, 0.7)';  // Yellow (Good)
  if (credit_score >= 650) return 'rgba(255, 87, 34, 0.7)';  // Orange (Fair)
  return 'rgba(244, 67, 54, 0.7)';                           // Red (Poor)
};

// Helper Function: Get Dynamic Min and Max for X and Y Axes with Buffer
const getAxisRange = (data, key, bufferFactor = 0.2) => {
  const values = data.map(user => user[key]);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const buffer = (maxValue - minValue) * bufferFactor;
  return {
    min: minValue - buffer,
    max: maxValue + buffer
  };
};

const ScatterChart = ({ data, width, height }) => {
  const [chart, setChart] = useState(null)
  const canvas = useRef(null);
  const legend = useRef(null);
  const { currentTheme } = useThemeProvider();
  const darkMode = currentTheme === 'dark';
  const { textColor, gridColor, tooltipBodyColor, tooltipBgColor, tooltipBorderColor } = chartColors;

  useEffect(() => {
    const ctx = canvas.current;

    // Destroy old chart instance before creating a new one
    if (chart) {
      chart.destroy();
    }

    // Calculate the dynamic min and max for the x and y axes
    const incomeRange = getAxisRange(data, 'yearly_income');
    const debtRange = getAxisRange(data, 'total_debt');

    // Create new chart instance
    const newChart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Income vs Debt',
          data: data.map(user => ({
            x: user.yearly_income,
            y: user.total_debt,
            r: user.num_credit_cards * 3, // Bubble size based on number of credit cards
          })),
          pointBackgroundColor: data.map(user => getColorByCreditScore(user.credit_score)),
          pointBorderColor: data.map(user => getColorByCreditScore(user.credit_score)),
          pointRadius: data.map(user => user.num_credit_cards * 3),
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            padding: {
              top: 0,
              bottom: 40,
              left: 20,
              right: 40, // Specific padding for the right side
            }
          },
          
        scales: {
          x: {
            type: 'linear',
            title: {
              display: true,
              text: 'Yearly Income ($)',
              color: darkMode ? textColor.dark : textColor.light,
            },
            ticks: {
              color: darkMode ? textColor.dark : textColor.light,
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
            suggestedMin: incomeRange.min, // Dynamic Minimum for X-Axis
            suggestedMax: incomeRange.max, // Dynamic Maximum for X-Axis
          },
          y: {
            title: {
              display: true,
              text: "Total Debt ($ '000)", // Updated Y-Axis Title
              color: darkMode ? textColor.dark : textColor.light,
            },
            ticks: {
              color: darkMode ? textColor.dark : textColor.light,
              callback: function(value) {
                return (value / 1000).toFixed(0); // Display in Thousands
              }
            },
            grid: {
              color: darkMode ? gridColor.dark : gridColor.light,
            },
            suggestedMin: 0, // Always starts at 0 for Total Debt
            suggestedMax: debtRange.max, // Dynamic Maximum for Y-Axis
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const user = data[context.dataIndex];
                return [
                  `Income: $${user.yearly_income}`,
                  `Debt: $${user.total_debt}`,
                  `Credit Score: ${user.credit_score}`,
                  `Credit Cards: ${user.num_credit_cards}`
                ];
              }
            },
            bodyColor: darkMode ? tooltipBodyColor.dark : tooltipBodyColor.light,
            backgroundColor: darkMode ? tooltipBgColor.dark : tooltipBgColor.light,
            borderColor: darkMode ? tooltipBorderColor.dark : tooltipBorderColor.light,
          }
        }
      }
    });

    setChart(newChart);
    return () => newChart.destroy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, darkMode]);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <ul ref={legend} className="flex flex-wrap gap-x-4"></ul>
      </div>
      <div className="grow">
        <canvas ref={canvas} width={width} height={height}></canvas>
      </div>
    </React.Fragment>
  );
}

export default ScatterChart;
