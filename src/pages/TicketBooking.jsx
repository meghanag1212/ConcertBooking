
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    image_url:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
  },
  {
    id: 2,
    title: "Echoes Live",
    artist: "Aria",
    venue: "Palace Grounds",
    city: "Bengaluru",
    event_date: "2026-12-20T20:00:00+05:30",
    price: 1499,
    image_url:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
  },
  {
    id: 3,
    title: "After Dark",
    artist: "The Frequency",
    venue: "Jayamahal Palace",
    city: "Bengaluru",
    event_date: "2027-01-10T19:00:00+05:30",
    price: 799,
    image_url:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3",
  },
  {
    id: 4,
    title: "Summer Beats",
    artist: "Aria & Friends",
    venue: "Embassy Grounds",
    city: "Bengaluru",
    event_date: "2027-01-25T18:30:00+05:30",
    price: 1299,
    image_url:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
  },
  {
    id: 5,
    title: "Electric Dreams",
    artist: "Nova",
    venue: "Manpho Convention Centre",
    city: "Bengaluru",
    event_date: "2027-02-14T19:30:00+05:30",
    price: 1799,
    image_url:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
  },
  {
    id: 6,
    title: "Rhythm & Lights",
    artist: "The Soundwave",
    venue: "KTPO Convention Centre",
    city: "Bengaluru",
    event_date: "2027-02-28T20:00:00+05:30",
    price: 1199,
    image_url:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
  },
];

export default function TicketBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const concert = concerts.find(
    (item) => String(item.id) === String(id)
  );

  const [name, setName] = useState("");
  const [tickets, setTickets] = useState(1);
  const [stand, setStand] = useState("General");
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  if (!concert) {
    return (
      <main className="error-page">
        <h2>Concert not found</h2>

        <button onClick={() => navigate("/concerts")}>
          Back to Concerts
        </button>
      </main>
    );
  }

  const prices = {
    General: concert.price,
    Premium: concert.price + 500,
    VIP: concert.price + 1000,
  };

  const ticketPrice = prices[stand];
  const total = ticketPrice * tickets;

  async function bookTicket(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setBooking(true);

    const { error } = await supabase
      .from("bookings")
      .insert({
        name: name.trim(),
        tickets: tickets,
        stand: stand,
        venue: concert.venue,
      });

    if (error) {
      console.error("Booking error:", error);
      setError(error.message);
      setBooking(false);
      return;
    }

    setBooking(false);
    setSuccess(true);
  }

  if (success) {
    return (
      <main className="success-page">
        <div className="success-box">
          <div className="success-icon">✓</div>

          <p className="eyebrow">BOOKING CONFIRMED</p>

          <h1>
            You're going to
            <br />
            {concert.title}
          </h1>

          <p className="success-text">
            Your tickets have been successfully booked.
          </p>

          <div className="ticket-summary">
            <div>
              <span>Name</span>
              <strong>{name}</strong>
            </div>

            <div>
              <span>Tickets</span>
              <strong>{tickets}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{stand}</strong>
            </div>

            <div>
              <span>Price per ticket</span>
              <strong>₹{ticketPrice}</strong>
            </div>

            <div>
              <span>Total</span>
              <strong>₹{total}</strong>
            </div>
          </div>

          <button
            className="primary-button"
            onClick={() => navigate("/history")}
          >
            View My Bookings →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="booking-page">
      <div className="booking-layout">
        <div className="booking-event">
          <div className="event-image-wrapper">
            <img
              src={concert.image_url}
              alt={concert.title}
              className="event-image"
            />

            <div className="image-overlay">
              LIVE EVENT
            </div>
          </div>

          <div className="event-info">
            <p className="eyebrow">UPCOMING CONCERT</p>

            <h1>{concert.title}</h1>

            <h2>{concert.artist}</h2>

            <div className="event-meta">
              <span>
                {new Date(
                  concert.event_date
                ).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>

              <span>{concert.venue}</span>
            </div>

            <div className="event-price">
              ₹{concert.price}
              <small> / ticket starting</small>
            </div>
          </div>
        </div>

        <div className="booking-form-card">
          <div className="form-header">
            <p className="eyebrow">RESERVE YOUR SPOT</p>

            <h2>Book your tickets</h2>

            <p>
              Fill in your details and secure your place
              at the show.
            </p>
          </div>

          <form onSubmit={bookTicket}>
            <div className="input-group">
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Ticket Category</label>

              <div className="category-buttons">
                {["General", "Premium", "VIP"].map(
                  (category) => (
                    <button
                      type="button"
                      key={category}
                      className={
                        stand === category
                          ? "category active"
                          : "category"
                      }
                      onClick={() =>
                        setStand(category)
                      }
                    >
                      <span>{category}</span>

                      <strong>
                        ₹{prices[category]}
                      </strong>
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="input-group">
              <label>Number of Tickets</label>

              <div className="ticket-counter">
                <button
                  type="button"
                  onClick={() =>
                    setTickets(
                      Math.max(1, tickets - 1)
                    )
                  }
                >
                  −
                </button>

                <span>{tickets}</span>

                <button
                  type="button"
                  onClick={() =>
                    setTickets(
                      Math.min(10, tickets + 1)
                    )
                  }
                >
                  +
                </button>
              </div>
            </div>

            <div className="booking-total">
              <div>
                <span>
                  {tickets} ticket
                  {tickets > 1 ? "s" : ""}
                </span>

                <strong>
                  ₹{ticketPrice} × {tickets}
                </strong>
              </div>

              <div className="total-line">
                <span>Total amount</span>

                <strong>₹{total}</strong>
              </div>
            </div>

            {error && (
              <div className="booking-error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="confirm-button"
              disabled={booking}
            >
              {booking
                ? "Confirming..."
                : "Confirm Booking →"}
            </button>
          </form>

          <p className="secure-text">
            Your booking details are securely stored.
          </p>
        </div>
      </div>
    </main>
  );
}



            
