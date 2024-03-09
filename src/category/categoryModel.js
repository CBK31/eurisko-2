const mongoose = require('mongoose');
const schema = mongoose.Schema;

const categorySchema = new schema({
    Name: String,
    description: String

})

module.exports = mongoose.model('Category', categorySchema)