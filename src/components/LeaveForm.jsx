import { useState } from "react";

// eslint-disable-next-line react/prop-types
const LeaveForm = ({ applyLeave }) => {
  const [employeeName, setEmployeeName] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employeeName || !leaveType || !fromDate || !toDate) {
      alert("Please fill out all fields!");
      return;
    }

    if (new Date(toDate) < new Date(fromDate)) {
      alert("To Date cannot be before From Date!");
      return;
    }

    // Calculate the number of leave days
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const daysCount = (to - from) / (1000 * 60 * 60 * 24) + 1; // +1 to include first day

    applyLeave({ employeeName, leaveType, fromDate, toDate, days: daysCount });

    // Reset form fields
    setEmployeeName("");
    setLeaveType("");
    setFromDate("");
    setToDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg mt-6 border-t-4 border-purple-500 transition-all hover:border-blue-500 max-w-4xl mx-auto w-full"
    >
      <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center">
        📝 Apply for Leave
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700">Employee Name</label>
          <input
            type="text"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700">Leave Type</label>
          <select
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-purple-400 transition-all hover:border-blue-500"
          >
            <option value="">Select</option>
            <option value="SickLeave">Sick Leave</option>
            <option value="CasualLeave">Casual Leave</option>
            <option value="PaidLeave">Paid Leave</option>
            <option value="UnpaidLeave">Unpaid Leave</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-4">
        <div>
          <label className="block text-gray-700">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-purple-400 transition-all hover:border-blue-500"
          />
        </div>
      </div>

      <button className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-500 text-white py-3 px-4 rounded-md hover:scale-105 transform transition-all duration-300 shadow-md">
        Apply
      </button>
    </form>
  );
};

export default LeaveForm;