import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppContextProvider } from "./context/AppContext.jsx";
import { MovieProvider } from "./context/MovieContext";
import BuyTicket from "./pages/BuyTicket";
import Booking from "./pages/Booking.jsx";
import Payment from "./components/Payment.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";

function App() {
  return (
    <AppContextProvider>
      <MovieProvider>
        <BookingProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="home" element={<Home />} />
                <Route path="/mua-ve/:movieName" element={<BuyTicket />} />
                <Route path="/booking/:movieName">
                  <Route index element={<Booking />} />
                  <Route path="payment" element={<Payment />} />{" "}
                  {/* Remove the leading slash */}
                </Route>
              </Route>
            </Routes>
          </Router>
        </BookingProvider>
      </MovieProvider>
    </AppContextProvider>
  );
}

export default App;
