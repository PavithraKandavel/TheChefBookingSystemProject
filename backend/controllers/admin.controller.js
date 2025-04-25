const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const { Mongoose } = require('mongoose');
const admin = require('../models/admin.model');
const user = require("../models/user.model");
const { chef } = require('../models/chef.model');
const ChefBooking = require('../models/ChefBooking.model');
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');



function generateToken(userid) {
    return jwt.sign({ id: userid }, config.secret, { expiresIn: 15552000 });
}


exports.createAdmin = async (req, res) => {
    try {
        const { admin_Name, admin_Email,  password } = req.body;

        // Validating email, full name, mobile number, password, and confirm password
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!admin_Email) {
            return res.status(400).send({ message: "Email is required", status: 400 });
        } else if (!admin_Email.match(emailRegex)) {
            return res.status(400).send({ message: "Please provide a valid Email address", status: 400 });
        }

        if (!admin_Name) {
            return res.status(400).send({ message: "admin  name is required", status: 400 });
        } 

        

        if (!password) {
            return res.status(400).send({ message: "Password is required", status: 400 });
        } 

        

        const checkEmail = await admin.findOne({ admin_Email }).lean();
        if (checkEmail) {
            return res.status(409).send({ message: 'Email already exists', status: 409 });
        }


        const data = await admin.create({
            admin_Name:admin_Name,
            admin_Email: admin_Email.toLowerCase(),
            password: bcrypt.hashSync(password,)
        });

        return res.status(200).send({ data, message: "Congratulations! Your account has been created successfully!", status: 200 });

    } catch (error) {
        return res.status(500).send({ message: error.message || 'Some error occurred while creating an account', status: 500 });
    }
};


//admin login
exports.adminLogin = (req, res) => {
    // Request validation
    if (!req.body || !req.body.admin_Email || !req.body.password) {
        return res.status(400).send({message: 'Please provide both admin email and password.',status: 400});
    }

    const admin_Email = req.body.admin_Email.toLowerCase();

    // Check, get, and verify login data from the database
    admin.findOne({ "admin_Email": admin_Email, deleteFlag: false })
        .then(foundAdmin => {
            if (!foundAdmin) {
                return res.status(404).send({ message: 'Email does not exist.', status: 404 });
            }

            console.log(foundAdmin)

            const passwordIsValid = bcrypt.compareSync(req.body.password, foundAdmin.password);
            if (!passwordIsValid) {
                return res.status(401).send({message: "Invalid password!.",status: 401});
            }

            const token = generateToken(foundAdmin._id);
            return res.status(200).send({ accessToken: token, data: foundAdmin, status: 200 });
        })
        .catch(err => {
            res.status(500).send({ message: 'Internal server error.', status: 500 });
        });
};


// get all user data
exports.getAllUsers = async (req, res) => {
    try {

        // Fetch all users except those marked as deleted
        const users = await user.find({ deleteFlag: false }).select('-password'); // Exclude the password field
        const totalCount = await user.countDocuments({ deleteFlag: false }); // Count the total users

        return res.status(200).send({ 
            data: users, 
            totalCount, // Include the total count
            message: "Users fetched successfully", 
            status: 200 
        });

    } catch (error) {
        return res.status(500).send({ 
            message: error.message || 'An error occurred while fetching users', 
            status: 500 
        });
    }
};


// Edit user data by admin
exports.editUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { user_Name, user_Email, country_code, mobile_no } = req.body;

        // Validate request data
        if (!user_Name || !user_Email || !country_code || !mobile_no) {
            return res.status(400).send({ message: 'All fields are required', status: 400 });
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!user_Email.match(emailRegex)) {
            return res.status(400).send({ message: 'Please provide a valid email address', status: 400 });
        }

        const existingUser = await user.findOne({ _id: userId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        const updatedUser = await user.findOneAndUpdate(
            { _id: userId },
            { $set: { user_Name, user_Email, country_code, mobile_no } },
            { new: true }
        );

        return res.status(200).send({ data: updatedUser, message: 'User updated successfully', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Error updating user', status: 500 });
    }
};


// Delete user by admin
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const existingUser = await user.findOne({ _id: userId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'User not found', status: 404 });
        }

        await user.findOneAndUpdate(
            { _id: userId },
            { $set: { deleteFlag: true } }
        );

        return res.status(200).send({ message: 'User deleted successfully', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Error deleting user', status: 500 });
    }
};


// get All chef

exports.getAllChef = async (req, res) => {
    try {

        // Fetch all chef except those marked as deleted
        const chefs = await chef.find({ deleteFlag: false }).select('-password'); // Exclude the password field
        const totalCount = await chef.countDocuments({ deleteFlag: false }); // Count the total users

        return res.status(200).send({ 
            data: chefs, 
            totalCount, // Include the total count
            message: "Chefs fetched successfully", 
            status: 200 
        });

    } catch (error) {
        return res.status(500).send({ 
            message: error.message || 'An error occurred while fetching users', 
            status: 500 
        });
    }
};



// Edit chef data by admin
exports.editChef = async (req, res) => {    

    try {
        const userId = req.params.chefId;
        const { chef_Name, chef_Email, country_code, mobile_no } = req.body;

        // Validate request data
        if (!chef_Name || !chef_Email || !country_code || !mobile_no) {
            return res.status(400).send({ message: 'All fields are required', status: 400 });
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!chef_Email.match(emailRegex)) {
            return res.status(400).send({ message: 'Please provide a valid email address', status: 400 });
        }

        const existingUser = await chef.findOne({ _id: userId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'Chef not found', status: 404 });
        }

        const updatedChef = await chef.findOneAndUpdate(
            { _id: userId },
            { $set: { chef_Name, chef_Email, country_code, mobile_no } },
            { new: true }
        );

        return res.status(200).send({ data: updatedChef, message: 'Chef updated successfully', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Error updating user', status: 500 });
    }
};

// Delete chef by admin
exports.deleteChef = async (req, res) => {
    try {
        const userId = req.params.chefId;

        const existingUser = await chef.findOne({ _id: userId }).lean();
        if (!existingUser) {
            return res.status(404).send({ message: 'Chef not found', status: 404 });
        }

        await chef.findOneAndUpdate(
            { _id: userId },
            { $set: { deleteFlag: true } }
        );

        return res.status(200).send({ message: 'Chef deleted successfully', status: 200 });
    } catch (error) {
        return res.status(500).send({ message: error.message || 'Error deleting user', status: 500 });
    }
};


// Get total count of users, vendors, and events
exports.getTotalCounts = async (req, res) => {
    try {
        const totalUsers = await user.countDocuments(); 
        const totalChefs = await chef.countDocuments(); 

        res.status(200).json({
            totalUsers,
            totalChefs,
            // totalEvents,
            message: "Counts fetched successfully",
            status: 200
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            status: 500,
            error: error.message
        });
    }
};


// API for Admin to get all chef bookings
exports.getAllChefBookings = async (req, res) => {
    try {
      // Fetch all bookings (excluding deleted ones)
      const bookings = await ChefBooking.find({ deleteFlag: false })
        .populate({
          path: "userId",
          select: "user_Name", // Fetch user's name
        })
        .populate({
          path: "chefId",
          select: "chef_Name chefCategory", // Fetch chef details
        })
        .populate({
          path: "chefAvailabilityId",
          select: "date timeSlot", // Fetch availability details
        })
        .sort({ createdAt: -1 }); // Sort by latest bookings
  
      if (!bookings.length) {
        return res.status(404).json({ message: "No bookings found", status: 404 });
      }
  
      res.status(200).json({ data: bookings, message: 'Chef Bookings data retrieved successfully', status: 200 });
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  };


  // Get all reviews (Admin)
exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.find()
        .populate({ path: "userId", select: "user_Name" })  // Fetch user name
        .populate({ path: "chefId", select: "chef_Name" })  // Fetch chef name
        .populate({ path: "chefBookingId", select: "status" }); // Fetch booking status
  
      if (!reviews.length) {
        return res.status(404).json({ message: "No reviews found", status: 404 });
      }
  
      res.status(200).json({ data: reviews, message: "All reviews fetched successfully", status: 200 });
  
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  };
  

exports.getAllNotification = async (req, res) => {
    try {
      
  
      const alrt = await Notification.find();
        
      if (!alrt.length) {
        return res.status(404).json({ message: "No notification found", status: 404 });
      }
  
      res.status(200).json({ data: alrt, message: "Notification get successfully", status: 200 });
  
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  };


exports.getAllCount = async (req, res) => {
    try {
        const userCount = await user.countDocuments();
        const chefCount = await chef.countDocuments();
        const bookingCount = await ChefBooking.countDocuments();
        const notificationCount = await Notification.countDocuments();
    
        res.status(200).json({
          userCount,
          chefCount,
          bookingCount,
          notificationCount
        });
      } catch (error) {
        console.error('Error fetching counts:', error);
        res.status(500).json({ message: 'Error fetching counts', error });
      }
  };