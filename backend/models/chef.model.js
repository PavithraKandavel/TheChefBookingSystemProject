const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const chefSchema = new Schema({

    chef_Name: {
        type: String,
        required: [true, "please enter user name"],
    },

    chef_Email: {
        type: String,
        required: [true, "please enter email"],
    },

    country_code:{
        type: String,
    },

    mobile_no:{
        type: String,
        required: [true, "please enter mobile_no"],
    },

    password: {
        type: String,
        required: [true, "please enter password"]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


// Chef Availability Schema
const chefAvailabilitySchema = new Schema({
    chefId: {
        type: ObjectId,
        ref: 'Chef', // Reference to the Chef model
        required: [true, "Chef ID is required"],
    },
    chefCategory: {
        type: String,
        required: [true, "Please provide the chef Category"],
    },
    days: {
        type: [String],
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: [true, "Please provide the days of availability"],
    },
    startTime: {
        type: String,
        required: [true, "Please provide the start time"],
    },
    endTime: {
        type: String,
        required: [true, "Please provide the end time"],
    },
    country: {
        type: String,
        required: [true, "Please provide the country"],
    },
    state: {
        type: String,
        required: [true, "Please provide the state"],
    },
    city: {
        type: String,
        required: [true, "Please provide the city"],
    },
    price: {
        type: Number,
        required: [true, "Please provide the price"],
    }
}, {
    timestamps: true,
});

// Create models
const chef = mongoose.model("Chef", chefSchema);
const ChefAvailability = mongoose.model("ChefAvailability", chefAvailabilitySchema);

// Export both models
module.exports = { chef, ChefAvailability };
