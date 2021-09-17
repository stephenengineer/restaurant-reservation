import React from "react";

function ReservationItem({ reservation, showAll = false }) {
  const seatButton = reservation.status === "booked" && (
    <button>
      <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
    </button>
  );

  if (showAll) {
    return (
      reservation && (
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
