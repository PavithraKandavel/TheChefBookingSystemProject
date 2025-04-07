import logo from "./logo.svg";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
