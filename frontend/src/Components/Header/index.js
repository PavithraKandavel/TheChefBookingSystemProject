import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem } from "@mui/material";
import { Home, Info, Contacts, AccountCircle } from "@mui/icons-material";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          <Link to="#" className="nav-item">
            <Info className="nav-icon" /> About Us
          </Link>
          <Link to="#" className="nav-item">
            <Contacts className="nav-icon" /> Contact Us
          </Link>
        </div>

        {/* Profile Icon with Dropdown */}
        <IconButton onClick={handleMenuOpen} className="profile-btn">
          <AccountCircle fontSize="large" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <Link to={"/login"}><MenuItem onClick={handleMenuClose}>Logout</MenuItem></Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
