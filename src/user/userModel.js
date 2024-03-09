const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({

    email: String,
    fistName: String,
    lastName: String,
    password: String,
    isVIP: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
})

module.exports = mongoose.model('User', userSchema);