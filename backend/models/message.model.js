const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user_Id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'User', 
        required: true 
    },
    chef_Id: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Chef', 
        required: true 
    },
    senderType: { 
        type: String, enum: ['user', 'chef'], 
        required: true 
    },
    senderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    receiverId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    messageText: { 
        type: String, 
        required: true 
    },
    // timestamp: { 
    //     type: Date, 
    //     default: Date.now 
    // }
    deleteFlag: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);
