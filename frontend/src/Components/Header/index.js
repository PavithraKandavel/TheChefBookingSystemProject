import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Home, Info, Contacts, AccountCircle } from "@mui/icons-material";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import "./Header.css";
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import NotificationsIcon from '@mui/icons-material/Notifications';
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [role, setRole] = useState();
  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check) {
      setRole(check);
    }
  }, []);
  return (
    <AppBar position="sticky" className="header">
      <Toolbar className="toolbar">
        {/* Logo */}
        <Typography variant="h6" className="logo">
          ChefFinder
        </Typography>

        {/* Navigation Tabs */}
        <div className="nav-links">
          <Link to="/home" className="nav-item">
            <Home className="nav-icon" /> Home
          </Link>
          <Link to="/mybookings" className="nav-item">
            <BookIcon className="nav-icon" /> My Bookings
          </Link>
          {role === "chef" && (
            <Link to="/chefavailable" className="nav-item">
              <Contacts className="nav-icon" /> Chef Availability
            </Link>
          )}
          {role === "chef" && (
            <Link to="/my-payment" className="nav-item">
              <PaymentIcon className="nav-icon" /> My Payment
            </Link>
          )}
        </div>

        {/* Profile Icon with Dropdown */}
        <div>
        <IconButton onClick={handleMenuOpen} className="profile-btn">
          <PersonIcon fontSize="large" />
        </IconButton>
        {role === "chef" &&
 <Link to="/notification">
 <IconButton onClick={handleMenuOpen} className="profile-btn">
   <NotificationsIcon fontSize="large" />
 </IconButton>
 </Link>

        }
       
        </div>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <Link
            to={"/profile"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          {role === "chef" && (
            <Link
            to={"/review"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleMenuClose}>My Review</MenuItem>
          </Link>
          )}
          <Link
            to={"/login"}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Link>
          
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
