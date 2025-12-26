import React, { useState } from "react";

const Leaderboard = ({ leaderboard }) => {
  const [activeLeaderboard, setActiveLeaderboard] = useState("lifetime");

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "🏅";
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-100 to-yellow-200 border-yellow-400";
    if (rank === 2) return "from-gray-100 to-gray-200 border-gray-400";
    if (rank === 3) return "from-orange-100 to-orange-200 border-orange-400";
    return "from-green-50 to-green-100 border-green-200";
  };

  // Get current leaderboard data based on active tab
  const currentLeaderboard = leaderboard?.[activeLeaderboard] || [];

  if (!leaderboard) {
    return (
      <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border border-green-100">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-800 flex items-center gap-2">
          <span className="text-3xl sm:text-4xl">🏆</span> Leaderboard
        </h2>
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No leaderboard data available.</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to scratch cards and earn points!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-2xl p-4 sm:p-6 md:p-8 border border-green-100">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-green-800 flex items-center gap-2">
        <span className="text-3xl sm:text-4xl">🏆</span> Leaderboard
      </h2>

      {/* Leaderboard Type Tabs */}
      <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveLeaderboard("lifetime")}
          className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg ${
            activeLeaderboard === "lifetime"
              ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white scale-105"
              : "bg-white text-purple-700 hover:bg-purple-50 border-2 border-purple-300"
          }`}
        >
          <span className="flex items-center justify-center gap-1">
            <span>💎</span>
            <span>Lifetime</span>
          </span>
        </button>
        <button
          onClick={() => setActiveLeaderboard("monthly")}
          className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg ${
            activeLeaderboard === "monthly"
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white scale-105"
              : "bg-white text-blue-700 hover:bg-blue-50 border-2 border-blue-300"
          }`}
        >
          <span className="flex items-center justify-center gap-1">
            <span>📅</span>
            <span>Monthly</span>
          </span>
        </button>
        <button
          onClick={() => setActiveLeaderboard("weekly")}
          className={`flex-1 min-w-[100px] py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-bold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg ${
            activeLeaderboard === "weekly"
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white scale-105"
              : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-300"
          }`}
        >
          <span className="flex items-center justify-center gap-1">
            <span>🗓️</span>
            <span>Weekly</span>
          </span>
        </button>
      </div>
      
      {currentLeaderboard.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
        {currentLeaderboard.map((user, index) => (
          <div
            key={index}
            className={`bg-gradient-to-r ${getRankColor(user.rank)} rounded-lg p-3 sm:p-4 border-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 duration-200`}
          >
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-md font-bold text-base sm:text-lg flex-shrink-0">
                  {getRankIcon(user.rank)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-500">#{user.rank}</span>
                    <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800 truncate">{user.userName}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 sm:py-1 bg-white rounded-full text-xs font-semibold text-green-700 shadow-sm truncate max-w-[150px] sm:max-w-none">
                      {user.badge}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right flex-shrink-0">
                <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">{user.points}</p>
                <p className="text-xs text-gray-600 font-semibold">points</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      ) : (
        <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-green-200">
          <div className="text-4xl sm:text-5xl mb-3">🏆</div>
          <p className="text-gray-500 text-base sm:text-lg font-semibold">No players on the {activeLeaderboard} leaderboard yet!</p>
          <p className="text-gray-400 text-sm mt-2">Be the first to scratch cards and climb the ranks!</p>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
