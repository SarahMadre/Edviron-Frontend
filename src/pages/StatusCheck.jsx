//CONNECTION

import { useState } from "react";
import api from "../api/axiosConfig";
import Table from "../components/Table";

const StatusCheck = () => {
  const [customerId, setCustomerId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchByCustomerId = async () => {
    if (!customerId) return;
    try {
      const res = await api.get(`/transactions/status/${customerId}`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); // clear table if error occurs
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Check Transactions by Customer</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <button
          onClick={fetchByCustomerId}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Check
        </button>
      </div>

      <Table data={transactions} />
    </div>
  );
};

export default StatusCheck;

