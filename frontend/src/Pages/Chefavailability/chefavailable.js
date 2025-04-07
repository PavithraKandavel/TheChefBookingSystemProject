import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { getApihandler, putApihandler } from "../../Apihandler";
import { Box, Button, Modal } from "@mui/material";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import swal from "sweetalert";

import { Col, Form, Row } from "react-bootstrap";

export default function ChefAvailable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    getChefAvailablity();
  }, []);
  const getChefAvailablity = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const chefId = userData._id;

    try {
      const res = await getApihandler(`/getChefAvailabilityById/${chefId}`);
      console.log("get chefs--->", res);
      if (res.status === 200) {
        setData(res.data); // Assuming `data` is an array, take the first item
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  // **** update api ******
  const [chefid, setChefId] = useState("");
  const [index, setIndex] = useState("");

  const [chefCategory, setChefCategory] = useState("");
  const [availability, setAvailability] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [time, setTime] = useState("");
  const [endtime, setEndTime] = useState("");
  const [price, setPrice] = useState(0);
  const handleAvailabilityChange = (event) => {
    const { value, checked } = event.target;
    setAvailability((prev) =>
      checked ? [...prev, value] : prev.filter((day) => day !== value)
    );
  };
  useEffect(() => {
    if (index !== "") {
      const {
        days,
        startTime,
        endTime,
        country,
        state,
        city,
        price,
        chefCategory,
      } = data[index];
      setAvailability(days || "");
      setTime(startTime || "");
      setEndTime(endTime || "");
      setCountry(country || "");
      setState(state || "");
      setCity(city || "");
      setPrice(price || "");
      setChefCategory(chefCategory || "");
    }
  }, [index]);
  const handleUpdateAvailability = async (e) => {
    e.preventDefault();
    const data = {
      // chefId: Id._id,
      days: availability,
      startTime: time,
      endTime: endtime,
      country: country,
      state: state,
      city: city,
      price: price,
      chefCategory: chefCategory,
    };
    const res = await putApihandler(`/updateChefAvailability/${chefid}`, data);
    console.log("update api res --->", res);
    if (res.status === 200) {
      swal({
        icon: "success",
        text: "Availability updated successfully",
      });
      getChefAvailablity();
      setOpen(false);
    } else {
      swal(
        "Error",
        res.error.response.data.message || "An unknown error occurred.",
        "error"
      );
    }
  };
  return (
    <>
      <Header />
      <div className="container mt-4">
        {loading ? (
          <p className="text-center text-primary">Loading...</p>
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="card p-3 shadow mb-3">
              <h3 className="text-secondary">Availability Details</h3>
              <p>
                <strong>Location:</strong> {item.city}, {item.state},{" "}
                {item.country}
              </p>
              <p>
                <strong>Available Days:</strong> {item.days}
              </p>
              <p>
                <strong>Time Slot:</strong> {item.startTime} - {item.endTime}
              </p>
              <p className="text-muted">
                <strong>Price:</strong> {item.price}
              </p>
              <div>
                <Button
                  sx={{ backgroundColor: "#8B4513", color: "white" }}
                  onClick={() => {
                    setChefId(item._id);
                    setIndex(index);
                    setOpen(true);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-danger">No availability data found.</p>
        )}
      </div>
      {/* ******* update modal ********* */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "90%", // Responsive width
            maxWidth: "600px", // Maximum width
            bgcolor: "background.paper",
            borderRadius: "10px",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh", // Prevents modal from exceeding screen height
            overflowY: "auto", // Enables scrolling inside modal
          }}
        >
          <Form>
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
                <MenuItem value="Continental">Continental</MenuItem>
                <MenuItem value="Pastry & Bakery Chef">
                  Pastry & Bakery Chef
                </MenuItem>
                <MenuItem value="Pan Asian">Pan Asian</MenuItem>
                <MenuItem value="Arabic">Arabic</MenuItem>
                <MenuItem value="Lebanese">Lebanese</MenuItem>
              </Select>
            </FormControl>

            {/* Availability Selection */}
            <FormGroup className="mb-3">
              <h5>Availability</h5>
              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      value={day}
                      checked={availability.includes(day)}
                      onChange={handleAvailabilityChange}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            {/* Time Selection */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
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
                <Form.Group className="mb-3">
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

            {/* Location & Pricing */}
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                value={country}
                placeholder="Enter country"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                value={city}
                placeholder="Enter city"
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price Per Hour</Form.Label>
              <Form.Control
                type="text"
                value={price}
                placeholder="Enter Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              variant="primary"
              type="submit"
              onClick={handleUpdateAvailability}
              sx={{ backgroundColor: "#8B4513", color: "white" }}
            >
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
}
