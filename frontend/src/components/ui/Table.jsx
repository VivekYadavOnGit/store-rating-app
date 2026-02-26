const Table = ({ columns = [], data = [], renderActions }) => {
    return (
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
        <table className="min-w-full text-sm text-left">
          
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3">
                  {col.label}
                </th>
              ))}
  
              {renderActions && (
                <th className="px-6 py-3 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
  
          <tbody className="divide-y">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (renderActions ? 1 : 0)}
                  className="px-6 py-6 text-center text-gray-400"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-6 py-4">
                      {row[col.key]}
                    </td>
                  ))}
  
                  {renderActions && (
                    <td className="px-6 py-4 text-right">
                      {renderActions(row)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
  
        </table>
      </div>
    )
  }
  
  export default Table