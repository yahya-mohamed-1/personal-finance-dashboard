import React, { useState, useEffect } from "react";
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
import api from "../api"; // <-- import axios instance

function Dashboard() {
  const [data, setData] = useState([]); // monthly summary
  const [transactions, setTransactions] = useState([]); // full history
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load data on mount
  useEffect(() => {
    fetchHistory();
  }, []);

  // 🔹 Fetch all transactions from backend
  const fetchHistory = async () => {
    try {
      const res = await api.get("/finance/history");
      const txs = res.data.transactions;

      // group by month for chart
      // Build grouped data keyed by Month/Year (e.g., Sep/2025)
      const grouped = txs.reduce((acc, tx) => {
        // prefer server-provided month (now stored as 'Mon/YYYY'), otherwise derive from date
        let m = tx.month;
        if (!m && tx.date) {
          try {
            const d = new Date(tx.date);
            m = d.toLocaleString("en-US", { month: "short" }) + "/" + d.getFullYear();
          } catch (e) {
            m = "Unknown";
          }
        }
        if (!m) m = "Unknown";
        if (!acc[m]) {
          acc[m] = { month: m, income: 0, expenses: 0 };
        }
        if (tx.type === "income") {
          acc[m].income += tx.amount;
        } else {
          acc[m].expenses += tx.amount;
        }
        return acc;
      }, {});

      const groupedArray = Object.values(grouped);

      // sort chronologically by year then month index
      const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
      groupedArray.sort((a,b) => {
        const parseMy = (s) => {
          if (!s || s === 'Unknown') return { y: 0, m: -1 };
          const parts = s.split('/');
          if (parts.length === 2) {
            const mon = parts[0];
            const yr = parseInt(parts[1],10) || 0;
            return { y: yr, m: monthNames.indexOf(mon) };
          }
          return { y: 0, m: monthNames.indexOf(s) };
        };
        const A = parseMy(a.month);
        const B = parseMy(b.month);
        if (A.y !== B.y) return A.y - B.y;
        return A.m - B.m;
      });

      setTransactions(txs);
      setData(groupedArray);
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  // 🔹 Add new transaction via backend
  const handleAddTransaction = async ({ amount, type, date, category }) => {
    try {
      await api.post("/finance/add", {
        amount,
        type,
        date,
        category,
      });
      fetchHistory(); // refresh after add
    } catch (err) {
      console.error("Failed to add transaction:", err);
    }
  };

  const handleDeleteLocal = (id) => {
    // remove from transactions state
    const remaining = transactions.filter((t) => t.id !== id);
    setTransactions(remaining);

    // recompute grouped data for charts
    const grouped = remaining.reduce((acc, tx) => {
      let m = tx.month;
      if (!m && tx.date) {
        try {
          const d = new Date(tx.date);
          m = d.toLocaleString("en-US", { month: "short" }) + "/" + d.getFullYear();
        } catch (e) {
          m = "Unknown";
        }
      }
      if (!m) m = "Unknown";
      if (!acc[m]) acc[m] = { month: m, income: 0, expenses: 0 };
      if (tx.type === "income") acc[m].income += tx.amount;
      else acc[m].expenses += tx.amount;
      return acc;
    }, {});
    const groupedArray = Object.values(grouped);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    groupedArray.sort((a,b) => {
      const parseMy = (s) => {
        if (!s || s === 'Unknown') return { y: 0, m: -1 };
        const parts = s.split('/');
        if (parts.length === 2) {
          const mon = parts[0];
          const yr = parseInt(parts[1],10) || 0;
          return { y: yr, m: monthNames.indexOf(mon) };
        }
        return { y: 0, m: monthNames.indexOf(s) };
      };
      const A = parseMy(a.month);
      const B = parseMy(b.month);
      if (A.y !== B.y) return A.y - B.y;
      return A.m - B.m;
    });
    setData(groupedArray);
  };

  const handleUpdateLocal = (updated) => {
    // update transactions state
    const updatedList = transactions.map((t) => (t.id === updated.id ? { ...t, ...updated } : t));
    setTransactions(updatedList);

    // recompute grouped data
    const grouped = updatedList.reduce((acc, tx) => {
      let m = tx.month;
      if (!m && tx.date) {
        try {
          const d = new Date(tx.date);
          m = d.toLocaleString("en-US", { month: "short" }) + "/" + d.getFullYear();
        } catch (e) {
          m = "Unknown";
        }
      }
      if (!m) m = "Unknown";
      if (!acc[m]) acc[m] = { month: m, income: 0, expenses: 0 };
      if (tx.type === "income") acc[m].income += tx.amount;
      else acc[m].expenses += tx.amount;
      return acc;
    }, {});
    const groupedArray = Object.values(grouped);
    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    groupedArray.sort((a,b) => {
      const parseMy = (s) => {
        if (!s || s === 'Unknown') return { y: 0, m: -1 };
        const parts = s.split('/');
        if (parts.length === 2) {
          const mon = parts[0];
          const yr = parseInt(parts[1],10) || 0;
          return { y: yr, m: monthNames.indexOf(mon) };
        }
        return { y: 0, m: monthNames.indexOf(s) };
      };
      const A = parseMy(a.month);
      const B = parseMy(b.month);
      if (A.y !== B.y) return A.y - B.y;
      return A.m - B.m;
    });
    setData(groupedArray);
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pb-20">
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
  <TransactionHistory transactions={transactions} onDelete={handleDeleteLocal} onUpdate={handleUpdateLocal} />
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Total Income
              </h2>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                Ksh {data.reduce((acc, cur) => acc + cur.income, 0)}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center transition-colors duration-300">
              <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                Total Expenses
              </h2>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                Ksh {data.reduce((acc, cur) => acc + cur.expenses, 0)}
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
                  <XAxis dataKey="month" stroke="#1f2937" />
                  <YAxis stroke="#1f2937" />
                  <Tooltip contentStyle={{ backgroundColor: "white" }} />
                  <Legend />
                  <Line type="monotone" dataKey="income" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
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
                  <XAxis dataKey="month" stroke="#1f2937" />
                  <YAxis stroke="#1f2937" />
                  <Tooltip contentStyle={{ backgroundColor: "white" }} />
                  <Legend />
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
