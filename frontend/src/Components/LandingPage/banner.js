import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  OutlinedInput,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import "./Banner.css";
import bannerImg from "../../Images/banner.jpg";

const Banner = () => {
  const [chefCategory, setChefCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    // Redirect with search parameters
    navigate(
      `/search-results?chefCategory=${encodeURIComponent(chefCategory)}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <div className="split-page-container">
      <div className="left-side">
        <img src={bannerImg} alt="Bakery" />
      </div>

      <div className="right-side">
        <Container maxWidth="sm">
          <Typography variant="h4" className="form-title">Find a Chef</Typography>
          <Typography variant="body1" className="form-subtitle">
            Fill in the details to search for the perfect chef.
          </Typography>

          <form>
            <FormControl fullWidth className="mb-3">
              <InputLabel>Chef Category</InputLabel>
              <Select
                value={chefCategory}
                onChange={(e) => setChefCategory(e.target.value)}
                input={<OutlinedInput label="Chef Category" />}
              >
                {[
                  "North Indian",
                  "South Indian",
                  "Chinese",
                  "Italian",
                  "Continental",
                  "Pastry & Bakery Chef",
                  "Pan Asian",
                  "Arabic",
                  "Lebanese",
                ].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth label="Country" placeholder="Enter country" variant="outlined" className="mb-3"
              onChange={(e) => setCountry(e.target.value)}
            />
            <TextField
              fullWidth label="State" placeholder="Enter state" variant="outlined" className="mb-3"
              onChange={(e) => setState(e.target.value)}
            />
            <TextField
              fullWidth label="City" placeholder="Enter city" variant="outlined" className="mb-3"
              onChange={(e) => setCity(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={()=>handleSearch()}
              sx={{
                backgroundColor: "#8B4513",
                color: "white",
                padding: "12px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": { backgroundColor: "#5A2E0E" },
              }}
            >
              Search Chef
            </Button>
          </form>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
