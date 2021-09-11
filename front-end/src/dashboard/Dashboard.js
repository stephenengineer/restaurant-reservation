import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date, reservationsErrors, setReservationsErrors }) {
  const [reservations, setReservations] = useState([]);
  const history = useHistory();

  useEffect(loadDashboard, [date, setReservationsErrors]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsErrors} />
      {JSON.stringify(reservations)}
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
