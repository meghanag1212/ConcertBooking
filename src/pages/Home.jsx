import { Link } from "react-router-dom";
import ConcertCard from "../components/ConcertCard";

const concerts = [
  {
    id: 1,
    title: "Neon Nights",
    artist: "The Midnight Collective",
    description:
      "An unforgettable night filled with live music and amazing performances.",
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
    description:
      "A spectacular live performance featuring powerful vocals.",
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
    description:
      "A high-energy evening packed with music and rhythm.",
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
    description:
      "Dance the night away with amazing live performances.",
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
    description:
      "A premium concert experience featuring stunning visuals.",
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
    description:
      "A spectacular evening of live music and entertainment.",
    venue: "KTPO Convention Centre",
    city: "Bengaluru",
    event_date: "2027-02-28T20:00:00+05:30",
    price: 1199,
    image_url:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">THE NIGHT STARTS HERE</p>

          <h1>
            MUSIC.
            <br />
            MEMORIES.
            <br />
            <span>MAGIC.</span>
          </h1>

          <p>
            Discover the hottest live concerts,
            unforgettable performances and
            experiences worth remembering.
          </p>

          <Link to="/concerts" className="hero-button">
            Explore Concerts →
          </Link>
        </div>
      </section>

      <section className="concert-section">
        <div className="section-heading">
          <div>
            <p className="section-label">WHAT'S HAPPENING</p>
            <h2>Upcoming Shows</h2>
          </div>

          <Link to="/concerts">View all →</Link>
        </div>

        <div className="concert-grid">
          {concerts.slice(0, 6).map((concert) => (
            <ConcertCard
              key={concert.id}
              concert={concert}
            />
          ))}
        </div>
      </section>
    </>
  );
}