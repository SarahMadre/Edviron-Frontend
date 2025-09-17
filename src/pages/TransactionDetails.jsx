import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../api/axiosConfig';
import Table from '../components/Table';

export default function TransactionDetails() {
  const { schoolId } = useParams();
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const { data } = await axios.get(`/transactions?school_id=${schoolId}`);
      setTransactions(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [schoolId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Transactions for School ID: {schoolId}</h2>
      <Table transactions={transactions} showSchoolColumn={false} />
    </div>
  );
}
