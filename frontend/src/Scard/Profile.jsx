import React from "react";

// Badge steps same as your backend logic (simplified for frontend)
const badgeSteps = [
  { name: "Bronze 3rd", min: 0, max: 20 },
  { name: "Bronze 2nd", min: 20, max: 40 },
  { name: "Bronze 1st", min: 40, max: 60 },
  { name: "Silver 3rd", min: 60, max: 80 },
  { name: "Silver 2nd", min: 80, max: 100 },
  { name: "Silver 1st", min: 100, max: 120 },
  { name: "Gold 3rd", min: 120, max: 140 },
  { name: "Gold 2nd", min: 140, max: 160 },
  { name: "Gold 1st", min: 160, max: 180 },
  { name: "Platinum 3rd", min: 180, max: 200 },
  { name: "Platinum 2nd", min: 200, max: 220 },
  { name: "Platinum 1st", min: 220, max: 240 },
  { name: "Diamond 3rd", min: 240, max: 260 },
  { name: "Diamond 2nd", min: 260, max: 280 },
  { name: "Diamond 1st", min: 280, max: 300 },
  { name: "Crown 3rd", min: 300, max: 320 },
  { name: "Crown 2nd", min: 320, max: 340 },
  { name: "Crown 1st", min: 340, max: 360 },
   { name: "ACE", min: 360, max: 380 },
  { name: "ACE+", min: 380, max: 400 },
  { name: "ACE++", min: 400, max: 420 },
  { name: "Master", min: 420, max: 450 },
  { name: "Master+", min: 450, max: 500 },
  { name: "Master++", min: 500, max: 600 },
  { name: "Legend", min: 600, max: 750 },
  { name: "Legend+", min: 750, max: 900 },
  { name: "Legend++", min: 900, max: 1100 },
  { name: "Mythic", min: 1100, max: 1350 },
  { name: "Mythic+", min: 1350, max: 2000 }, // extra max for visualization
];

// Calculate progress for current badge
const getProgressData = (points) => {
  const current =
    badgeSteps.find((b) => points >= b.min && points < b.max) ||
    badgeSteps[badgeSteps.length - 1];
  const progress = ((points - current.min) / (current.max - current.min)) * 100;

  return {
    badge: current.name,
    currentPoints: points,
    min: current.min,
    max: current.max,
    progress: Math.min(progress, 100),
  };
};

// Progress Bar Component
const ProgressBar = ({ label, points, color = "green" }) => {
  const data = getProgressData(points);

  return (
    <div className="bg-white rounded-lg p-4 border shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <p className="text-sm font-semibold text-gray-700">{label}</p>
        <span className="text-xs font-bold text-gray-600">{data.badge}</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 bg-${color}-500 transition-all duration-700`}
          style={{ width: `${data.progress}%` }}
        />
      </div>

      <p className="text-xs text-gray-600 mt-1">
        {data.currentPoints} / {data.max} pts → Next Rank
      </p>
    </div>
  );
};

const Profile = ({ profile, user }) => {
  if (!profile) {
    return (
      <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-2xl p-8 border border-green-100">
        <h2 className="text-3xl font-bold mb-4 text-green-800 flex items-center gap-2">
          <span className="text-4xl">👤</span> Profile
        </h2>
        <p className="text-gray-500">No profile data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border border-green-100">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-green-800 flex items-center gap-2">
          <span className="text-3xl sm:text-4xl">👤</span> Profile
        </h2>

        {/* User Info */}
        <div className="bg-green-100 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 border-l-4 border-green-600">
          <div className="flex items-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
              {(profile.userName || user?.name || "U").charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base sm:text-lg font-bold text-green-900 truncate">
                {profile.userName || user?.name || "User"}
              </p>
              <p className="text-xs sm:text-sm text-green-700 font-mono">
                ID: {profile.user_uni_id || user?.user_uni_id || "N/A"}
              </p>
            </div>
          </div>

          {/* Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="bg-blue-200 text-blue-900 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 border-blue-400 shadow-sm flex items-center gap-1">
              <span>📅</span>
              <span>Weekly: {profile.weeklyBadge || "Bronze 3rd"}</span>
            </div>
            <div className="bg-pink-200 text-pink-900 px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold border-2 border-pink-400 shadow-sm flex items-center gap-1">
              <span>📊</span>
              <span>Monthly: {profile.monthlyBadge || "Bronze 3rd"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Today's Points */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 sm:p-5 border-2 border-yellow-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-yellow-700 font-semibold mb-1">
                Today's Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-800">
                {profile.totalPointsToday || 0}
              </p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">🌟</span>
          </div>
        </div>

        {/* Lifetime Points */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-5 border-2 border-purple-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-purple-700 font-semibold mb-1">
                Lifetime Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-800">
                {profile.lifetimePoints || 0}
              </p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">💎</span>
          </div>
        </div>

        {/* Weekly Points */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-5 border-2 border-blue-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-blue-700 font-semibold mb-1">
                Weekly Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-800">
                {profile.weeklyPoints || 0}
              </p>
              <p className="text-xs mt-1 px-2 py-1 bg-blue-200 text-blue-800 rounded-full inline-block font-semibold truncate max-w-full">
                {profile.weeklyBadge || "Bronze 3rd"}
              </p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">📅</span>
          </div>
        </div>

        {/* Monthly Points */}
        <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 sm:p-5 border-2 border-pink-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-pink-700 font-semibold mb-1">
                Monthly Points
              </p>
              <p className="text-2xl sm:text-3xl font-bold text-pink-800">
                {profile.monthlyPoints || 0}
              </p>
              <p className="text-xs mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded-full inline-block font-semibold truncate max-w-full">
                {profile.monthlyBadge || "Bronze 3rd"}
              </p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">📊</span>
          </div>
        </div>
      </div>

      {/* Progress Visualization */}
      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-bold text-green-800 flex items-center gap-2">
          📈 Rank Progress
        </h3>

       

        <ProgressBar
          label="Lifetime Progress"
          points={profile.lifetimePoints || 0}
          color="purple"
        />
      </div>
    </div>
  );
};

export default Profile;
