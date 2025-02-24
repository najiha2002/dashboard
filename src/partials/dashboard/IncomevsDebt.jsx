import React, { useState, useEffect } from 'react';
import ScatterChart from '../../charts/ScatterChart';
import axios from 'axios';

const IncomevsDebt = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/users/income-vs-debt')
      .then(response => {
        const data = response.data.map(user => ({
          yearly_income: user.yearly_income,
          total_debt: user.total_debt,
          credit_score: user.credit_score,
          num_credit_cards: user.num_credit_cards
        }));
        setChartData(data);
      })
      .catch(error => console.error("Error fetching income vs. debt data:", error));
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Income vs. Debt Analysis</h2>
      </header>
      <div className="grow h-[300px] w-full">
        <ScatterChart data={chartData} width={595} height={300} />
      </div>
    </div>
  );
};

export default IncomevsDebt;
