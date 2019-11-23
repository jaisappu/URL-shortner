const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urlCode: { type: String, index: true },
    longUrl: { type: String, index: true },
    shortUrl: String,
    expireAt: { type: Date, }, //1 day
}, { timestamps: true }
);

urlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 })
module.exports = mongoose.model('url', urlSchema);