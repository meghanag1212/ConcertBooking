import { Link } from "react-router-dom";

export default function ConcertCard({ concert }) {
  return (
    <article className="concert-card">

      {concert.image_url ? (
        <img
          src={concert.image_url}
          alt={concert.title}
          className="concert-image"
        />
      ) : (
        <div className="concert-image placeholder">
          ♪
        </div>
      )}

      <div className="concert-card-content">

        <p className="concert-date">
          {concert.date
            ? new Date(
                concert.date
              ).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "DATE TBA"}
        </p>

        <h3>
          {concert.title}
        </h3>

        <p>
          {concert.artist}
        </p>

        <p className="concert-location">
          📍 {concert.venue || "Venue TBA"}
        </p>

        <div className="concert-card-bottom">

          <strong>
            ₹{concert.price ?? "—"}
          </strong>

          <Link
            to={`/concert/${concert.id}`}
          >
            Book Now
          </Link>

        </div>

      </div>

    </article>
  );
}