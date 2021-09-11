import React, { useState } from "react";
import ReservationForm from "../reservations/ReservationForm";
import ErrorAlert from "../ErrorAlert";

function CreateReservation({reservationsErrors, setReservationsErrors}) {
  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: ""
  }

  const [formState, setFormState] = useState(initialFormState);

  return (
    <>
      <ErrorAlert error={reservationsErrors} />
      <ReservationForm
        formState={formState}
        setFormState={setFormState}
        reservationsErrors={reservationsErrors}
        setReservationsErrors={setReservationsErrors}
      />
    </>
  )
}

export default CreateReservation;