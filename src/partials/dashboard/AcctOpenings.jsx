import React from 'react';
import { Link } from 'react-router-dom';
import LineChart from '../../charts/LineChart01';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import EditMenu from '../../components/DropdownEditMenu';

// Import utilities
import { adjustColorOpacity, getCssVariable } from '../../utils/Utils';

function AccountOpeningsOverTime() {

  const chartData = {
    labels: [
      "01-01-1991",
      "02-01-1991",
      "03-01-1991",
      "04-01-1991",
      "05-01-1991",
      "06-01-1991",
      "07-01-1991",
      "08-01-1991",
      "09-01-1991",
      "10-01-1991",
      "11-01-1991",
      "12-01-1991",
      "01-01-1992",
      "02-01-1992",
      "03-01-1992",
      "04-01-1992",
      "05-01-1992",
      "06-01-1992",
      "07-01-1992",
      "08-01-1992",
      "09-01-1992",
      "10-01-1992",
      "11-01-1992",
      "12-01-1992",
      "01-01-1993",
      "02-01-1993",
      "03-01-1993",
      "04-01-1993",
      "05-01-1993",
      "06-01-1993",
      "07-01-1993",
      "08-01-1993",
      "09-01-1993",
      "10-01-1993",
      "11-01-1993",
      "12-01-1993",
      "01-01-1994",
      "02-01-1994",
      "03-01-1994",
      "04-01-1994",
      "05-01-1994",
      "06-01-1994",
      "07-01-1994",
      "08-01-1994",
      "09-01-1994",
      "10-01-1994",
      "11-01-1994",
      "12-01-1994",
      "01-01-1995",
      "02-01-1995",
      "03-01-1995",
      "04-01-1995",
      "05-01-1995",
      "06-01-1995",
      "07-01-1995",
      "08-01-1995",
      "09-01-1995",
      "10-01-1995",
      "11-01-1995",
      "12-01-1995",
      "01-01-1996",
      "02-01-1996",
      "03-01-1996",
      "04-01-1996",
      "05-01-1996",
      "06-01-1996",
      "07-01-1996",
      "08-01-1996",
      "09-01-1996",
      "10-01-1996",
      "11-01-1996",
      "12-01-1996",
      "01-01-1997",
      "02-01-1997",
      "03-01-1997",
      "04-01-1997",
      "05-01-1997",
      "06-01-1997",
      "07-01-1997",
      "08-01-1997",
      "09-01-1997",
      "10-01-1997",
      "11-01-1997",
      "12-01-1997",
      "01-01-1998",
      "02-01-1998",
      "03-01-1998",
      "04-01-1998",
      "05-01-1998",
      "06-01-1998",
      "07-01-1998",
      "08-01-1998",
      "09-01-1998",
      "10-01-1998",
      "11-01-1998",
      "12-01-1998",
      "01-01-1999",
      "02-01-1999",
      "03-01-1999",
      "04-01-1999",
      "05-01-1999",
      "06-01-1999",
      "07-01-1999",
      "08-01-1999",
      "09-01-1999",
      "10-01-1999",
      "11-01-1999",
      "12-01-1999",
      "01-01-2000",
      "02-01-2000",
      "03-01-2000",
      "04-01-2000",
      "05-01-2000",
      "06-01-2000",
      "07-01-2000",
      "08-01-2000",
      "09-01-2000",
      "10-01-2000",
      "11-01-2000",
      "12-01-2000",
      "01-01-2001",
      "02-01-2001",
      "03-01-2001",
      "04-01-2001",
      "05-01-2001",
      "06-01-2001",
      "07-01-2001",
      "08-01-2001",
      "09-01-2001",
      "10-01-2001",
      "11-01-2001",
      "12-01-2001",
      "01-01-2002",
      "02-01-2002",
      "03-01-2002",
      "04-01-2002",
      "05-01-2002",
      "06-01-2002",
      "07-01-2002",
      "08-01-2002",
      "09-01-2002",
      "10-01-2002",
      "11-01-2002",
      "12-01-2002",
      "01-01-2003",
      "02-01-2003",
      "03-01-2003",
      "04-01-2003",
      "05-01-2003",
      "06-01-2003",
      "07-01-2003",
      "08-01-2003",
      "09-01-2003",
      "10-01-2003",
      "11-01-2003",
      "12-01-2003",
      "01-01-2004",
      "02-01-2004",
      "03-01-2004",
      "04-01-2004",
      "05-01-2004",
      "06-01-2004",
      "07-01-2004",
      "08-01-2004",
      "09-01-2004",
      "10-01-2004",
      "11-01-2004",
      "12-01-2004",
      "01-01-2005",
      "02-01-2005",
      "03-01-2005",
      "04-01-2005",
      "05-01-2005",
      "06-01-2005",
      "07-01-2005",
      "08-01-2005",
      "09-01-2005",
      "10-01-2005",
      "11-01-2005",
      "12-01-2005",
      "01-01-2006",
      "02-01-2006",
      "03-01-2006",
      "04-01-2006",
      "05-01-2006",
      "06-01-2006",
      "07-01-2006",
      "08-01-2006",
      "09-01-2006",
      "10-01-2006",
      "11-01-2006",
      "12-01-2006",
      "01-01-2007",
      "02-01-2007",
      "03-01-2007",
      "04-01-2007",
      "05-01-2007",
      "06-01-2007",
      "07-01-2007",
      "08-01-2007",
      "09-01-2007",
      "10-01-2007",
      "11-01-2007",
      "12-01-2007",
      "01-01-2008",
      "02-01-2008",
      "03-01-2008",
      "04-01-2008",
      "05-01-2008",
      "06-01-2008",
      "07-01-2008",
      "08-01-2008",
      "09-01-2008",
      "10-01-2008",
      "11-01-2008",
      "12-01-2008",
      "01-01-2009",
      "02-01-2009",
      "03-01-2009",
      "04-01-2009",
      "05-01-2009",
      "06-01-2009",
      "07-01-2009",
      "08-01-2009",
      "09-01-2009",
      "10-01-2009",
      "11-01-2009",
      "12-01-2009",
      "01-01-2010",
      "02-01-2010",
      "03-01-2010",
      "04-01-2010",
      "05-01-2010",
      "06-01-2010",
      "07-01-2010",
      "08-01-2010",
      "09-01-2010",
      "10-01-2010",
      "11-01-2010",
      "12-01-2010",
      "01-01-2011",
      "02-01-2011",
      "03-01-2011",
      "04-01-2011",
      "05-01-2011",
      "06-01-2011",
      "07-01-2011",
      "08-01-2011",
      "09-01-2011",
      "10-01-2011",
      "11-01-2011",
      "12-01-2011",
      "01-01-2012",
      "02-01-2012",
      "03-01-2012",
      "04-01-2012",
      "05-01-2012",
      "06-01-2012",
      "07-01-2012",
      "08-01-2012",
      "09-01-2012",
      "10-01-2012",
      "11-01-2012",
      "12-01-2012",
      "01-01-2013",
      "02-01-2013",
      "03-01-2013",
      "04-01-2013",
      "05-01-2013",
      "06-01-2013",
      "07-01-2013",
      "08-01-2013",
      "09-01-2013",
      "10-01-2013",
      "11-01-2013",
      "12-01-2013",
      "01-01-2014",
      "02-01-2014",
      "03-01-2014",
      "04-01-2014",
      "05-01-2014",
      "06-01-2014",
      "07-01-2014",
      "08-01-2014",
      "09-01-2014",
      "10-01-2014",
      "11-01-2014",
      "12-01-2014",
      "01-01-2015",
      "02-01-2015",
      "03-01-2015",
      "04-01-2015",
      "05-01-2015",
      "06-01-2015",
      "07-01-2015",
      "08-01-2015",
      "09-01-2015",
      "10-01-2015",
      "11-01-2015",
      "12-01-2015",
      "01-01-2016",
      "02-01-2016",
      "03-01-2016",
      "04-01-2016",
      "05-01-2016",
      "06-01-2016",
      "07-01-2016",
      "08-01-2016",
      "09-01-2016",
      "10-01-2016",
      "11-01-2016",
      "12-01-2016",
      "01-01-2017",
      "02-01-2017",
      "03-01-2017",
      "04-01-2017",
      "05-01-2017",
      "06-01-2017",
      "07-01-2017",
      "08-01-2017",
      "09-01-2017",
      "10-01-2017",
      "11-01-2017",
      "12-01-2017",
      "01-01-2018",
      "02-01-2018",
      "03-01-2018",
      "04-01-2018",
      "05-01-2018",
      "06-01-2018",
      "07-01-2018",
      "08-01-2018",
      "09-01-2018",
      "10-01-2018",
      "11-01-2018",
      "12-01-2018",
      "01-01-2019",
      "02-01-2019",
      "03-01-2019",
      "04-01-2019",
      "05-01-2019",
      "06-01-2019",
      "07-01-2019",
      "08-01-2019",
      "09-01-2019",
      "10-01-2019",
      "11-01-2019",
      "12-01-2019",
    ],
    datasets: [
      // Orange line
      {
        data: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 1, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 1, 2, 0, 1, 0, 0, 2, 0, 1, 2, 1, 0, 2, 2, 2, 2, 2, 2, 1, 6, 1, 5, 0, 0, 3, 1, 1, 4, 3, 3, 4, 1, 3, 5, 3, 7, 2, 4, 7, 1, 2, 4, 9, 4, 5, 5, 6, 2, 4, 6, 4, 5, 7, 5, 11, 3, 6, 5, 7, 6, 1, 6, 5, 4, 5, 8, 10, 12, 13, 10, 11, 9, 10, 8, 14, 9, 7, 8, 14, 12, 12, 15, 15, 15, 5, 12, 18, 11, 10, 14, 19, 14, 14, 12, 19, 21, 13, 17, 23, 14, 17, 16, 19, 20, 22, 24, 19, 18, 22, 24, 17, 23, 22, 24, 30, 27, 26, 21, 24, 28, 24, 23, 21, 26, 26, 34, 24, 34, 21, 26, 28, 46, 23, 38, 31, 29, 25, 27, 33, 31, 35, 34, 36, 32, 41, 24, 33, 39, 43, 40, 30, 44, 38, 39, 39, 46, 49, 50, 38, 40, 34, 32, 36, 31, 32, 41, 50, 45, 32, 51, 41, 37, 38, 43, 65, 31, 43, 50, 46, 42, 40, 50, 43, 48, 44, 29, 31, 22, 21, 28, 34, 27, 31, 25, 30, 26, 31, 16, 16, 14, 21, 17, 20, 14, 14, 15, 12, 15, 14, 18, 22, 17, 11, 14, 13, 13, 19, 23, 16, 16, 17, 15, 16, 13, 18, 17, 14, 14, 25, 12, 17, 10, 7, 10, 12, 15, 15, 11, 15, 11, 9, 13, 11, 12, 14, 8, 8, 8, 11, 17, 13, 9, 7, 8, 8, 10, 13, 5, 8, 8, 9, 12, 9, 13, 6, 14, 8, 5, 4, 13, 8, 9, 11, 2, 14, 9, 10, 5, 8, 7, 5, 9, 9, 13, 3, 2, 6, 9, 9, 7, 10, 5, 6, 571, 607],
        fill: true,
        backgroundColor: function(context) {
          const chart = context.chart;
          const {ctx, chartArea} = chart;
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: adjustColorOpacity(getCssVariable('--color-paynet-orange'), 0) },
            { stop: 1, color: adjustColorOpacity(getCssVariable('--color-paynet-orange'), 0.2) }
          ]);
        },            
        borderColor: getCssVariable('--color-paynet-orange'),
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: getCssVariable('--color-paynet-orange'),
        pointHoverBackgroundColor: getCssVariable('--color-paynet-orange'),
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Account Openings Over Time</h2>
        </header>
        <div className="grow h-[300px] w-full">
        <LineChart data={chartData} width={389} height={128} />
        </div>
    </div>
  );
}

export default AccountOpeningsOverTime;