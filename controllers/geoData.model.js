const mongoose = require ('mongoose');

const geoDataSchema = new mongoose.Schema({
    user_id: Number,
    username: String,
    latitude: Number,
    longitude: Number,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('geoData', geoDataSchema);

//Реализовать в приложении