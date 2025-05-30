import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getApihandlerByParams, postApihandler } from "../../Apihandler";
import Header from "../../Components/Header";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Button,
} from "@mui/material";
import swal from "sweetalert";

const SearchResults = () => {
  const location = useLocation();
  const history = useNavigate();
  const [chefs, setChefs] = useState([]);
  console.log("chefs is", chefs);
  const [loading, setLoading] = useState(true);

  // Extract search parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const chefCategory = queryParams.get("chefCategory");
  const country = queryParams.get("country");
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const filters = { chefCategory, country, state, city };
        const response = await getApihandlerByParams("/chefs/search", filters);
        console.log("Response:", response);
        if (response.status === 200) {
          setChefs(response.data);
        }
      } catch (error) {
        console.error("Error fetching chefs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, [chefCategory, country, state, city]);
  // ****** book chef api ******
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData._id;

  const BookChef = async (chefId, chefAvailabilityId, price) => {
    const item = {
      userId,
      chefId: chefId,
      chefAvailabilityId: chefAvailabilityId,
    };
    const res = await postApihandler("/bookChef", item);
    if (res.status === 200) {
      history(`/payment/${chefId}/${chefAvailabilityId}/${price}`);
    } else {
      const errorMessage = res?.error?.response?.data?.message;

      if (
        errorMessage === "You have already booked this chef for this time slot."
      ) {
        swal("Error", errorMessage, "error").then(() => {
          history("/mybookings");
        });
      } else {
        swal("Error", errorMessage || "An unknown error occurred.", "error");
      }
    }
  };
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Showing results for{" "}
          <strong>{chefCategory || "All Categories"}</strong> in{" "}
          {city || "All Cities"}, {state || "All States"},{" "}
          {country || "All Countries"}
        </Typography>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <CircularProgress />
          </div>
        ) : chefs.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {chefs.map((chef) => (
              <Grid item xs={12} sm={6} md={4} key={chef._id}>
                <Card
                  sx={{ borderRadius: "12px", boxShadow: 3, height: "300px" }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#8B4513" }}
                    >
                      {chef.chefCategory}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {chef.country}, {chef.state}, {chef.city}
                    </Typography>
                    {chef.availability?.map((slot, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                      >
                        Available: {slot.day} {slot.startTime} - {slot.endTime}
                      </Typography>
                    ))}
                    <div className="mt-3">
                      <Button
                        style={{ backgroundColor: "#8B4513", color: "white" }}
                        onClick={() =>
                          BookChef(
                            chef.chefId._id,
                            chef._id,
                            chef.priceType,
                            chef.totalEarning
                          )
                        }
                      >
                        Book Chef
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 5, color: "gray" }}>
            No chefs found.
          </Typography>
        )}
      </Container>
    </>
  );
};

export default SearchResults;
