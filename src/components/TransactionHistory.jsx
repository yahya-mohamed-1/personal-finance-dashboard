import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown, FileSpreadsheet, Filter, XCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../api";
import EditTransactionModal from "./EditTransactionModal";

function TransactionHistory({ transactions, onDelete, onUpdate }) {
  const [search, setSearch] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  // date range filters removed per UX request
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (setter) => (value) => {
    setter(value);
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setFilterMonth("");
    setFilterType("");
    setFilterCategory("");
    if (window.innerWidth < 1024) {
      setShowFilters(false);
    }
  };

  const isFilterActive = search || filterMonth || filterType || filterCategory;

  const formatMonthYear = (t) => {
    if (t.date) {
      try {
        const d = new Date(t.date);
        return d.toLocaleString("en-US", { month: "short" }) + "/" + d.getFullYear();
      } catch (e) {
        // fall through
      }
    }
    // fallback to stored month (maybe just 'Jan')
    return t.month || "";
  };

  const formatDateOnly = (t) => {
    if (!t || !t.date) return "-";
    try {
      const d = new Date(t.date);
      // return YYYY-MM-DD to avoid any T00:00:00 or time parts
      return d.toISOString().slice(0, 10);
    } catch (e) {
      return t.date.toString().split("T")[0];
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const monthStr = formatMonthYear(t).toString();
    const categoryStr = (t.category || "").toString();
    const typeStr = (t.type || "").toString();
    const amountStr = (t.amount !== undefined && t.amount !== null) ? t.amount.toString() : "";
    const matchesSearch =
      monthStr.toLowerCase().includes(search.toLowerCase()) ||
      categoryStr.toLowerCase().includes(search.toLowerCase()) ||
      typeStr.toLowerCase().includes(search.toLowerCase()) ||
      amountStr.includes(search);

    const matchesMonth = filterMonth ? monthStr === filterMonth : true;
    const matchesType = filterType ? (t.type || "") === filterType : true;
    const matchesCategory = filterCategory
      ? (t.category || "").toLowerCase().includes(filterCategory.toLowerCase())
      : true;

    return (
      matchesSearch &&
      matchesMonth &&
      matchesType &&
      matchesCategory
    );
  });

  // derive month/year filter options from transactions (formatMonthYear)
  const monthOptions = Array.from(
    new Set(
      transactions.map((t) => formatMonthYear(t)).filter((m) => m && m.length > 0)
    )
  );

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export.");
      return;
    }
    const header = ["Date", "Month", "Category", "Type", "Amount"];
    const rows = filteredTransactions.map((t) => [
      formatDateOnly(t),
      formatMonthYear(t) || "-",
      t.category || "-",
      t.type || "-",
      t.amount,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    if (filteredTransactions.length === 0) {
      alert("No transactions to export.");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Transaction History", 14, 20);

    const totalIncome = filteredTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = filteredTransactions
      .filter((t) => t.type === "expenses")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    doc.setFontSize(12);
  doc.setTextColor(0, 128, 0);
  doc.text(`Total Income: Ksh ${totalIncome}`, 14, 30);
  doc.setTextColor(200, 0, 0);
  doc.text(`Total Expenses: Ksh ${totalExpenses}`, 14, 37);
  doc.setTextColor(0, 0, 200);
  doc.text(`Balance: Ksh ${balance}`, 14, 44);
    doc.setTextColor(0, 0, 0);

    const tableColumn = ["Date", "Month", "Category", "Type", "Amount"];
        const tableRows = filteredTransactions.map((t) => [
      formatDateOnly(t),
      formatMonthYear(t) || "-",
      t.category || "-",
      t.type || "-",
          `Ksh ${t.amount}`,
    ]);
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });
    doc.save("transactions.pdf");
  };
  // modal-driven delete
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editTxn, setEditTxn] = useState(null);

  const showConfirm = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/finance/${toDeleteId}`);
      setConfirmOpen(false);
      if (onDelete) onDelete(toDeleteId);
    } catch (err) {
      console.error("Failed to delete transaction:", err);
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  const openEdit = (txn) => {
    setEditTxn(txn);
    setEditOpen(true);
  };

  const handleSaveEdit = async (updated) => {
    try {
      await api.put(`/finance/${updated.id}`, updated);
      if (onUpdate) onUpdate(updated);
    } catch (err) {
      console.error("Failed to update transaction:", err);
      alert(err.response?.data?.msg || "Update failed");
    }
  };

  return (
    <div className="mt-6">
      {/* Top bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        {/* Toggle Filters (mobile only) */}
        <div className="flex justify-between items-center lg:hidden">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100 transition"
          >
            <Filter className="w-4 h-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Export Buttons */}
        <div className="flex gap-2 w-full lg:w-auto justify-center lg:justify-end">
          <button
            onClick={handleExportCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full lg:w-auto"
          >
            <FileSpreadsheet className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full lg:w-auto"
          >
            <FileDown className="w-4 h-4" /> Export PDF
          </button>
        </div>
      </div>

      {/* Filters with animation */}
      <AnimatePresence>
        {(showFilters || window.innerWidth >= 1024) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
              <div className="flex flex-col md:flex-row flex-wrap gap-3 mb-4 mt-2">
              {/* Search and filters ... same as before */}
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 w-full md:w-auto"
              />
              {/* Month filter (Month/Year) */}
              <select
                value={filterMonth}
                onChange={(e) => handleFilterChange(setFilterMonth)(e.target.value)}
                className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full md:w-auto"
              >
                <option value="">All Months</option>
                {monthOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {/* Type filter */}
              <select
                value={filterType}
                onChange={(e) => handleFilterChange(setFilterType)(e.target.value)}
                className="px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 w-full md:w-auto"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expenses">Expense</option>
              </select>
              {/* Category filter */}
              <input
                type="text"
                placeholder="Filter by category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-500 w-full md:w-auto"
              />
              {/* date range filters removed as requested */}
              {isFilterActive && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 dark:bg-gray-600 dark:border-gray-500 dark:hover:bg-gray-500 dark:text-gray-100 transition w-full md:w-auto"
                >
                  <XCircle className="w-4 h-4 text-gray-600 dark:text-gray-100" />{" "}
                  Clear Filters
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      {filteredTransactions.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-gray-500 dark:text-gray-400">
            No transactions found.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Month/Year</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Type</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredTransactions.map((t, idx) => (
                  <motion.tr
                    key={t.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-800 transition text-sm"
                  >
                    <td className="px-4 py-2">{formatDateOnly(t)}</td>
                    <td className="px-4 py-2">{formatMonthYear(t) || "-"}</td>
                    <td className="px-4 py-2">{t.category || "-"}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        t.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {t.type}
                    </td>
                    <td className="px-4 py-2">Ksh {t.amount}</td>
                    <td className="px-4 py-2 text-center space-x-2">
                      <button
                        onClick={() => openEdit(t)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => showConfirm(t.id)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this transaction?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal (delegates to EditTransactionModal component) */}
      {editOpen && (
        <EditTransactionModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          transaction={editTxn}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}

export default TransactionHistory;
