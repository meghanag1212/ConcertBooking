import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import ConcertCard from "../components/ConcertCard";

export default function ConcertOverview() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConcerts();
  }, []);

  async function loadConcerts() {
    const { data, error } = await supabase
      .from("concerts")
      .select("*")
      .order("date", {
        ascending: true,
      });

    if (error) {
      console.error(error);
    } else {
      setConcerts(data || []);
    }

    setLoading(false);
  }

  return (
    <main className="page-container">

      <div className="page-heading">

        <p className="section-label">
          FIND YOUR NEXT NIGHT OUT
        </p>

        <h1>
          All Concerts
        </h1>

        <p>
          From intimate performances to
          unforgettable stadium nights.
        </p>

      </div>

      {loading ? (
        <div className="loading-page">
          <div className="loader"></div>
          <p>Loading concerts...</p>
        </div>
      ) : concerts.length === 0 ? (
        <div className="empty-state">

          <h2>
            Nothing here yet.
          </h2>

          <p>
            New concerts are coming soon.
          </p>

        </div>
      ) : (
        <div className="concert-grid">

          {concerts.map((concert) => (
            <ConcertCard
              key={concert.id}
              concert={concert}
            />
          ))}

        </div>
      )}

    </main>
  );
}
