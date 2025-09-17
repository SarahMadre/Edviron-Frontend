import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../api/axiosConfig";
import Table from "../components/Table";
import Filter from "../components/Filter";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [schoolFilter, setSchoolFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState("");
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get("/transactions"); // always fetch all
      let filtered = data;

      // Apply filters locally
      if (statusFilter.length) {
        filtered = filtered.filter((tx) => statusFilter.includes(tx.status));
      }
      if (schoolFilter.length) {
        filtered = filtered.filter((tx) => schoolFilter.includes(tx.school_id));
      }
      if (dateFilter) {
        filtered = filtered.filter(
          (tx) =>
            new Date(tx.date).toDateString() ===
            new Date(dateFilter).toDateString()
        );
      }

      setTransactions(filtered);

      // Populate school options
      const schools = [...new Set(data.map((tx) => tx.school_id))].map((id) => ({
        value: id,
        label: id,
      }));
      setSchoolOptions(schools);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // Persist filters in URL
  useEffect(() => {
    fetchTransactions();
    setSearchParams({
      status: statusFilter.join(","),
      school_id: schoolFilter.join(","),
      date: dateFilter,
    });
  }, [statusFilter, schoolFilter, dateFilter]);

  // Sorting function
  const sortedTransactions = React.useMemo(() => {
    if (!sortConfig.key) return transactions;
    const sorted = [...transactions].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [transactions, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">
        Transactions Overview
      </h2>

      <Filter
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        schoolFilter={schoolFilter}
        setSchoolFilter={setSchoolFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
        schoolOptions={schoolOptions}
      />

      <Table
        data={sortedTransactions}
        onSort={handleSort}
        sortConfig={sortConfig}
      />
    </div>
  );
};

export default Dashboard;


