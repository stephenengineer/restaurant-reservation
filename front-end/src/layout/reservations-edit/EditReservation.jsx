import React, { useEffect, useState } from "react";
import ReservationForm from "../reservations/ReservationForm";
import ErrorAlert from "../ErrorAlert";
import { useParams } from "react-router";
import { readReservation } from "../../utils/api";

function EditReservation({
  reservationsErrors,
  setReservationsErrors,
  reservation,
  setReservation,
}) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formState, setFormState] = useState(initialFormState);
  const { reservationId } = useParams();

  useEffect(loadEditReservationPage, [
    reservationId,
    setReservationsErrors,
    setReservation,
    reservation,
  ]);

  function loadEditReservationPage() {
    const abortController = new AbortController();
    setReservationsErrors(null);
    readReservation(reservationId, abortController.signal)
      .then(setReservation)
      .catch(setReservationsErrors)
      .then(() => {
        setFormState((previousFormState) => {
          return {
            ...previousFormState,
            ...reservation,
          };
        });
      });
    return () => abortController.abort();
  }

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      <ReservationForm
        formState={formState}
        setFormState={setFormState}
        reservationsErrors={reservationsErrors}
        setReservationsErrors={setReservationsErrors}
        editMode={true}
      />
    </>
  );
}

export default EditReservation;
