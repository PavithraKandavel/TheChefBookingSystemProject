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

export default function ChefAvailability() {
  const [chefCategory, setChefCategory] = useState("");
  const [availability, setAvailability] = useState([]);
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [time, setTime] = useState("");
  const [endtime, setEndTime] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { chefCategory, availability, location, time };
    console.log("Submitted Data:", formData);
    // API call can be made here
  };
  return (
    <>
      <h2>Chef Availability</h2>

      <Container className="mt-4 d-flex justify-content-center py-3">
        <Box sx={{ width: "500px" }}>
          <Form onSubmit={handleSubmit}>
            {/* Chef Category Selection */}
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
              </Select>
            </FormControl>

            {/* Availability Selection */}
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

            {/* Time Selection */}
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
            {/* Location Selection */}
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                onChange={(e) =>
                  setLocation({ ...location, country: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                onChange={(e) =>
                  setLocation({ ...location, state: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" style={{ textAlign: "left" }}>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                onChange={(e) =>
                  setLocation({ ...location, city: e.target.value })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      </Container>
    </>
  );
}
