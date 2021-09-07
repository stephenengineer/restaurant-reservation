import React, { useState } from "react";
import ReservationForm from "../reservations/ReservationForm";

function CreateReservation() {
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
      <ReservationForm formState={formState} setFormState={setFormState} />
    </>
  )
}

export default CreateReservation;