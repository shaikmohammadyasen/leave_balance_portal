import PropTypes from 'prop-types';

const LeaveBalance = ({
  leaveBalance,
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
}) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Suppose we only store 2024 and 2025 in initialBalance
  const years = [2024, 2025];

  // Safely get the object or empty if not exist
  const yearData = leaveBalance[selectedYear] || {};
  const balance = yearData[selectedMonth] || {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl mt-6 border-l-8 border-blue-500 transition-all hover:border-purple-500">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center">
        📊 Leave Balance for {selectedMonth} {selectedYear}
      </h2>

      <div className="flex justify-between mb-4">
        {/* Month Selector */}
        <select
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        {/* Year Selector */}
        <select
          className="border p-2 rounded-md focus:ring-2 focus:ring-blue-400 transition-all hover:border-purple-500"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>{yr}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden shadow-md rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
              <th className="p-4 border-b-2">Leave Type</th>
              <th className="p-4 border-b-2">Remaining Days</th>
              <th className="p-4 border-b-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(balance).map(([type, days]) => (
              <tr
                key={type}
                className="text-center bg-gray-100 hover:bg-purple-200 transition-all duration-300"
              >
                <td className="border p-3 font-semibold">
                  {type.replace(/([A-Z])/g, ' $1')}
                </td>
                <td className="border p-3 font-bold text-lg text-blue-600">
                  {days}
                </td>
                <td className="border p-3">
                  {days === 0 ? '❌ Expired' : '✅ Available'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700">
        📢 Unused leave will be <span className="font-semibold text-green-600">carried forward</span> if applicable. Otherwise, it expires.
      </div>
    </div>
  );
};

LeaveBalance.propTypes = {
  leaveBalance: PropTypes.object.isRequired,
  selectedMonth: PropTypes.string.isRequired,
  selectedYear: PropTypes.number.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
};
export default LeaveBalance;