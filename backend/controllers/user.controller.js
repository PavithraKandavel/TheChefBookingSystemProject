const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const user = require('../models/user.model');
const ChefBooking = require('../models/ChefBooking.model');

const Review = require("../models/review.model"); 
const Payment = require("../models/payment.model"); 


const Message = require('../models/message.model')


function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}


exports.userSignUp = async (req, res) => {
    let user_Email = req.body.user_Email ? req.body.user_Email : "";
    let user_Name = req.body.user_Name ? req.body.user_Name : "";
    let country_code = req.body.country_code ? req.body.country_code : "";
  
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let password = req.body.password ? req.body.password : "";
    let confirmPassword = req.body.confirmPassword
      ? req.body.confirmPassword
      : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      if (user_Email === null || user_Email === "") {
        return res
          .status(400)
          .send({ message: "email is required", status: 200 });
      } else {
        if (!user_Email.match(mailformat)) {
          return res
            .status(400)
            .send({ message: "email is not in correct form", status: 400 });
        } else {
          if (user_Name === "" || user_Name === null) {
            return res
              .status(400)
              .send({ message: "Full name is required", status: 200 });
          }else {
              if (country_code === "" || country_code === null) {
                return res
                  .status(400)
                  .send({ message: "Country code is required", status: 200 });
              } else {
                if (mobile_no === null || mobile_no === "") {
                  return res.status(400).send({
                    message: "Mobile Number is required",
                    status: 400,
                  });
                } else {
                  if (mobile_no.length < 7) {
                    return res.status(400).send({
                      message: "Mobile number cannot be less than 7 digits. ",
                      status: 400,
                    });
                  } else {
                    if (mobile_no.length > 10) {
                      return res.status(400).send({
                        message:
                          "Mobile numbers cannot be more than 15 digits long.",
                        status: 400,
                      });
                    } else {
                      if (isNaN(mobile_no)) {
                        return res.status(400).send({
                          message: "Mobile number must only contains digits",
                          status: 400,
                        });
                      } else {
                        if (password === null || password === "") {
                          return res.status(400).send({
                            message: "Password is required",
                            status: 400,
                          });
                        } else {
                          if (password.length < 8) {
                            return res.status(400).send({
                              message:
                                "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                              status: 400,
                            });
                          } else {
                            if (!password.match(passformat)) {
                              return res.status(400).send({
                                message:
                                  "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)",
                                status: 400,
                              });
                            } else {
                              if (
                                confirmPassword === "" ||
                                confirmPassword === null
                              ) {
                                return res.status(400).send({
                                  message: "confirm password is required",
                                  status: 400,
                                });
                              } else {
                                if (confirmPassword !== password) {
                                  return res.status(400).send({
                                    message:
                                      "password and confirm password are not the same",
                                    status: 400,
                                  });
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      
  
      let checkEmail = await user.find({ user_Email: user_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await user.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await user.create({
        user_Email: user_Email,
        user_Name: user_Name,
        country_code: country_code,
        mobile_no: mobile_no,
        password: bcrypt.hashSync(password, 8),
        
      });
  
      return res
        .status(200)
        .send({ data: data, message: "Success", status: 200 });
    } catch (error) {
      return res
        .status(500)
        .send({  message: error.message, status: 500 });
    }
  };



exports.userLogin = async (req, res) => {
    try {
        const user_Email = (req.body.user_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!user_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const userData = await user.findOne({ "user_Email": user_Email, deleteFlag: false });

        if (!userData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, userData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(userData._id);
        return res.status(200).send({ accessToken: token, data: userData, message: 'Login successful!', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error.', status: 500 });
    }
};






exports.changeUserPassword = async (req, res) => {
    try {
        const usersRegId = req.params.usersRegId;
        const oldPassword = req.body.oldPassword || '';
        const newPassword = req.body.newPassword || '';
        const confirmPassword = req.body.confirmPassword || '';
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;


        // Validate request data
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).send({ message: 'All password fields must be provided', status: 400 });
        } else {
            if (!newPassword.match(passwordRegex)) {
                return res.status(400).send({ message: "Password must be a combination of 8 characters long ( including at least one uppercase and one lowercase letter,a number, and a symbol)", status: 400 });
            }
        }

        if (newPassword !== confirmPassword) {
            return res.status(401).send({ message: 'New password and confirm password do not match', status: 401 });
        }

        const existingUser = await user.findOne({ _id: usersRegId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingUser.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await user.findOneAndUpdate({ _id: usersRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};



//messages functionality

exports.sendMessage = async (req, res) => {
  try {
      const { user_Id, chef_Id, senderType, messageText } = req.body;

      if (!user_Id || !chef_Id || !senderType || !messageText) {
          return res.status(400).json({ message: "All fields are required." });
      }

      // senderId and receiverId logic based on senderType
      let senderId, receiverId;
      if (senderType === 'user') {
          senderId = user_Id;
          receiverId = chef_Id;
      } else if (senderType === 'chef') {
          senderId = chef_Id;
          receiverId = user_Id;
      } else {
          return res.status(400).json({ message: "Invalid sender type." });
      }

      const message = new Message({
          user_Id,
          chef_Id,
          senderType,
          senderId,
          receiverId,
          messageText
      });

      await message.save();

      return res.status(201).json({ message: "Message sent successfully.", data: message });

  } catch (error) {
      console.error("Error in sendMessage:", error);
      return res.status(500).json({ message: error.message });
  }
};


exports.getMessages = async (req, res) => {
  try {
      const { user_Id, chef_Id } = req.query;

      if (!user_Id || !chef_Id) {
          return res.status(400).json({ message: "User ID and Vendor ID are required." });
      }

      const messages = await Message.find({ user_Id, chef_Id }).sort({ timestamp: 1 });

      return res.status(200).json({ message: "Messages retrieved successfully.", data: messages });

  } catch (error) {
      console.error("Error in getMessages:", error);
      return res.status(500).json({ message: error.message });
  }
};


// api for user to get booked chef's
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find all bookings for the user that are not deleted
    const bookings = await ChefBooking.find({ userId, deleteFlag: false })
      .populate({
        path: "chefId",
        select: "chef_Name chefCategory", // Fetch chef's chef_Name and chefCategory
      })
      .populate({
        path: "chefAvailabilityId",
        // select: "date timeSlot", // Fetch booking details
      });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this user", status: 404 });
    }

    res.status(200).json({ data: bookings, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};



// API for user to submit a review
exports.submitReview = async (req, res) => {
  try {
    const { userId, chefId, chefBookingId, rating, reviewText } = req.body;

    // Validate input fields
    if (!userId || !chefId || !chefBookingId || !rating || !reviewText) {
      return res.status(400).json({ message: "All fields are required", status: 400 });
    }

    // Check if booking exists
    const bookingExists = await ChefBooking.findOne({ _id: chefBookingId, userId, chefId, deleteFlag: false });

    if (!bookingExists) {
      return res.status(404).json({ message: "Booking not found", status: 404 });
    }

    // Check if payment exists & is completed for this booking
    const paymentExists = await Payment.findOne({
      userId,
      chefId,
      chefAvailabilityId: bookingExists.chefAvailabilityId,
      paymentStatus: "Completed"
    });

    await ChefBooking.updateOne({ _id: bookingExists._id }, { reviewStatus: true });
    if (!paymentExists) {
      return res.status(403).json({ message: "You can only review after completing a payment", status: 403 });
    }

    // Save review
    const newReview = new Review({
      userId,
      chefId,
      chefBookingId, // Store booking ID with review
      rating,
      reviewText
    });

    await newReview.save();

    // ✅ Fetch user and chef details
    const populatedReview = await Review.findById(newReview._id)
      .populate({ path: "userId", select: "user_Name" })  // Fetch user name
      .populate({ path: "chefId", select: "chef_Name" })  // Fetch chef name
      .populate({ path: "chefBookingId", select: "status" }); // Fetch booking status


    res.status(200).json({
      review: populatedReview,
      message: "Review submitted successfully",
      status: 200
    });

  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};


// Get reviews submitted by a specific user
exports.getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    const reviews = await Review.find({ userId })
      .populate({ path: "chefId", select: "chef_Name" })  // Fetch chef name
      .populate({ path: "chefBookingId", select: "status" }); // Fetch booking status

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this user", status: 404 });
    }

    res.status(200).json({ data: reviews, message: "User reviews fetched successfully", status: 200 });

  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};

