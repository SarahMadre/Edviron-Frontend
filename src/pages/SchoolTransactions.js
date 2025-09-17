import { useState } from "react";
import api from "../api/axiosConfig";
import Table from "../components/Table";

const SchoolTransactions = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const fetchBySchool = async (id) => {
    if (!id) {
      setTransactions([]); // clear table if input is empty
      return;
    }
    try {
      const res = await api.get(`/transactions/school/${id}`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]); // clear table on error
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSchoolId(value);
  };

  const handleSearch = () => {
    fetchBySchool(schoolId);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transactions by School</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={schoolId}
          onChange={handleInputChange}
          placeholder="Enter school ID..."
          className="border rounded px-2 py-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Search
        </button>
      </div>

      <Table data={transactions} />
    </div>
  );
};

export default SchoolTransactions;
