/** @format */

import * as React from "react";
import { IconButton } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ManIcon from "@mui/icons-material/Man";
import StarIcon from '@mui/icons-material/Star';
import PaymentIcon from '@mui/icons-material/Payment';
import BookIcon from '@mui/icons-material/Book';
export default function NestedList() {
 
 
  
  

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, backgroundColor: "#FF7F00" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
    >
      <Link to="/dashboard" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <DashboardIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/users" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PeopleIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Users" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/chefs" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <ManIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Chef" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/booking" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <BookIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Booking List" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/review" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <StarIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Review/Rating" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>
      <Link to="/payment" style={{ textDecoration: "none" }}>
        <ListItemButton>
          <ListItemIcon>
            <IconButton>
              <PaymentIcon sx={{ fill: "white" }} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary="Payment List" sx={{ color: "white" }} />
        </ListItemButton>
      </Link>

    
    </List>
  );
}
