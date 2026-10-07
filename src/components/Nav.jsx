import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Nav() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  }

  async function logout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        VIBETIX
      </Link>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/concerts">
          Concerts
        </Link>

        {user && (
          <Link to="/history">
            My Bookings
          </Link>
        )}

        {user ? (
          <button
            className="nav-button"
            onClick={logout}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-btn"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}