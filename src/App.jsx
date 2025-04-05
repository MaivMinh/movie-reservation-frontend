import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import MainLayout from "./components/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MovieProvider } from "./context/MovieContext";
import BuyTicket from "./pages/BuyTicket";
import NotFound from "./pages/NotFound.jsx";
import Booking from "./pages/Booking.jsx";
import Payment from "./components/Payment.jsx";
import { BookingProvider } from "./context/BookingContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PublicPage from "./components/PublicPage.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";

function App() {
  return (
    <AuthContextProvider>
      <MovieProvider>
        <BookingProvider>
          <Router>
            <Routes>
              <Route
                path="/login"
                element={
                  <PublicPage>
                    <Login />
                  </PublicPage>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicPage>
                    <Register />
                  </PublicPage>
                }
              />
              <Route
                path="/account/forgot-password"
                element={
                  <PublicPage>
                    <ForgotPassword />
                  </PublicPage>
                }
              />
              <Route
                path="/account/reset-password"
                element={
                  <PublicPage>
                    <ResetPassword />
                  </PublicPage>
                }
              />
              <Route path="/" element={<MainLayout />}>
                <Route
                  index
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/mua-ve/:movieName"
                  element={
                    <PrivateRoute>
                      <BuyTicket />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/booking/:movieName"
                  element={
                    <PrivateRoute>
                      <Booking />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/booking/:movieName/payment"
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </BookingProvider>
      </MovieProvider>
    </AuthContextProvider>
  );
}

export default App;
