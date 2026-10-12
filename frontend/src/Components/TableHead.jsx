const TableHead = ({ columns = [] }) => {
  return (
    <thead className="bg-primary text-secondary">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-5 py-4 ${column.className || ""}`}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
