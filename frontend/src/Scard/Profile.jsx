import React from "react";

const Profile = ({ profile, user }) => {
  // Calculate lifetime badge based on points
  const getLifetimeBadge = (points) => {
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
    if (points < 450) return "Master";
    return "Master";
  };

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
              <p className="text-base sm:text-lg font-bold text-green-900 truncate">{profile.userName || user?.name || "User"}</p>
              <p className="text-xs sm:text-sm text-green-700 font-mono">ID: {profile.user_uni_id || user?.user_uni_id || "N/A"}</p>
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
              <p className="text-xs sm:text-sm text-yellow-700 font-semibold mb-1">Today's Points</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-800">{profile.totalPointsToday || 0}</p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">🌟</span>
          </div>
        </div>

        {/* Lifetime Points */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 sm:p-5 border-2 border-purple-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-purple-700 font-semibold mb-1">Lifetime Points</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-800">{profile.lifetimePoints || 0}</p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">💎</span>
          </div>
        </div>

        {/* Weekly Points */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 sm:p-5 border-2 border-blue-300 shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-blue-700 font-semibold mb-1">Weekly Points</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-800">{profile.weeklyPoints || 0}</p>
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
              <p className="text-xs sm:text-sm text-pink-700 font-semibold mb-1">Monthly Points</p>
              <p className="text-2xl sm:text-3xl font-bold text-pink-800">{profile.monthlyPoints || 0}</p>
              <p className="text-xs mt-1 px-2 py-1 bg-pink-200 text-pink-800 rounded-full inline-block font-semibold truncate max-w-full">
                {profile.monthlyBadge || "Bronze 3rd"}
              </p>
            </div>
            <span className="text-3xl sm:text-4xl flex-shrink-0">📊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
