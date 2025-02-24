import React from 'react';
import BarChart04 from '../../charts/BarChart04';

// Dummy Data
const dummyData = [
  { credit_score: 600, num_credit_cards: 1 },
  { credit_score: 620, num_credit_cards: 2 },
  { credit_score: 630, num_credit_cards: 3 },
  { credit_score: 640, num_credit_cards: 1 },
  { credit_score: 650, num_credit_cards: 2 },
  { credit_score: 660, num_credit_cards: 3 },
  { credit_score: 670, num_credit_cards: 1 },
  { credit_score: 680, num_credit_cards: 2 },
  { credit_score: 690, num_credit_cards: 3 },
  { credit_score: 700, num_credit_cards: 1 },
  { credit_score: 710, num_credit_cards: 2 },
  { credit_score: 720, num_credit_cards: 3 },
  { credit_score: 730, num_credit_cards: 1 },
  { credit_score: 740, num_credit_cards: 2 },
  { credit_score: 750, num_credit_cards: 3 },
  { credit_score: 760, num_credit_cards: 1 },
  { credit_score: 770, num_credit_cards: 2 },
  { credit_score: 780, num_credit_cards: 3 },
  { credit_score: 790, num_credit_cards: 1 },
  { credit_score: 800, num_credit_cards: 2 }
];

// Transform Data for Stacked Histogram
const binAndStackCreditScores = (data) => {
  const bins = [
    '600-649', '650-699', '700-749', '750-799', '800-850'
  ];

  const cardSegments = [1, 2, 3]; // Number of Credit Cards

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
      borderRadius: 4
    };
  });

  return {
    labels: bins,
    datasets: stackedData
  };
};

const chartData = binAndStackCreditScores(dummyData);

const CreditScoreHistogramStacked = () => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Credit Score Analysis</h2>
      </header>
      {/* Chart built with Chart.js 3 */}
      {/* Change the height attribute to adjust the chart height */}
      <BarChart04 data={chartData} width={595} height={248} />
    </div>
  );
};

export default CreditScoreHistogramStacked;
