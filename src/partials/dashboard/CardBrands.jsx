import React from 'react';
import DoughnutChart from '../../charts/DoughnutChart';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function CardBrands() {

  const chartData = {
    labels: ['Visa', 'Mastercard', 'American Express', 'Discover'],
    datasets: [
      {
        label: 'Card Distribution',
        data: [
          35, 30, 40, 10
        ],
        backgroundColor: [
          getCssVariable('--color-paynet-lightblue'),
          getCssVariable('--color-paynet-orange'),
          getCssVariable('--color-paynet-green'),
          getCssVariable('--color-paynet-blue'),
        ],
        hoverBackgroundColor: [
          getCssVariable('--color-violet-600'),
          getCssVariable('--color-sky-600'),
          getCssVariable('--color-paynet-green'),
          getCssVariable('--color-paynet-blue'),
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Card Distribution</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <DoughnutChart data={chartData} width={389} height={260} />
    </div>
  );
}

export default CardBrands;
