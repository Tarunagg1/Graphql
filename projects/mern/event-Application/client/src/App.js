import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Fragment } from "react";
import Auth from "./pages/Auth";
import Event from "./pages/Event";
import Booking from "./pages/Booking";
import Navigation from "./components/Navigation";
import AuthContext from "./context/authContext";

function App() {
  return (
    <Fragment>
      <AuthContext.Provider>
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/event" element={<Event />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="*" element={<Navigate to="/auth" />} />
        </Routes>
      </AuthContext.Provider>
    </Fragment>
  );
}

export default App;
