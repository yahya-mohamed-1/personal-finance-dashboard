import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import AddTransactionModal from "../components/AddTransactionModal";
import TransactionHistory from "../components/TransactionHistory";

const initialData = [
  { month: "Jan", income: 3000, expenses: 1800 },
  { month: "Feb", income: 2800, expenses: 2000 },
  { month: "Mar", income: 3500, expenses: 2200 },
  { month: "Apr", income: 3200, expenses: 1900 },
];

function Dashboard() {
  const [data, setData] = useState(initialData);
  const [transactions, setTransactions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleAddTransaction = ({ amount, type, month, category }) => {
    const newData = [...data];
    const monthIndex = newData.findIndex((item) => item.month === month);

    if (monthIndex !== -1) {
      if (type === "income") {
        newData[monthIndex].income += amount;
      } else {
        newData[monthIndex].expenses += amount;
      }
    }
    setData(newData);

    setTransactions([...transactions, { amount, type, month, category }]);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left text-gray-900 dark:text-gray-100">
        Personal Finance Dashboard
      </h1>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-3 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
        >
          + Add Transaction
        </button>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors duration-300"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>
      </div>

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTransaction}
      />

      {/* Conditional rendering */}
      {showHistory ? (
        <TransactionHistory transactions={transactions} />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Monthly Budget
              </h2>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                $2000
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Total Income
              </h2>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${data.reduce((acc, cur) => acc + cur.income, 0)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Total Expenses
              </h2>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                ${data.reduce((acc, cur) => acc + cur.expenses, 0)}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Income vs Expenses
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis
                    dataKey="month"
                    stroke="#1f2937"
                    className="dark:text-gray-100"
                  />
                  <YAxis stroke="#1f2937" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      color: "#1f2937",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#1f2937" }} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow transition-colors duration-300">
              <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Monthly Breakdown
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis
                    dataKey="month"
                    stroke="#1f2937"
                    className="dark:text-gray-100"
                  />
                  <YAxis stroke="#1f2937" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      color: "#1f2937",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#1f2937" }} />
                  <Bar dataKey="income" fill="#3b82f6" />
                  <Bar dataKey="expenses" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
