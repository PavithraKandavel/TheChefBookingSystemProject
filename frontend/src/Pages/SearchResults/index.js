import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getApihandlerByParams } from "../../Apihandler";
import Header from "../../Components/Header";
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from "@mui/material";

const SearchResults = () => {
  const location = useLocation();
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Extract search parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const country = queryParams.get("country");
  const state = queryParams.get("state");
  const city = queryParams.get("city");

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const filters = { category, country, state, city };
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
  }, [category, country, state, city]);

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Search Results
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Showing results for <strong>{category || "All Categories"}</strong> in {city || "All Cities"}, {state || "All States"}, {country || "All Countries"}
        </Typography>

        {loading ? (
          <div className="flex justify-center items-center mt-10">
            <CircularProgress />
          </div>
        ) : chefs.length > 0 ? (
          <Grid container spacing={3} sx={{ mt: 3 }}>
            {chefs.map((chef) => (
              <Grid item xs={12} sm={6} md={4} key={chef._id}>
                <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#8B4513" }}>
                      {chef.chefCategory}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {chef.country}, {chef.state}, {chef.city}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Available: {chef.startTime} - {chef.endTime}
                    </Typography>
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
