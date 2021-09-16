import React from "react";
import { deleteReservationFromTable } from "../utils/api";

function TableItem({table, loadDashboard, tablesErrors, setTablesErrors}) {
  const freeOrOccupied = table.reservation_id ? "Occupied" : "Free";
  const finishButton = freeOrOccupied === "Occupied" && <button data-table-id-finish={table.table_id} onClick={() => finish()}>Finish</button>;

  const finish = () => {
    async function removeReservationFromTable(table) {
      try {
        await deleteReservationFromTable(table.table_id, new AbortController().abort());
        loadDashboard();
      } catch (error) {
        setTablesErrors((currentErrors) => error);
      }
    }

    if (window.confirm("Is this table ready to seat new guests? This cannot be undone.")) {
      setTablesErrors(null);
      removeReservationFromTable(table);
    }
  }

  return table && (
    <div style={{borderStyle: "solid"}}>
      {JSON.stringify(table)}
      <p data-table-id-status={table.table_id}>{freeOrOccupied}</p>
      {finishButton}
    </div>
  )
}

export default TableItem;