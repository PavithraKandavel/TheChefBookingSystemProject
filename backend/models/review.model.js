const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User", 
    required: true 
},
  chefId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Chef", 
    required: true 
},
  chefBookingId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "ChefBooking", 
    required: true 
}, 
  rating: { 
    type: Number, 
    required: true, min: 1, max: 5 
},
  reviewText: { 
    type: String, 
    required: true 
},
  deleteFlag: {
    type: Boolean,
    default: false
}
}, {
timestamps: true
});

module.exports = mongoose.model("Review", reviewSchema);
