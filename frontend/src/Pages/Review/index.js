import React, { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import Header from "../../Components/Header";
import { Card, CardContent, Typography, Box, Rating } from "@mui/material";

export default function Review() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getReview();
  }, []);

  const getReview = async () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const userid = userData._id;
    let res = await getApihandler(`/getChefReviews/${userid}`);
    if (res.status === 200) {
      setData(res.data);
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Typography variant="h5" gutterBottom>
          My Reviews & Ratings
        </Typography>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.map((review) => (
              <Card key={review._id} sx={{ padding: 1.5, borderRadius: 2, boxShadow: 2 }}>
                <CardContent sx={{ paddingBottom: '8px !important' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight="bold">
                      {review.userId.user_Name}
                    </Typography>
                    <Rating value={review.rating} size="small" readOnly />
                  </Box>

                  <Typography sx={{textAlign:"start"}} variant="body2" color="text.secondary" noWrap>
                    {review.reviewText}
                  </Typography>

                  <Typography
                  sx={{textAlign:"start"}}
                    variant="body2"
                    color="text.secondary"
                   
                    
                  >
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Typography color="textSecondary">No reviews found.</Typography>
        )}
      </div>
    </>
  );
}
