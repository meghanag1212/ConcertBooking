import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cancellation() {
  const navigate = useNavigate();

  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  const handleCancellation = (e) => {
    e.preventDefault();

    const bookings =
      JSON.parse(localStorage.getItem("concertBookings")) || [];

    const id = Number(bookingId);

    const booking = bookings.find((item) => item.id === id);

    if (!booking) {
      setMessage("Booking not found. Please check your Booking ID.");
      return;
    }

    if (booking.status === "Cancelled") {
      setMessage("This booking has already been cancelled.");
      return;
    }

    const updated = bookings.map((item) =>
      item.id === id
        ? {
            ...item,
            status: "Cancelled",
          }
        : item
    );

    localStorage.setItem(
      "concertBookings",
      JSON.stringify(updated)
    );

    setMessage("Your booking has been cancelled successfully.");
  };

  return (
    <div className="page">
      <div className="cancellation-box">
        <h1>Cancel Booking</h1>

        <p>
          Enter the Booking ID from your Booking History.
        </p>

        <form onSubmit={handleCancellation}>
          <input
            type="number"
            placeholder="Enter Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />

          <button type="submit" className="cancel-button">
            Cancel Booking
          </button>
        </form>

        {message && <p className="cancel-message">{message}</p>}

        <button
          className="secondary-button"
          onClick={() => navigate("/history")}
        >
          View Booking History
        </button>
      </div>
    </div>
  );
}

export default Cancellation;