import { useEffect, useState } from "react";
import { supabase } from "../supabase";

const concerts = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "The Midnight Collective",
    venue: "Phoenix Arena",
    city: "Bengaluru",
    event_date: "2026-12-12T19:30:00+05:30",
    price: 999,
  },
  {
    id: 2,
    title: "Echoes Live",
    artist: "Aria",
    venue: "Palace Grounds",
    city: "Bengaluru",
    event_date: "2026-12-20T20:00:00+05:30",
    price: 1499,
  },
  {
    id: 3,
    title: "After Dark",
    artist: "The Frequency",
    venue: "Jayamahal Palace",
    city: "Bengaluru",
    event_date: "2027-01-10T19:00:00+05:30",
    price: 799,
  },
  {
    id: 4,
    title: "Summer Beats",
    artist: "Aria & Friends",
    venue: "Embassy Grounds",
    city: "Bengaluru",
    event_date: "2027-01-25T18:30:00+05:30",
    price: 1299,
  },
  {
    id: 5,
    title: "Electric Dreams",
    artist: "Nova",
    venue: "Manpho Convention Centre",
    city: "Bengaluru",
    event_date: "2027-02-14T19:30:00+05:30",
    price: 1799,
  },
  {
    id: 6,
    title: "Rhythm & Lights",
    artist: "The Soundwave",
    venue: "KTPO Convention Centre",
    city: "Bengaluru",
    event_date: "2027-02-28T20:00:00+05:30",
    price: 1199,
  },
];

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Booking history error:", error);
      setError(error.message);
    } else {
      setBookings(data || []);
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <main className="page-container">
        <div className="loading-page">
          <div className="loader"></div>
          <p>Loading your bookings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="page-container">
      <div className="page-heading">
        <p className="section-label">YOUR CONCERT JOURNEY</p>

        <h1>Booking History</h1>

        <p>
          View all your concert bookings and ticket details.
        </p>
      </div>

      {error && (
        <div className="booking-error">
          {error}
        </div>
      )}

      {!error && bookings.length === 0 && (
        <div className="empty-state">
          <h2>No bookings yet</h2>

          <p>
            Your concert bookings will appear here.
          </p>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="history-list">
          {bookings.map((booking) => {
            const concert = concerts.find(
              (item) => item.venue === booking.venue
            );

            const ticketPrice = concert
              ? booking.stand === "Premium"
                ? concert.price + 500
                : booking.stand === "VIP"
                ? concert.price + 1000
                : concert.price
              : 0;

            const total = ticketPrice * booking.tickets;

            return (
              <div
                className="history-card"
                key={booking.id}
              >
                <div className="history-info">
                  <p className="section-label">
                    CONCERT BOOKING
                  </p>

                  <h2>
                    {concert?.title || "Concert Booking"}
                  </h2>

                  <h3>
                    {concert?.artist || "Live Performance"}
                  </h3>

                  <div className="history-details">
                    <span>
                      <strong>Customer:</strong>{" "}
                      {booking.name}
                    </span>

                    <span>
                      <strong>Tickets:</strong>{" "}
                      {booking.tickets}
                    </span>

                    <span>
                      <strong>Category:</strong>{" "}
                      {booking.stand}
                    </span>

                    <span>
                      <strong>Price per ticket:</strong>{" "}
                      ₹{ticketPrice}
                    </span>

                    <span>
                      <strong>Total Amount:</strong>{" "}
                      ₹{total}
                    </span>

                    <span>
                      <strong>Venue:</strong>{" "}
                      {booking.venue}
                    </span>

                    <span>
                      <strong>City:</strong>{" "}
                      {concert?.city || "Bengaluru"}
                    </span>

                    {concert && (
                      <span>
                        <strong>Event Date:</strong>{" "}
                        {new Date(
                          concert.event_date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    )}

                    {concert && (
                      <span>
                        <strong>Event Time:</strong>{" "}
                        {new Date(
                          concert.event_date
                        ).toLocaleTimeString("en-IN", {
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </span>
                    )}

                    <span>
                      <strong>Booked On:</strong>{" "}
                      {new Date(
                        booking.created_at
                      ).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>

                    <span>
                      <strong>Status:</strong> Confirmed
                    </span>
                  </div>
                </div>

                <div className="history-right">
                  <div className="history-total">
                    ₹{total}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

