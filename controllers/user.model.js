const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    user_id: Number,
    first_name: String,
    last_name: { type: String, required: false },
    username: String,
    language: String,
    is_active: Boolean,
    joined_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);