import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import ReservationItem from "./ReservationItem";
import TableItem from "./TableItem";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({
  date,
  reservations,
  setReservations,
  tables,
  setTables,
  reservationsErrors,
  setReservationsErrors,
  tablesErrors,
  setTablesErrors,
}) {
  const history = useHistory();

  useEffect(loadDashboard, [
    date,
    setReservations,
    setTables,
    setReservationsErrors,
    setTablesErrors,
  ]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    setTablesErrors(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);
    listTables(abortController.signal).then(setTables).catch(setTablesErrors);
    return () => abortController.abort();
  }

  const reservationsList = reservations.map((reservation) => (
    <ReservationItem
      key={reservation.reservation_id}
      reservation={reservation}
    />
  ));

  const tablesList = tables.map((table) => (
    <TableItem key={table.table_id} table={table} />
  ));

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsErrors} />
      <ErrorAlert error={tablesErrors} />
      Reservations: <br></br>
      {reservationsList}
      Tables: <br></br>
      {tablesList}
      <button onClick={() => history.push(`/dashboard?date=${previous(date)}`)}>
        Previous
      </button>
      <button onClick={() => history.push(`/dashboard?date=${next(date)}`)}>
        Next
      </button>
      <button onClick={() => history.push(`/dashboard?date=${today()}`)}>
        Today
      </button>
    </main>
  );
}

export default Dashboard;
