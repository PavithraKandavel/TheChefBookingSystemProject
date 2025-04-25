import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";
import Header from "../../Components/Header";
import { useNavigate } from "react-router-dom";
import { Country, State, City } from "country-state-city";

export default function ChefAvailability() {
  const [chefCategory, setChefCategory] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryName, setCountryName] = useState("");
  console.log("countryName", countryName);

  const [stateName, setStateName] = useState("");
  console.log("stateName", stateName);

  const [cityName, setCityName] = useState("");
  console.log("cityName", cityName);

  const [currency, setCurrency] = useState("");
  const navigate = useNavigate();

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [availability, setAvailability] = useState(
    daysOfWeek.map((day) => ({
      day,
      isChecked: false,
      startTime: "",
      endTime: "",
    }))
  );

  const currencyOptions = [
    { value: "$", label: "$" },
    { value: "₹", label: "₹" },
    { value: "€", label: "€" },
    { value: "£", label: "£" },
  ];

  const handleCheckboxChange = (index) => {
    const updated = [...availability];
    updated[index].isChecked = !updated[index].isChecked;
    setAvailability(updated);
  };

  const handleTimeChange = (index, field, value) => {
    const updated = [...availability];
    updated[index][field] = value;
    setAvailability(updated);
  };

  const handleCountryChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = countries.find((c) => c.isoCode === selectedCode);

    setCountry(selectedCode);
    setCountryName(selectedCountry?.name || "");

    const allStates = State.getStatesOfCountry(selectedCode);
    setStates(allStates);
    setState("");
    setStateName("");
    setCity("");
    setCityName("");
  };

  const handleStateChange = (e) => {
    const selectedCode = e.target.value;
    const selectedState = states.find((s) => s.isoCode === selectedCode);

    setState(selectedCode);
    setStateName(selectedState?.name || "");

    const allCities = City.getCitiesOfState(country, selectedCode);
    setCities(allCities);
    setCity("");
    setCityName("");
  };

  const handleCityChange = (e) => {
    const selectedName = e.target.value;
    setCity(selectedName);
    setCityName(selectedName);
  };
  const addAvailability = async (e) => {
    e.preventDefault();
    const chefId = localStorage.getItem("userData");
    const Id = JSON.parse(chefId);

    if (!chefId) {
      console.error("Chef ID not found in local storage");
      return;
    }

    // Filter only selected days
    const selectedDays = availability.filter((day) => day.isChecked);

    const data = {
      chefId: Id._id,
      availability: selectedDays,
      country: countryName,
      state: stateName,
      city: cityName,
      priceType: currency,
      price,
      chefCategory,
    };

    const res = await postApihandler("/chefAvailability", data);
    console.log("availability api res is --->", res);
    if (res.message === "Availability created successfully") {
      Swal.fire({
        text: "Availability created successfully",
        icon: "success",
      });
      navigate("/chefavailable");
    } else {
      Swal.fire(
        "Error",
        res.error.response.data.error || "An unknown error occurred.",
        "error"
      );
    }
  };

  return (
    <>
      <Header />
      <h2 className="text-center mt-4">Chef Availability</h2>

      <Container className="mt-4 d-flex justify-content-center py-3">
        <Box sx={{ width: "600px" }}>
          <Form onSubmit={addAvailability}>
            {/* {/ Chef Category /} */}
            <FormControl fullWidth className="mb-3">
              <InputLabel id="chef-category-label">Chef Category</InputLabel>
              <Select
                labelId="chef-category-label"
                value={chefCategory}
                label="Chef Category"
                onChange={(e) => setChefCategory(e.target.value)}
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
                ].map((item) => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* {/ Weekly Availability /} */}
            <Typography variant="h6" gutterBottom>
              Weekly Availability
            </Typography>
            <FormGroup>
              {availability.map((item, index) => (
                <Box
                  key={item.day}
                  sx={{ mb: 2, borderBottom: "1px solid #ccc", pb: 2 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(index)}
                      />
                    }
                    label={item.day}
                  />
                  {item.isChecked && (
                    <Grid container spacing={2} mt={1}>
                      <Grid item xs={6}>
                        <TextField
                          type="time"
                          label="Start Time"
                          fullWidth
                          value={item.startTime}
                          onChange={(e) =>
                            handleTimeChange(index, "startTime", e.target.value)
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          type="time"
                          label="End Time"
                          fullWidth
                          value={item.endTime}
                          onChange={(e) =>
                            handleTimeChange(index, "endTime", e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  )}
                </Box>
              ))}
            </FormGroup>

            {/* {/ Country /} */}
            <FormControl fullWidth className="mb-3">
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                label="Country"
                onChange={handleCountryChange}
              >
                {countries.map((c) => (
                  <MenuItem key={c.name} value={c.isoCode}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* {/ State /} */}
            <FormControl fullWidth className="mb-3">
              <InputLabel>State</InputLabel>
              <Select value={state} label="State" onChange={handleStateChange}>
                {states.map((s) => (
                  <MenuItem key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* {/ City /} */}
            <FormControl fullWidth className="mb-3">
              <InputLabel>City</InputLabel>
              <Select value={city} label="City" onChange={handleCityChange}>
                {cities.map((c) => (
                  <MenuItem key={c.name} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* {/ Currency & Price /} */}
            <Grid container spacing={2} className="mb-3">
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel>Currency</InputLabel>
                  <Select
                    value={currency}
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    {currencyOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <TextField
                  // type="number"
                  label="Price"
                  fullWidth
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* {/ Submit /} */}
            <Box textAlign="center">
              <button type="submit" className="btn btn-primary">
                Submit Availability
              </button>
            </Box>
          </Form>
        </Box>
      </Container>
    </>
  );
}
