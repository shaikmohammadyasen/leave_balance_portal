import { useState } from "react";
import PropTypes from "prop-types";

const LeaveTable = ({ leaveRequests, selectedMonth, selectedYear }) => {
  const [search, setSearch] = useState("");

  // 1) Filter by search text
  const searchedRequests = leaveRequests.filter((leave) => {
    return (
      leave.employeeName.toLowerCase().includes(search.toLowerCase()) ||
      leave.leaveType.toLowerCase().includes(search.toLowerCase())
    );
  });

  // 2) Filter by selectedMonth & selectedYear, using the fromDate
  const filteredRequests = searchedRequests.filter((leave) => {
    const dateObj = new Date(leave.fromDate); // Use fromDate to determine month
    const monthName = dateObj.toLocaleString("en-US", { month: "long" });
    const year = dateObj.getFullYear();
    return monthName === selectedMonth && year === selectedYear;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mt-6 border-l-8 border-green-500 transition-all hover:border-blue-500">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">📋 Leave Requests</h2>

      {/* Animated Search Bar */}
      <input
        type="text"
        placeholder="🔍 Search by Name or Leave Type"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 w-full rounded-md mb-4 focus:ring-2 focus:ring-blue-400 transition-all duration-300 hover:border-purple-500"
      />

      {filteredRequests.length === 0 ? (
        <p className="text-gray-500 text-center">
          No leave requests found for {selectedMonth} {selectedYear}.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-lg">
                <th className="border p-3">Employee Name</th>
                <th className="border p-3">Leave Type</th>
                <th className="border p-3">From Date</th>
                <th className="border p-3">To Date</th>
                <th className="border p-3">Days</th>
                <th className="border p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((leave, index) => (
                <tr
                  key={index}
                  className={`text-center ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-purple-200 transition-all duration-300`}
                >
                  <td className="border p-3">{leave.employeeName}</td>
                  <td className="border p-3">{leave.leaveType}</td>
                  <td className="border p-3">{leave.fromDate}</td>
                  <td className="border p-3">{leave.toDate}</td>
                  <td className="border p-3 font-bold text-blue-600">{leave.daysTaken}</td>
                  <td className="border p-3">
                    <span
                      className={`px-3 py-1 rounded-md text-white text-sm ${
                        leave.status === "Approved"
                          ? "bg-green-500"
                          : leave.status === "Pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

LeaveTable.propTypes = {
  leaveRequests: PropTypes.array.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.number.isRequired,
};

export default LeaveTable;