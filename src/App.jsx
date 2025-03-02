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

  const applyLeave = ({ employeeName, leaveType, leaveDate }) => {
    const dateObj = new Date(leaveDate);
    const year = dateObj.getFullYear();
    const monthName = dateObj.toLocaleString('en-US', { month: 'long' });

    // Key must match our structure, e.g. "SickLeave"
    const typeKey = leaveType.replace(/\s/g, '');

    // Check if year & month exist in leaveBalance
    if (!leaveBalance[year] || !leaveBalance[year][monthName]) {
      alert(`No leave balance found for ${monthName} ${year}`);
      return;
    }

    // Check if that leave type is valid
    if (leaveBalance[year][monthName][typeKey] === undefined) {
      alert(`Invalid leave type: ${leaveType}`);
      return;
    }

    // Check if enough leaves remain
    if (leaveBalance[year][monthName][typeKey] > 0) {
      // Add new request
      setLeaveRequests((prev) => [
        ...prev,
        {
          employeeName,
          leaveType,
          leaveDate,
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
            [typeKey]: prev[year][monthName][typeKey] - 1,
          },
        },
      }));
    } else {
      alert(`❌ No remaining ${leaveType} in ${monthName} ${year}!`);
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