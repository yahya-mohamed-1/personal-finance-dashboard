import React, { useState, useEffect } from "react";

function EditTransactionModal({ isOpen, onClose, transaction, onSave }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (transaction) {
      setAmount(transaction.amount ?? "");
      setType(transaction.type ?? "income");
      setDate(transaction.date ?? "");
      setCategory(transaction.category ?? "");
    }
  }, [transaction]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (isNaN(value) || value <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    onSave({ id: transaction.id, amount: value, type, date: date || null, category });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Edit Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-3 py-2 border rounded-lg" required />
          <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-3 py-2 border rounded-lg">
            <option value="income">Income</option>
            <option value="expenses">Expense</option>
          </select>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTransactionModal;
