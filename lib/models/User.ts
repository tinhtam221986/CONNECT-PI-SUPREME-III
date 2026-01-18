import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  piId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  avatar: String,
  rank: {
    type: String,
    enum: ['👑 Supreme Elite', '💎 Verified Pioneer', '🌟 Active Pioneer', '🔒 Restricted'],
    default: '🌟 Active Pioneer'
  },
  walletAddress: String,
  bio: String,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
