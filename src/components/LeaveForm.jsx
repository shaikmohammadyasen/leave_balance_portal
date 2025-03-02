import { useState } from 'react'
// eslint-disable-next-line react/prop-types
const LeaveForm = ({ applyLeave }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [leaveDate, setLeaveDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeName || !leaveType || !leaveDate) {
      alert('Please fill out all fields!');
      return;
    }

    applyLeave({ employeeName, leaveType, leaveDate });

    setEmployeeName('');
    setLeaveType('');
    setLeaveDate('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mt-6 border-t-4 border-purple-500 transition-all hover:border-blue-500"
    >
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">📝 Apply for Leave</h2>

      <label className="block text-gray-700">Employee Name</label>
      <input
        type="text"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
        className="border p-2 w-full rounded-md mb-4 focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
        placeholder="Enter your name"
      />

      <label className="block text-gray-700">Leave Type</label>
      <select
        value={leaveType}
        onChange={(e) => setLeaveType(e.target.value)}
        className="border p-2 w-full rounded-md mb-4 focus:ring-2 focus:ring-purple-400 transition-all hover:border-blue-500"
      >
        <option value="">Select</option>
        <option value="SickLeave">Sick Leave</option>
        <option value="CasualLeave">Casual Leave</option>
        <option value="PaidLeave">Paid Leave</option>
        <option value="UnpaidLeave">Unpaid Leave</option>
      </select>

      <label className="block text-gray-700">Date</label>
      <input
        type="date"
        value={leaveDate}
        onChange={(e) => setLeaveDate(e.target.value)}
        className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
      />

      <button className="mt-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-4 rounded-md hover:scale-105 transform transition-all duration-300 shadow-md">
        Apply
      </button>
    </form>
  );
};

export default LeaveForm;