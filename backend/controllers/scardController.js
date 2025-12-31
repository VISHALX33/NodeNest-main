import Scard from "../models/Scard.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import moment from "moment";

// ============================
// Badge logic
// ============================
const getBadge = (points) => {
  if (points < 20) return "Bronze 3rd";
  if (points < 40) return "Bronze 2nd";
  if (points < 60) return "Bronze 1st";
  if (points < 80) return "Silver 3rd";
  if (points < 100) return "Silver 2nd";
  if (points < 120) return "Silver 1st";
  if (points < 140) return "Gold 3rd";
  if (points < 160) return "Gold 2nd";
  if (points < 180) return "Gold 1st";
  if (points < 200) return "Platinum 3rd";  
  if (points < 220) return "Platinum 2nd";
  if (points < 240) return "Platinum 1st";
  if (points < 260) return "Diamond 3rd";
  if (points < 280) return "Diamond 2nd";
  if (points < 300) return "Diamond 1st";
  if (points < 320) return "Crown 3rd";
  if (points < 340) return "Crown 2nd";
  if (points < 360) return "Crown 1st"; 
  if (points < 380) return "ACE";
  if (points < 400) return "ACE+";
  if (points < 420) return "ACE++";
  if (points < 450) return "Master";
  if (points < 500) return "Master+";
  if (points < 600) return "Master++";
  if (points < 750) return "Legend";
  if (points < 900) return "Legend+";
  if (points < 1100) return "Legend++";
  if (points < 1350) return "Mythic";
  return "Mythic+"; // 1350+ points
};

// ============================
// Random points for scratch card
// ============================
const generateCardPoints = () => Math.floor(Math.random() * 11); // 0-10

// ============================
// Get or create today's scard
// ============================
export const getTodayScard = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;

    const today = moment().startOf("day").toDate();
    const weekNumber = moment().week();
    const month = moment().month() + 1;

    // Check if today's scard exists
    let scard = await Scard.findOne({ userId, date: today });

    if (!scard) {
      // Calculate lifetime points from previous scards
      const prevScard = await Scard.find({ userId }).sort({ date: -1 }).limit(1);
      const prevLifetime = prevScard.length > 0 ? prevScard[0].lifetimePoints || 0 : 0;

      scard = new Scard({
        userId,
        userName,
        date: today,
        cards: [
          { points: generateCardPoints() },
          { points: generateCardPoints() }
        ],
        totalPointsToday: 0,
        weekNumber,
        weeklyPoints: prevScard.length > 0 ? prevScard[0].weeklyPoints : 0,
        weeklyBadge: prevScard.length > 0 ? prevScard[0].weeklyBadge : "Bronze 3rd",
        monthlyPoints: prevScard.length > 0 ? prevScard[0].monthlyPoints : 0,
        monthlyBadge: prevScard.length > 0 ? prevScard[0].monthlyBadge : "Bronze 3rd",
        lifetimePoints: prevLifetime,
        month
      });

      await scard.save();
    }

    res.json({ success: true, scard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ============================
// Scratch a card
// ============================
export const scratchCard = async (req, res) => {
  try {
    const userId = req.user._id;
    const { cardIndex } = req.body;

    if (![0, 1].includes(cardIndex))
      return res.status(400).json({ success: false, message: "Invalid card index" });

    const today = moment().startOf("day").toDate();
    const scard = await Scard.findOne({ userId, date: today });

    if (!scard)
      return res.status(400).json({ success: false, message: "Today's scard not found" });

    if (scard.cards[cardIndex].scratched)
      return res.status(400).json({ success: false, message: "Card already scratched" });

    // Scratch the card
    scard.cards[cardIndex].scratched = true;
    scard.totalPointsToday = scard.cards.reduce(
      (sum, c) => sum + (c.scratched ? c.points : 0),
      0
    );

    // Update weekly, monthly, lifetime points
    scard.weeklyPoints += scard.cards[cardIndex].points;
    scard.monthlyPoints += scard.cards[cardIndex].points;
    scard.lifetimePoints += scard.cards[cardIndex].points;

    // Update badges
    scard.weeklyBadge = getBadge(scard.weeklyPoints);
    scard.monthlyBadge = getBadge(scard.monthlyPoints);

    await scard.save();

    res.json({ success: true, scard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ============================
// Leaderboard (weekly/monthly/lifetime)
// ============================
export const leaderboard = async (req, res) => {
  try {
    const { type } = req.query; // weekly, monthly, or lifetime
    const now = moment();

    let scards;
    if (type === "weekly") {
      scards = await Scard.aggregate([
        { $match: { weekNumber: now.week() } },
        {
          $group: {
            _id: "$userId",
            userName: { $first: "$userName" },
            points: { $max: "$weeklyPoints" },
            badge: { $first: "$weeklyBadge" }
          }
        },
        { $sort: { points: -1 } }
      ]);
    } else if (type === "monthly") {
      scards = await Scard.aggregate([
        { $match: { month: now.month() + 1 } },
        {
          $group: {
            _id: "$userId",
            userName: { $first: "$userName" },
            points: { $max: "$monthlyPoints" },
            badge: { $first: "$monthlyBadge" }
          }
        },
        { $sort: { points: -1 } }
      ]);
    } else if (type === "lifetime") {
      scards = await Scard.aggregate([
        {
          $group: {
            _id: "$userId",
            userName: { $first: "$userName" },
            points: { $max: "$lifetimePoints" }
          }
        },
        { $sort: { points: -1 } }
      ]);
    } else {
      return res.status(400).json({ success: false, message: "Invalid leaderboard type. Use 'weekly', 'monthly', or 'lifetime'" });
    }

    // Assign rank and calculate badge for lifetime
    let rank = 1;
    const leaderboard = scards.map((s) => ({
      userName: s.userName,
      points: s.points,
      badge: type === "lifetime" ? getBadge(s.points) : s.badge,
      rank: rank++
    }));

    res.json({ success: true, leaderboard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ============================
// User Profile
// ============================
export const userProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const userName = req.user.name;
    const userUniId = req.user.user_uni_id;

    const scards = await Scard.find({ userId }).sort({ date: -1 });
    if (!scards || scards.length === 0)
      return res.json({ 
        success: true, 
        profile: {
          userName: userName,
          user_uni_id: userUniId,
          totalPointsToday: 0,
          weeklyPoints: 0,
          weeklyBadge: "Bronze 3rd",
          monthlyPoints: 0,
          monthlyBadge: "Bronze 3rd",
          lifetimePoints: 0
        }
      });

    const latest = scards[0];
    res.json({
      success: true,
      profile: {
        userName: userName,
        user_uni_id: userUniId,
        totalPointsToday: latest.totalPointsToday,
        weeklyPoints: latest.weeklyPoints,
        weeklyBadge: latest.weeklyBadge,
        monthlyPoints: latest.monthlyPoints,
        monthlyBadge: latest.monthlyBadge,
        lifetimePoints: latest.lifetimePoints
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
