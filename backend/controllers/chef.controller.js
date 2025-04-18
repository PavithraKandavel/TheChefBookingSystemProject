const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const { chef, ChefAvailability } = require('../models/chef.model');
const ChefBooking = require('../models/ChefBooking.model');
const user = require('../models/user.model')
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');

function generateToken(chefid) {
    return jwt.sign({ id: chefid }, config.secret, { expiresIn: 15552000 });
}


exports.chefSignUp = async (req, res) => {
    let chef_Email = req.body.chef_Email ? req.body.chef_Email : "";
    let chef_Name = req.body.chef_Name ? req.body.chef_Name : "";
    let country_code = req.body.country_code ? req.body.country_code : "";
  
    let mobile_no = req.body.mobile_no ? req.body.mobile_no : "";
    let password = req.body.password ? req.body.password : "";
    let confirmPassword = req.body.confirmPassword
      ? req.body.confirmPassword
      : "";
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var passformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s)/;
  
    try {
      if (chef_Email === null || chef_Email === "") {
        return res
          .status(400)
          .send({ message: "email is required", status: 200 });
      } else {
        if (!chef_Email.match(mailformat)) {
          return res
            .status(400)
            .send({ message: "email is not in correct form", status: 400 });
        } else {
          if (chef_Name === "" || chef_Name === null) {
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
      
  
      let checkEmail = await chef.find({ chef_Email: chef_Email }).lean();
      if (checkEmail.length > 0) {
        return res
          .status(409)
          .send({ message: "Email already exists", status: 409 });
      }
  
      let checkMobileNo = await chef.find({ mobile_no: mobile_no }).lean();
      if (checkMobileNo.length > 0) {
        return res
          .status(409)
          .send({ message: "Mobile number already exists", status: 409 });
      }
  
      let data = await chef.create({
        chef_Email: chef_Email,
        chef_Name: chef_Name,
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


exports.chefLogin = async (req, res) => {
    try {
        const chef_Email = (req.body.chef_Email || '').toLowerCase();
        const password = req.body.password || '';

        // Validation
        if (!chef_Email || !password) {
            return res.status(400).send({ message: 'Please provide both email and password.', status: 400 });
        }

        const chefData = await chef.findOne({ "chef_Email": chef_Email, deleteFlag: false });

        if (!chefData) {
            return res.status(404).send({ message: 'Your email is not registered with us.', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(password, chefData.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Please enter a valid password.', status: 401 });
        }

        const token = generateToken(chefData._id);
        return res.status(200).send({ accessToken: token, data: chefData, message: 'Login successful!', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: 'Internal server error.', status: 500 });
    }
};


exports.changechefPassword = async (req, res) => {
    try {
        const chefsRegId = req.params.chefsRegId;
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

        const existingchef = await chef.findOne({ _id: chefsRegId }).lean();
        if (!existingchef) {
            return res.status(404).send({ message: 'chef not found', status: 404 });
        }

        const passwordIsValid = bcrypt.compareSync(oldPassword, existingchef.password);
        if (!passwordIsValid) {
            return res.status(401).send({ message: 'Incorrect old password', status: 401 });
        }

        await chef.findOneAndUpdate({ _id: chefsRegId }, { $set: { password: bcrypt.hashSync(newPassword, 8) } });

        return res.status(200).send({ message: 'Password changed successfully', status: 200 });
    } catch (err) {
        return res.status(500).send({ message: err.message || 'Error changing password', status: 500 });
    }
};


exports.createChefAvailability = async (req, res) => {
  try {
      const { chefId, days, startTime, endTime, country, state, city, price,chefCategory} = req.body;

      const newAvailability = await ChefAvailability.create({
          chefId,
          days,
          startTime,
          endTime,
          country,
          state,
          city,
          price,
          chefCategory
      });

      return res.status(200).send({ data: newAvailability, message: "Availability created successfully", status: 200 });
  } catch (error) {
      return res.status(500).send({ message: error.message, status: 500 });
  }
};

exports.getChefAvailabilityById = async (req, res) => {
  try {
    const chefAvailability = await ChefAvailability.find({ chefId: req.params.chefId });

    if (!chefAvailability.length) {
      return res.status(404).json({ message: "No availability found for this chef" });
    }

    // res.json(chefAvailability);
    return res.status(200).send({ data: chefAvailability, message: "Chef Availability get successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.updateChefAvailability = async (req, res) => {
  try {
      const { availabilityId } = req.params;
      const { days, startTime, endTime, country, state, city, price, chefCategory} = req.body;

      const updatedAvailability = await ChefAvailability.findByIdAndUpdate(
          availabilityId,
          {
              days,
              startTime,
              endTime,
              country,
              state,
              city,
              price,
              chefCategory
          },
          { new: true } // Return the updated document
      );

      if (!updatedAvailability) {
          return res.status(404).send({ message: "Availability not found", status: 404 });
      }

      return res.status(200).send({ data: updatedAvailability, message: "Availability updated successfully", status: 200 });
  } catch (error) {
      return res.status(500).send({ message: error.message, status: 500 });
  }
};


exports.searchChefs = async (req, res) => {
  try {
    const { country, state, city, chefCategory } = req.query;

    // Build dynamic search filters
    let filters = {};
    if (country) filters.country = country;
    if (state) filters.state = state;
    if (city) filters.city = city;
    if (chefCategory) filters.chefCategory = chefCategory; // Fix: Use chefCategory directly from ChefAvailability

    // Find chef availability records
    const chefAvailability = await ChefAvailability.find(filters).populate({
      path: "chefId",
      select: "name category",
    });

    if (chefAvailability.length === 0) {
      return res.status(200).json({ data: [], message: "No chefs found", status: 200 });
    }

    res.status(200).json({ data: chefAvailability, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};


exports.bookChef = async (req, res) => {
  try {
    const { userId, chefId, chefAvailabilityId } = req.body;

    if (!userId || !chefId || !chefAvailabilityId ) {
      return res.status(400).json({ message: "All fields are required", status: 400 });
    }

    // Check if chef availability exists and is not deleted
    const chefAvailability = await ChefAvailability.findOne({ _id: chefAvailabilityId, chefId });

    if (!chefAvailability) {
      return res.status(404).json({ message: "Chef is not available for booking", status: 404 });
    }
// Fetch user details
const userdata = await user.findById(userId);
if (!userdata) {
    return res.status(404).json({ message: "User not found." });
}

// Fetch chef details
const chefdata = await chef.findById(chefId);
if (!chefdata) {
    return res.status(404).json({ message: "chef not found." });
}

    // Check if a booking already exists and is not deleted
    const existingBooking = await ChefBooking.findOne({
      userId,
      chefId,
      chefAvailabilityId,
      deleteFlag: false, // Ignore soft-deleted bookings
    });

    const notification = new Notification({
      userId: userId,
      user_name:userdata.user_Name,
      chefId: chefId,
      chef_name:chefdata.chef_Name,
      message: `User ${userdata.user_Name} booked ${chefdata.chef_Name} chef.`,
    });
    await notification.save(); // Save the notification

    if (existingBooking) {
      return res.status(400).json({ message: "You have already booked this chef for this time slot.", status: 400 });
    }

    // Create a new booking
    const newBooking = new ChefBooking({
      userId,
      chefId,
      chefAvailabilityId,
      status: "Pending",
    });

    await newBooking.save();

    res.status(200).json({booking: newBooking, message: "Chef booked successfully", status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};




// api for chef to get booked by user
exports.getChefBookings = async (req, res) => {
  try {
    const { chefId } = req.params;

    // Find all bookings for the chef that are not deleted
    const bookings = await ChefBooking.find({ chefId, deleteFlag: false })
      .populate({
        path: "userId",
        select: "user_Name user_Email", // Fetch user details
      })
      .populate({
        path: "chefAvailabilityId",
        // select: "date timeSlot", // Fetch booking details
      });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found for this chef", status: 404 });
    }

    res.status(200).json({ data: bookings, status: 200 });
  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};


// Get reviews for a specific chef
exports.getChefReviews = async (req, res) => {
  try {
    const { chefId } = req.params;

    const reviews = await Review.find({ chefId })
      .populate({ path: "userId", select: "user_Name" })  // Fetch user name
      .populate({ path: "chefBookingId", select: "status" }); // Fetch booking status

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found for this chef", status: 404 });
    }

    res.status(200).json({ data: reviews, message: "Chef reviews get successfully", status: 200 });

  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};


// Get notification for a specific chef
exports.getChefNotification = async (req, res) => {
  try {
    const { chefId } = req.params;

    const alrt = await Notification.find({ chefId })
      
    if (!alrt.length) {
      return res.status(404).json({ message: "No notification found for this chef", status: 404 });
    }

    res.status(200).json({ data: alrt, message: "Chef notification get successfully", status: 200 });

  } catch (error) {
    res.status(500).json({ message: error.message, status: 500 });
  }
};



