import Select from 'react-select';

const statusOptions = [
  { value: 'Completed', label: 'Completed' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Failed', label: 'Failed' },
];

export default function Filter({
  statusFilter,
  setStatusFilter,
  schoolFilter,
  setSchoolFilter,
  dateFilter,
  setDateFilter,
  schoolOptions = []
}) {
  return (
    <div className="flex gap-4 mb-4 items-center flex-wrap">
      {/* Status Multi-Select */}
      <div className="w-64">
        <Select
          options={statusOptions}
          isMulti
          placeholder="Filter by Status"
          value={statusOptions.filter(opt => statusFilter.includes(opt.value))}
          onChange={selected => setStatusFilter(selected.map(s => s.value))}
        />
      </div>

      {/* School Multi-Select */}
      <div className="w-64">
        <Select
          options={schoolOptions}
          isMulti
          placeholder="Filter by School"
          value={schoolOptions.filter(opt => schoolFilter.includes(opt.value))}
          onChange={selected => setSchoolFilter(selected.map(s => s.value))}
        />
      </div>

      {/* Date Filter */}
      {/* <input
        type="date"
        value={dateFilter}
        onChange={e => setDateFilter(e.target.value)}
        className="border p-2 rounded"
      /> */}
    </div>
  );
}


