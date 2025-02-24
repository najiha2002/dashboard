import React from 'react';
import BarChart from '../../charts/BarChart01';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function AgeDistribution() {

  const chartData = {
    labels: [
      '10s', '20s', '30s', '40s', 
      '50s', '60s', '70s', '80s'
    ],
    datasets: [
      // Light blue bars
      {
        label: 'Male',
        data: [
          800, 1600, 900, 1300, 1950, 1700, 800, 500
        ],
        backgroundColor: getCssVariable('--color-paynet-green'),
        hoverBackgroundColor: getCssVariable('--color-paynet-green'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
      // Blue bars
      {
        label: 'Female',
        data: [
          4900, 2600, 5350, 4800, 5200, 4800, 1000, 670
        ],
        backgroundColor: getCssVariable('--color-paynet-orange'),
        hoverBackgroundColor: getCssVariable('--color-paynet-orange'),
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">User Demographics</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default AgeDistribution;
