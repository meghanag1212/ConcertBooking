import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ConcertOverview from "./pages/ConcertOverview";
import TicketBooking from "./pages/TicketBooking";
import BookingHistory from "./pages/BookingHistory";
import Cancellation from "./pages/Cancellation";

function App() {
  return (
    <BrowserRouter>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/concerts" element={<ConcertOverview />} />

        <Route
          path="/concert/:id"
          element={<TicketBooking />}
        />

        <Route
          path="/history"
          element={<BookingHistory />}
        />

        <Route
          path="/cancellation"
          element={<Cancellation />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;