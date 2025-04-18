const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chefId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chef',
    required: true
  },
  chefAvailabilityId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChefAvailability',
    required: true
  },
  cardDetails: {
    cardNumber: { type: String, trim: true },
    expiryMonth: { type: String, trim: true },
    expiryYear: { type: String, trim: true },
    cvv:{ type: String, trim: true },
    cardHolderName: { type: String, trim: true }
  },
  price: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    default: 'Completed'
  },
  deleteFlag: {
    type: Boolean,
    default: false
}
}, {
timestamps: true
});

module.exports = mongoose.model('Payment', paymentSchema);