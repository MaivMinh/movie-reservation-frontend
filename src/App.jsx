import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AppContextProvider } from "./AppContext";
import { MovieProvider } from "./context/MovieContext";
import BuyTicket from "./pages/BuyTicket";
import Booking from "./pages/Booking.jsx";

function App() {
  return (
    <AppContextProvider>
      <MovieProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="/mua-ve/:movieName" element={<BuyTicket />} />
              <Route path="/booking/:movieName" element={<Booking />} />
            </Route>
          </Routes>
        </Router>
      </MovieProvider>
    </AppContextProvider>
  );
}

export default App;
