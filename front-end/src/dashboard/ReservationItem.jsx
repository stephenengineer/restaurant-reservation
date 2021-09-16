import React from "react";

function ReservationItem({ reservation }) {
  const seatButton = reservation.status === "booked" && (
    <button>
      <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
    </button>
  );

  return (
    reservation &&
    reservation.status !== "finished" && (
      <div style={{ borderStyle: "solid" }}>
        {JSON.stringify(reservation)}
        <p data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </p>
        {seatButton}
      </div>
    )
  );
}

export default ReservationItem;
