import mongoose from 'mongoose';

const scardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true }, // store name for leaderboard

  // Daily scratch cards
  date: { type: Date, required: true },
  cards: [
    { points: { type: Number, required: true }, scratched: { type: Boolean, default: false } },
    { points: { type: Number, required: true }, scratched: { type: Boolean, default: false } }
  ],
  totalPointsToday: { type: Number, default: 0 },

  // Weekly tracking
  weekNumber: { type: Number, required: true },
  weeklyPoints: { type: Number, default: 0 },
  weeklyBadge: { type: String, default: 'Bronze 3rd' },
  weeklyRank: { type: Number },

  // Monthly tracking
  month: { type: Number, required: true },
  monthlyPoints: { type: Number, default: 0 },
  monthlyBadge: { type: String, default: 'Bronze 3rd' },
  monthlyRank: { type: Number },

  // Lifetime tracking
  lifetimePoints: { type: Number, default: 0 }, // total points across all time

}, { timestamps: true });

export default mongoose.model('Scard', scardSchema);
