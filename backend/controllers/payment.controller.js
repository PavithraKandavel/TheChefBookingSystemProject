const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const Chef = require('../models/chef.model');
const ChefBooking = require("../models/ChefBooking.model");
const ChefAvailability = require("../models/chef.model").ChefAvailability;



exports.proceedPayment = async (req, res) => {
    try {
      const { userId, chefId, chefAvailabilityId, cardDetails, price } = req.body;
  
      if (!userId || !chefId || !chefAvailabilityId || !cardDetails || !price) {
        return res.status(400).json({ message: "All fields are required", status: 400 });
      }
  
      // ✅ Find booking with status "Pending" OR "Confirmed"
      let booking = await ChefBooking.findOne({
        userId,
        chefId,
        chefAvailabilityId,
        status: { $in: ["Pending", "Confirmed"] }, // Check for both statuses
        deleteFlag: false
      });
  
      if (!booking) {
        return res.status(404).json({ message: "No valid booking found", status: 404 });
      }
  
      // ✅ Prevent duplicate payment if already completed
      const existingPayment = await Payment.findOne({
        userId,
        chefId,
        chefAvailabilityId,
        paymentStatus: "Completed"
      });
  
      if (existingPayment) {
        return res.status(400).json({ message: "Payment already completed for this booking", status: 400 });
      }
  
      // ✅ Ensure chef is available
      const chefAvailability = await ChefAvailability.findOne({ _id: chefAvailabilityId, chefId });
  
      if (!chefAvailability) {
        return res.status(404).json({ message: "Chef availability not found", status: 404 });
      }
  
      // ✅ Save new payment
      const newPayment = new Payment({
        userId,
        chefId,
        chefAvailabilityId,
        cardDetails,
        price,
        paymentStatus: "Completed",
      });
  
      await newPayment.save();
  
      // ✅ If booking is still "Pending", update to "Confirmed"
      if (booking.status === "Pending") {
        booking.status = "Confirmed";
        await booking.save();
      }
  
      // ✅ Populate user and chef details
      const populatedPayment = await Payment.findById(newPayment._id)
        .populate("userId", "user_Name")
        .populate("chefId", "chef_Name");
  
      res.status(200).json({
        payment: populatedPayment,
        message: "Payment successful and booking confirmed",
        booking_status: booking.status,
        status: 200
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
};



exports.getAllPayments = async (req, res) => {
    try {
      // Fetch all payments with user and chef details
      const payments = await Payment.find()
        .populate("userId", "user_Name") // Get user name
        .populate("chefId", "chef_Name") // Get chef name
        .populate({
          path: "chefAvailabilityId",
          select: "date timeSlot" // Include availability details
        });
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "No payments found", status: 404 });
      }
  
      // ✅ Format response with booking status
      const paymentData = await Promise.all(
        payments.map(async (payment) => {
          // Find booking to get status
          const booking = await ChefBooking.findOne({
            userId: payment.userId,
            chefId: payment.chefId,
            chefAvailabilityId: payment.chefAvailabilityId,
            deleteFlag: false
          });
  
          return {
            _id: payment._id,
           
            userId: payment.userId?._id, // ✅ Include userId
            user_Name: payment.userId?.user_Name || "Unknown",
            chefId: payment.chefId?._id, // ✅ Include chefId
            chef_Name: payment.chefId?.chef_Name || "Unknown",
            chefAvailability: payment.chefAvailabilityId,
            price: payment.price,
            paymentStatus: payment.paymentStatus,
            booking_status: booking ? booking.status : "Not Found", // Booking status
            createdAt: payment.createdAt
          };
        })
      );
  
      res.status(200).json({
        payments: paymentData,
        message: "Payments data retrieved successfully",
        status: 200
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
};



// Get Chef Payment

exports.getChefPayments = async (req, res) => {
    try {
      const { chefId } = req.params; // Get chefId from request params
  
      if (!chefId) {
        return res.status(400).json({ message: "Chef ID is required", status: 400 });
      }
  
      // Fetch payments for the chef
      const payments = await Payment.find({ chefId })
        .populate("userId", "user_Name") // Get userId & user name
        .populate("chefId", "chef_Name") // Get chefId & chef name
        .populate("chefAvailabilityId") // Get availability details
        .sort({ createdAt: -1 }); // Sort by latest payments
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "No payments found for this chef", status: 404 });
      }
  
      // ✅ Format response with booking status
      const paymentData = await Promise.all(
        payments.map(async (payment) => {
          // Find booking to get status
          const booking = await ChefBooking.findOne({
            userId: payment.userId?._id,
            chefId: payment.chefId?._id,
            chefAvailabilityId: payment.chefAvailabilityId?._id,
            deleteFlag: false
          });
  
          return {
            _id: payment._id,
            userId: payment.userId?._id, // ✅ Include userId
            user_Name: payment.userId?.user_Name || "Unknown",
            chefId: payment.chefId?._id, // ✅ Include chefId
            chef_Name: payment.chefId?.chef_Name || "Unknown",
            chefAvailability: {
              _id: payment.chefAvailabilityId?._id
            },
            price: payment.price,
            paymentStatus: payment.paymentStatus, // ✅ Completed / Pending
            booking_status: booking ? booking.status : "Not Found", // ✅ Confirmed / Pending
            createdAt: payment.createdAt
          };
        })
      );
  
      res.status(200).json({
        payments: paymentData,
        message: "Chef payments retrieved successfully",
        status: 200
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message, status: 500 });
    }
  };
  
  
  
  
  
  