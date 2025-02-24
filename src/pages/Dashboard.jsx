import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import UserDemo from '../partials/dashboard/UserDemographics';
import IncomevsDebt from '../partials/dashboard/IncomevsDebt';
import CardBrands from '../partials/dashboard/CardBrands';
import GeoDist from '../partials/dashboard/GeoDist';
import CreditScore from '../partials/dashboard/CreditScore';
import AccountOpeningsOverTime from '../partials/dashboard/AcctOpenings';

function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Left: Title */}
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Microservices Dashboard</h1>
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-12 gap-6">

              {/* Credit Score Analysis */}
              <CreditScore />
              {/* User Demographics - Age & Gender */}
              <UserDemo />
              {/* Income vs Debt Analysis */}
              <IncomevsDebt />
              {/* Account Openings Over Time */}
              <AccountOpeningsOverTime />
              {/* Card Brands */}
              <CardBrands />
              {/* Geographic */}
              <GeoDist />
              
            </div>

          </div>
        </main>

      </div>
    </div>
  );
}

export default Dashboard;