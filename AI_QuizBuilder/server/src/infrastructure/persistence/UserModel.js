const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  aiHitsPerHour: { type: Number, default: 0 },
  lastAiHitAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
