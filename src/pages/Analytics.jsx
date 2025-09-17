import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const COLORS = ["#4ade80", "#facc15", "#f87171"];

export default function Analytics() {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://edviron-school-payment-dashboard-backend.onrender.com/api/transactions");
        const data = await response.json();
        setPaymentData(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading analytics...</p>;
  if (!paymentData.length) return <p className="p-6">No transactions found.</p>;

  // Overall KPIs
  const totalOrder = paymentData.reduce((sum, d) => sum + d.order_amount, 0);
  const totalCollected = paymentData.reduce((sum, d) => sum + d.transaction_amount, 0);
  const pendingAmount = totalOrder - totalCollected;
  const pendingCount = paymentData.filter(d => d.status !== "Completed").length;

  // Payment Status Distribution
  const statusData = Object.entries(paymentData.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));

  // Gateway-wise Comparison
  const gatewayData = Object.entries(paymentData.reduce((acc, d) => {
    if (!acc[d.gateway]) acc[d.gateway] = { Order: 0, Transaction: 0 };
    acc[d.gateway].Order += d.order_amount;
    acc[d.gateway].Transaction += d.transaction_amount;
    return acc;
  }, {})).map(([Gateway, vals]) => ({ Gateway, Order: vals.Order, Transaction: vals.Transaction }));

  // School-wise Summary
  const schoolData = Object.entries(paymentData.reduce((acc, d) => {
    if (!acc[d.school_id]) acc[d.school_id] = { Order: 0, Collected: 0, PendingCount: 0 };
    acc[d.school_id].Order += d.order_amount;
    acc[d.school_id].Collected += d.transaction_amount;
    if (d.status !== "Completed") acc[d.school_id].PendingCount += 1;
    return acc;
  }, {})).map(([SchoolID, vals]) => ({ SchoolID, ...vals }));

  return (
    <div className="p-6 grid gap-6">
      <h1 className="text-2xl font-bold">School Payment Analytics</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold">Total Order Amount</h2>
          <p className="text-2xl font-bold">₹{totalOrder}</p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold">Total Collected</h2>
          <p className="text-2xl font-bold">₹{totalCollected}</p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold">Pending Amount</h2>
          <p className="text-2xl font-bold">₹{pendingAmount}</p>
        </div>
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold">Pending Payments</h2>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold mb-4">Payment Status Distribution</h2>
          <PieChart width={400} height={300}>
            <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        <div className="rounded-2xl shadow-md bg-white p-4">
          <h2 className="text-lg font-semibold mb-4">Gateway-wise Comparison</h2>
          <BarChart width={400} height={300} data={gatewayData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Gateway" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Order" fill="#60a5fa" />
            <Bar dataKey="Transaction" fill="#34d399" />
          </BarChart>
        </div>
      </div>

      {/* School-wise Table */}
      <div className="rounded-2xl shadow-md bg-white p-4 mt-6 overflow-x-auto">
        <h2 className="text-lg font-semibold mb-4">School-wise Summary</h2>
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">School ID</th>
              <th className="px-4 py-2 border">Total Order</th>
              <th className="px-4 py-2 border">Total Collected</th>
              <th className="px-4 py-2 border">Pending Payments</th>
            </tr>
          </thead>
          <tbody>
            {schoolData.map((school) => (
              <tr key={school.SchoolID} className="text-center">
                <td className="px-4 py-2 border">{school.SchoolID}</td>
                <td className="px-4 py-2 border">₹{school.Order}</td>
                <td className="px-4 py-2 border">₹{school.Collected}</td>
                <td className="px-4 py-2 border">{school.PendingCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
