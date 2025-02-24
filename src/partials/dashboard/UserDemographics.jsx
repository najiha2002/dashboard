import React, { useState,useEffect } from 'react';
import BarChart from '../../charts/BarChart01';
import axios from 'axios';

// Import utilities
import { getCssVariable } from '../../utils/Utils';

function AgeDistribution() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/age-dist')
      .then(response => {
        const data = response.data;
        setChartData({
          labels: data.labels,
          datasets: [
            {
              label: "Male",
              data: data.datasets[0].data,
              backgroundColor: getCssVariable('--color-paynet-green'),
              hoverBackgroundColor: getCssVariable('--color-paynet-green'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
            {
              label: "Female",
              data: data.datasets[1].data,
              backgroundColor: getCssVariable('--color-paynet-orange'),
              hoverBackgroundColor: getCssVariable('--color-paynet-orange'),
              barPercentage: 0.7,
              categoryPercentage: 0.7,
              borderRadius: 4,
            },
          ],
        });
      })
      .catch(error => console.error("Error fetching age distribution:", error));
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Age Distribution</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default AgeDistribution;
