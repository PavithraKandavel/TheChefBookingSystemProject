import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Chef from "./Pages/Chef";
import Review from "./Pages/Review";
import Payment from "./Pages/Payment";
import Booking from "./Pages/Booking";
import Notification from "./Pages/Notification";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/chefs" element={<Chef />} />
          <Route path="/review" element={<Review />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
