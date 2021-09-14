import React from "react";

function TableItem({table}) {
  const freeOrOccupied = table.reservation_id ? "Occupied" : "Free";

  return (
    <div style={{borderStyle: "solid"}}>
      {JSON.stringify(table)}
      <p data-table-id-status={table.table_id}>{freeOrOccupied}</p>
    </div>
  )
}

export default TableItem;