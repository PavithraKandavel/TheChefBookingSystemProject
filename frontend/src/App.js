import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ResetPassword from "./Pages/ResetPassword";
import Home from "./Pages/Home";
import ChefAvailability from "./Pages/Chefavailability";
import LandingPage from "./Pages/LandingPage";
import SearchResults from "./Pages/SearchResults";
import Profile from "./Pages/Profile";
import ChefAvailable from "./Pages/Chefavailability/chefavailable";
import MyBookings from "./Pages/MyBookings";
import Chats from "./Pages/Chats";
import PaymentPage from "./Pages/Payment";
import MyPayment from "./Pages/Payment/my-payment";
import Review from "./Pages/Review";
import Notification from "./Pages/Notification";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/chefavailablity" element={<ChefAvailability />} />
          <Route path="/chefavailable" element={<ChefAvailable />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/chats/:id" element={<Chats />} />
          <Route path="/payment/:chefId/:avaibility/:price" element={<PaymentPage />} />
          <Route path="/my-payment" element={<MyPayment />} />
          <Route path="/review" element={<Review />} />
          <Route path="/notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
