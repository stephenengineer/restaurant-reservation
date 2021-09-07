import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({formState, setFormState}) {
  const {first_name, last_name, mobile_number, reservation_date, reservation_time, people} = formState;
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push("/");
  }

  const handleCancel = () => {
    history.push("/");
  }

  const handleFormChange = (event) => {
    if (formValidation(event)) {
      setFormState((currentState) => {
        return {
        ...currentState,
        [event.target.name]: event.target.value
        }
      })
    }
  }

  const formValidation = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "mobile_number") return !value.replace(/[0-9]/g, "").length;
    if (name === "people") return value > 0;
    return true;
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="first_name">
        First Name
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="First Name"
          required
          value={first_name}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="last_name">
        Last Name
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Last Name"
          required
          value={last_name}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="mobile_number">
        Mobile Number
        <input
          type="text"
          id="mobile_number"
          name="mobile_number"
          placeholder="Mobile Number"
          required
          value={mobile_number}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="reservation_date">
        Reservation Date
        <input
          type="date"
          id="reservation_date"
          name="reservation_date"
          placeholder="Reservation Date"
          required
          value={reservation_date}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="reservation_time">
        Reservation Time
        <input
          type="time"
          id="reservation_time"
          name="reservation_time"
          placeholder="Reservation Time"
          required
          value={reservation_time}
          onChange={handleFormChange}
        />
      </label>
      <label htmlFor="people">
        People
        <input
          type="number"
          id="people"
          name="people"
          placeholder="People"
          required
          value={people}
          onChange={handleFormChange}
        />
      </label>
      <button onClick={() => handleCancel()}>Cancel</button>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ReservationForm;