import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { getApihandler, postApihandler } from "../../Apihandler";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Modal,
  Box,
  TextField,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import MessageIcon from "@mui/icons-material/Message";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import swal from "sweetalert";
export default function MyBookings() {
  const [role, setRole] = useState("");
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  useEffect(() => {
    const check = localStorage.getItem("check");
    if (check) {
      setRole(check);
    }
    if (check === "user") {
      getBookingsUser();
    } else if (check === "chef") {
      getBookingsChef();
    }
  }, []);

  const getBookingsUser = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    const res = await getApihandler(`/getUserBookings/${userid}`);
    console.log("res", res);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const getBookingsChef = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const chefId = userData._id;
    const res = await getApihandler(`/getChefBookings/${chefId}`);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  const handleReviewClick = (booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  const refreshBookings = () => {
    if (role === "user") {
      getBookingsUser();
    } else if (role === "chef") {
      getBookingsChef();
    }
  };
  const handleSubmitReview = async () => {
    let item = {
      userId: selectedBooking.userId,
      chefId: selectedBooking.chefId._id,
      chefBookingId: selectedBooking._id,
      rating: rating,
      reviewText: review,
    };
    let res = await postApihandler("/submitReview", item);
    console.log("response", res);
    if (res.status === 200) {
      swal(" Review added Successfully");
      setOpenModal(false);
      setRating(0);
      setReview("");
      refreshBookings(); // 🔁 Refresh the table after submitting
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
      <div className="container-fluid mx-auto p-4">
        <Typography variant="h4" className="mb-4" gutterBottom>
          My Bookings
        </Typography>
        {data.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {role === "user" ? (
                    <TableCell>Chef Name</TableCell>
                  ) : (
                    <TableCell>User Name</TableCell>
                  )}
                  <TableCell>Category</TableCell>
                  <TableCell>Availability</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Total Earning</TableCell>
                  <TableCell>Total Hours</TableCell>

                  <TableCell>Action</TableCell>
                  {role === "user" && <TableCell>Review/Rating</TableCell>}
                  {role === "user" && <TableCell>Payment</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell>
                      {role === "user"
                        ? booking.chefId.chef_Name
                        : booking.userId.user_Name}
                    </TableCell>
                    <TableCell>
                      {booking.chefAvailabilityId.chefCategory}
                    </TableCell>
                    <TableCell>
                      {booking.chefAvailabilityId.availability?.map(
                        (slot, index) => (
                          <div key={index}>
                            {slot.day}
                            <br />
                            {slot.startTime} - {slot.endTime}
                            <br />
                          </div>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      {booking.chefAvailabilityId.city},{" "}
                      {booking.chefAvailabilityId.state},{" "}
                      {booking.chefAvailabilityId.country}
                    </TableCell>
                    <TableCell>
                      {booking.chefAvailabilityId.priceType}
                      {booking.chefAvailabilityId.price}
                    </TableCell>
                    <TableCell>
                      {parseFloat(
                        booking.chefAvailabilityId.totalEarning
                      ).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {parseFloat(
                        booking.chefAvailabilityId.totalHours
                      ).toFixed(2)}
                    </TableCell>

                    <TableCell>
                      <Link
                        to={`/chats/${
                          role === "user"
                            ? booking.chefId._id
                            : booking.userId._id
                        }`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          startIcon={<MessageIcon />}
                          sx={{
                            backgroundColor: "#e53935",
                            "&:hover": { backgroundColor: "#d2691e" },
                          }}
                        >
                          Chat
                        </Button>
                      </Link>
                    </TableCell>
                    {role === "user" && (
                      <TableCell>
                        {booking.reviewStatus === false ? (
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<StarBorderIcon />}
                            sx={{
                              backgroundColor: "#8bc34a",
                              "&:hover": { backgroundColor: "#4caf50" },
                            }}
                            onClick={() => handleReviewClick(booking)}
                          >
                            Review
                          </Button>
                        ) : (
                          <p style={{ color: "green" }}>Submitted</p>
                        )}
                      </TableCell>
                    )}
                    {role === "user" && (
                      <>
                        {booking.status === "Pending" ? (
                          <TableCell>
                            {" "}
                            <Link
                              to={`/payment/${booking.chefId._id}/${booking.chefAvailabilityId._id}/${booking.chefAvailabilityId.priceType}/${booking.chefAvailabilityId.totalEarning}`}
                            >
                              <Button variant="contained">Payment</Button>
                            </Link>
                          </TableCell>
                        ) : (
                          <p
                            style={{
                              color: "green",
                              textAlign: "left",
                              marginTop: "15px",
                            }}
                          >
                            Completed
                          </p>
                        )}
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography align="center" color="textSecondary">
            No bookings found.
          </Typography>
        )}
      </div>

      {/* Review Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Review
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
          />
          <TextField
            label="Write a review"
            multiline
            rows={4}
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button variant="contained" onClick={handleSubmitReview}>
            Submit
          </Button>
        </Box>
      </Modal>
    </>
  );
}
