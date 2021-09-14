import React from "react";

function ReservationItem({reservation}) {
  return (
    <div style={{borderStyle: "solid"}}>
      {JSON.stringify(reservation)}
      <button><a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a></button>
    </div>
  )
}

export default ReservationItem;