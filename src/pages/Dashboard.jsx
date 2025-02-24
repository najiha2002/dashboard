// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import CreditScore from '../partials/dashboard/CreditScore';
import UserDemo from '../partials/dashboard/UserDemographics';
import IncomevsDebt from '../partials/dashboard/IncomevsDebt';
import AccountOpeningsOverTime from '../partials/dashboard/AcctOpenings';
import CardBrands from '../partials/dashboard/CardBrands';
import GeoDist from '../partials/dashboard/GeoDist';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Microservices Dashboard</h1>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Logout
              </button>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <CreditScore />
              <UserDemo />
              <IncomevsDebt />
              <AccountOpeningsOverTime />
              <CardBrands />
              <GeoDist />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
