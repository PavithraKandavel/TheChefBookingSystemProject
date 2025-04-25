import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city"; // <- Import from package
import "./Banner.css";
import bannerImg from "../../Images/banner.jpg";

const Banner = () => {
  const [chefCategory, setChefCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const countries = Country.getAllCountries();
    setCountryList(countries);
  }, []);

  useEffect(() => {
    if (country) {
      const states = State.getStatesOfCountry(country);
      setStateList(states);
      setState("");
      setCity("");
      setCityList([]);
    }
  }, [country]);

  useEffect(() => {
    if (state) {
      const cities = City.getCitiesOfState(country, state);
      setCityList(cities);
    }
  }, [state, country]);

  const handleSearch = () => {
    navigate(
      `/search-results?chefCategory=${encodeURIComponent(
        chefCategory
      )}&country=${encodeURIComponent(country)}&state=${encodeURIComponent(
        state
      )}&city=${encodeURIComponent(city)}`
    );
  };

  return (
    <div className="split-page-container">
      <div className="left-side">
        <img src={bannerImg} alt="Bakery" />
      </div>

      <div className="right-side">
        <Container maxWidth="sm">
          <Typography variant="h4" className="form-title">
            Find a Chef
          </Typography>
          <Typography variant="body1" className="form-subtitle">
            Fill in the details to search for the perfect chef.
          </Typography>

          <form>
            {/* Chef Category */}
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

            {/* Country Dropdown */}
            <FormControl fullWidth className="mb-3">
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                input={<OutlinedInput label="Country" />}
              >
                {countryList.map((c) => (
                  <MenuItem key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* State Dropdown */}
            <FormControl fullWidth className="mb-3" disabled={!country}>
              <InputLabel>State</InputLabel>
              <Select
                value={state}
                onChange={(e) => setState(e.target.value)}
                input={<OutlinedInput label="State" />}
              >
                {stateList.map((s) => (
                  <MenuItem key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* City Dropdown */}
            <FormControl fullWidth className="mb-3" disabled={!state}>
              <InputLabel>City</InputLabel>
              <Select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                input={<OutlinedInput label="City" />}
              >
                {cityList.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSearch}
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
