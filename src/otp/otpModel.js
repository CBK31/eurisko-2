const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    otpCode: String,
    expirationTime: Date,
    refreshToken: String,
    accessToken: String,
    isUsed: { type: Boolean, default: false }
});

module.exports = mongoose.model('OTP', otpSchema);
