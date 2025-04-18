const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chefBookingSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User", 
    required: true 
},
  chefId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "Chef", 
    required: true 
},
  chefAvailabilityId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "ChefAvailability", 
    required: true 
},
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled"], 
    default: "Pending" 
},
reviewStatus:{
  type: Boolean,
  default: false  
},
  deleteFlag: { 
    type: Boolean, 
    default: false 
}
}, {
    timestamps: true
});


module.exports = mongoose.model("ChefBooking", chefBookingSchema);
