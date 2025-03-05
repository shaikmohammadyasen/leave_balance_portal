import { useState } from 'react';
import Navbar from './components/Navbar';
import LeaveForm from './components/LeaveForm';
import LeaveTable from './components/LeaveTable';
import LeaveBalance from './components/LeaveBalance';

// Multi-year, multi-month structure
const initialBalance = {
  2024: {
    January: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  February: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  March: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  April: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  May: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  June: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  July: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  August: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  September: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  October: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  November: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  December: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  },
  2025: {
    January: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  February: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  March: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  April: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  May: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  June: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  July: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  August: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  September: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  October: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  November: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  December: { SickLeave: 3, CasualLeave: 2, PaidLeave: 5, UnpaidLeave: 3 },
  },
};

function App() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveBalance, setLeaveBalance] = useState(initialBalance);

  // Selected month & year for viewing
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('en-US', { month: 'long' })
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Called when user applies for leave
  const applyLeave = ({ employeeName, leaveType, fromDate, toDate, days }) => {
    // Use fromDate to figure out which month & year to deduct from
    const dateObj = new Date(fromDate);
    const year = dateObj.getFullYear();
    const monthName = dateObj.toLocaleString('en-US', { month: 'long' });

    const typeKey = leaveType.replace(/\s/g, ''); // e.g. "SickLeave"

    // Validate month/year in the leaveBalance
    if (!leaveBalance[year] || !leaveBalance[year][monthName]) {
      alert(`No leave balance found for ${monthName} ${year}`);
      return;
    }

    // Check if that leave type is valid
    if (leaveBalance[year][monthName][typeKey] === undefined) {
      alert(`Invalid leave type: ${leaveType}`);
      return;
    }

    // Check if enough leaves remain for the entire range
    if (leaveBalance[year][monthName][typeKey] >= days) {
      // Add new request
      setLeaveRequests((prev) => [
        ...prev,
        {
          employeeName,
          leaveType,
          fromDate,
          toDate,
          daysTaken: days, // We'll display this in the table
          status: 'Pending',
        },
      ]);

      // Deduct from the correct year & month
      setLeaveBalance((prev) => ({
        ...prev,
        [year]: {
          ...prev[year],
          [monthName]: {
            ...prev[year][monthName],
            [typeKey]: prev[year][monthName][typeKey] - days,
          },
        },
      }));
    } else {
      alert(`❌ Not enough ${leaveType} in ${monthName} ${year}!`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-6">
      <Navbar />

      <div className="max-w-5xl mx-auto">
        {/* Show leave balances for the selectedMonth & selectedYear */}
        <LeaveBalance
          leaveBalance={leaveBalance}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedYear={setSelectedYear}
        />

        {/* Apply for leave (deduct from the date's month & year) */}
        <LeaveForm applyLeave={applyLeave} />

        {/* Show leave requests filtered by selectedMonth & selectedYear */}
        <LeaveTable
          leaveRequests={leaveRequests}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </div>
    </div>
  );
}

export default App;
