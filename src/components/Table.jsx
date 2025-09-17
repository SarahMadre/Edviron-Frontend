//WORKING CONNECTION
const Table = ({ data }) => {
  // Ensure data is always an array
  const rows = Array.isArray(data) ? data : data ? [data] : [];

  if (rows.length === 0) {
    return <p>No transactions found.</p>;
  }

  // Define fixed headers like your original table
  const headers = [
    { key: "collect_id", label: "Collect ID" },
    { key: "school_id", label: "School ID" },
    { key: "gateway", label: "Gateway" },
    { key: "order_amount", label: "Order Amount" },
    { key: "transaction_amount", label: "Transaction Amount" },
    { key: "status", label: "Status" },
    { key: "custom_order_id", label: "Custom Order ID" },
  ];

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          {headers.map((header) => (
            <th key={header.key} className="border px-4 py-2">
              {header.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((tx, index) => (
          <tr key={tx._id || index} className="hover:bg-gray-100">
            {headers.map((header) => (
              <td key={header.key} className="border px-4 py-2">
                {tx[header.key] != null ? tx[header.key].toString() : "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;




