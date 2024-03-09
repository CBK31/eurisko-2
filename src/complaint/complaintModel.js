const mongoose = require('mongoose');
const schema = mongoose.Schema;

const complaintSchema = new schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: String,
    description: String,
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    status: { type: String, enum: ['PENDING', 'IN PROGRESS', 'RESOLVED', 'REJECTED'], default: 'PENDING' },
    creationDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Complaint', complaintSchema);