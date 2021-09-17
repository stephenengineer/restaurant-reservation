import React, { useState } from "react";
import { listReservations } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import ReservationItem from "../../dashboard/ReservationItem";

function Search({
  reservations,
  setReservations,
  reservationsErrors,
  setReservationsErrors,
}) {
  const initialFormState = {
    mobile_number: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  const [findButtonClicked, setFindButtonClicked] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setReservationsErrors((currentErrors) => null);

    async function searchForMatchingReservations(formState) {
      const abortController = new AbortController();
      const mobile_phone = formState.mobile_number;
      listReservations({ mobile_phone }, abortController.signal)
        .then(setReservations)
        .catch(setReservationsErrors);
      return () => abortController.abort();
    }

    searchForMatchingReservations(formState);
    setFindButtonClicked((buttonState) => true);
  };

  const handleFormChange = (event) => {
    setFormState((currentState) => {
      return { [event.target.name]: event.target.value };
    });
  };

  const reservationsList = reservations.length
    ? reservations.map((reservation) => (
        <ReservationItem
          key={reservation.reservation_id}
          reservation={reservation}
        />
      ))
    : "No reservations found";

  const searchResults = findButtonClicked ? reservationsList : null;

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="mobile_number">
          Mobile Phone Number
          <input
            name="mobile_number"
            type="tel"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            required
            value={formState.mobile_number}
            onChange={handleFormChange}
          />
        </label>
        <button type="submit">Find</button>
      </form>
      Reservations: <br></br>
      {searchResults}
    </>
  );
}

export default Search;
