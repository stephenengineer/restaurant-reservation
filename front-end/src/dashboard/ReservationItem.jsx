import React from "react";
import { setReservationStatusToCancelled } from "../utils/api";

function ReservationItem({
  reservation,
  showAll = false,
  reservationsErrors,
  setReservationsErrors,
}) {
  const seatAndEditButtons = reservation.status === "booked" && (
    <>
      <button>
        <a href={`/reservations/${reservation.reservation_id}/seat`}>Seat</a>
      </button>
      <button>
        <a href={`/reservations/${reservation.reservation_id}/edit`}>Edit</a>
      </button>
    </>
  );

  const cancelButton = reservation.status !== "cancelled" && (
    <button
      data-reservation-id-cancel={reservation.reservation_id}
      onClick={() => cancel()}
    >
      Cancel
    </button>
  );

  const cancel = () => {
    async function cancelReservation(reservation) {
      try {
        await setReservationStatusToCancelled(
          reservation.reservation_id,
          new AbortController().abort()
        );
        window.location.reload(false);
      } catch (error) {
        setReservationsErrors((currentErrors) => error);
      }
    }

    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      setReservationsErrors(null);
      cancelReservation(reservation);
    }
  };

  if (showAll) {
    return (
      reservation && (
        <div style={{ borderStyle: "solid" }}>
          {JSON.stringify(reservation)}
          <p data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </p>
          {seatAndEditButtons}
          {cancelButton}
        </div>
      )
    );
  }

  return (
    reservation &&
    reservation.status !== "finished" &&
    reservation.status !== "cancelled" && (
      <div style={{ borderStyle: "solid" }}>
        {JSON.stringify(reservation)}
        <p data-reservation-id-status={reservation.reservation_id}>
          {reservation.status}
        </p>
        {seatAndEditButtons}
        {cancelButton}
      </div>
    )
  );
}

export default ReservationItem;
