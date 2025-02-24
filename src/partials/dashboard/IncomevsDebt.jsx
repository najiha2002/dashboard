// src/partials/dashboard/DashboardCard02.jsx

import React from 'react';
import ScatterChart from '../../charts/ScatterChart';

// Sample Data for Income vs. Debt Analysis
const userData = [
  { yearly_income: 60000, total_debt: 20000, credit_score: 750, num_credit_cards: 3 },
  { yearly_income: 85000, total_debt: 50000, credit_score: 690, num_credit_cards: 5 },
  { yearly_income: 100000, total_debt: 70000, credit_score: 800, num_credit_cards: 2 },
  { yearly_income: 40000, total_debt: 30000, credit_score: 580, num_credit_cards: 7 },
  { yearly_income: 95000, total_debt: 10000, credit_score: 720, num_credit_cards: 4 },
  { yearly_income: 30000, total_debt: 25000, credit_score: 600, num_credit_cards: 6 },
];

const IncomevsDebt = () => {
  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Income vs. Debt Analysis</h2>
      </header>
      <div className="grow h-[300px] w-full">
        <ScatterChart data={userData} width={595} height={300} />
      </div>
    </div>
  );
}

export default IncomevsDebt;
