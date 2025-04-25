import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
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
} from "@mui/material";
import { postApihandler } from "../../Apihandler";
import Swal from "sweetalert2";
import Header from "../../Components/Header";
import { Navigate, useNavigate } from "react-router-dom";

export default function ChefAvailability() {
  const [chefCategory, setChefCategory] = useState("");
  const [availability, setAvailability] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
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

  const handleAvailabilityChange = (event) => {
    const { value, checked } = event.target;
    setAvailability((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };

  const addAvailability = async (e) => {
    e.preventDefault();
    const chefId = localStorage.getItem("userData");
    const Id = JSON.parse(chefId);
    console.log("chef id ---->", Id);
    if (!chefId) {
      console.error("Chef ID not found in local storage");
      return;
    }
    const data = {
      chefId: Id._id,
      days: availability,
      startTime: time,
      endTime: endtime,
      country: country,
      state: state,
      city: city,
      price: price,
      chefCategory: chefCategory,
    };
    console.log("data is --->", data);
    const res = await postApihandler("/chefAvailability", data);
    console.log("add availabilty api response is --->", res);
    if (res.message === "Availability created successfully") {
      Swal.fire({
        // title: "Good job!",
        text: "Availability created successfully",
        icon: "success",
      });
      navigate("/chefavailable");
    } else {
      Swal.fire("Error", res.message || "An unknown error occurred.", "error");
    }
  };
  return (
    <>
      <Header />
      <h2>Chef Availability</h2>

      <Container className="mt-4 d-flex justify-content-center py-3">
        <Box sx={{ width: "500px" }}>
          <Form>
            {/* {/ Chef Category Selection /} */}
            <FormControl fullWidth className="mb-3">
              <InputLabel>Chef Category</InputLabel>
              <Select
                value={chefCategory}
                onChange={(e) => setChefCategory(e.target.value)}
              >
                <MenuItem value="North Indian">North Indian</MenuItem>
                <MenuItem value="South Indian">South Indian</MenuItem>
                <MenuItem value="Chinese">Chinese</MenuItem>
                <MenuItem value="Italian">Italian</MenuItem>
                <MenuItem value="Italian">Continental</MenuItem>
                <MenuItem value="Italian">Pastry & Bakery Chef</MenuItem>
                <MenuItem value="Italian">Pan Asian</MenuItem>
                <MenuItem value="Italian">Arabic</MenuItem>
                <MenuItem value="Italian">Lebanese</MenuItem>
              </Select>
            </FormControl>

            {/* {/ Availability Selection /} */}
            <FormGroup className="mb-3">
              <h5>Availability</h5>

              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox value={day} onChange={handleAvailabilityChange} />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            {/* {/ Time Selection /} */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" style={{ textAlign: "left" }}>
                  <Form.Label>Start Time</Form.Label>
                  <TextField
                    type="time"
                    fullWidth
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" style={{ textAlign: "left" }}>
                  <Form.Label>End Time</Form.Label>
                  <TextField
                    type="time"
                    fullWidth
                    value={endtime}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* {/ Location Selection /} */}
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>Price Per Hours</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={addAvailability}>
              Submit
            </Button>
          </Form>
        </Box>
      </Container>
    </>
  );
}
