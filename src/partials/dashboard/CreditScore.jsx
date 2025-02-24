import React, { useState, useEffect } from 'react';
import BarChart04 from '../../charts/BarChart04';
import axios from 'axios';

const CreditScoreHistogramStacked = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/credit-score-dist') // Update with correct API URL
      .then(response => {
        const data = response.data;
        setChartData(binAndStackCreditScores(data));
      })
      .catch(error => console.error("Error fetching credit score distribution:", error));
  }, []);

  // Transform Data for Stacked Histogram
  const binAndStackCreditScores = (data) => {
    const bins = ['600-649', '650-699', '700-749', '750-799', '800-850'];
    const cardSegments = [1, 2, 3, 4, 5]; // Number of Credit Cards

    const stackedData = cardSegments.map(num => {
      return {
        label: `${num} Credit Card${num > 1 ? 's' : ''}`,
        data: bins.map(range => {
          const [min, max] = range.split('-').map(Number);
          return data.filter(d => d.credit_score >= min && d.credit_score <= max && d.num_credit_cards === num).length;
        }),
        backgroundColor: num === 1 ? 'rgba(173, 216, 230, 0.7)' : num === 2 ? 'rgba(0, 123, 255, 0.7)' : 'rgba(0, 76, 153, 0.7)',
        borderColor: num === 1 ? 'rgba(173, 216, 230, 1)' : num === 2 ? 'rgba(0, 123, 255, 1)' : 'rgba(0, 76, 153, 1)',
        borderWidth: 1,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
        borderRadius: 4,
      };
    });

    return {
      labels: bins,
      datasets: stackedData,
    };
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Credit Score Analysis</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      <BarChart04 data={chartData} width={595} height={248} />
    </div>
  );
};

export default CreditScoreHistogramStacked;
