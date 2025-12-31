import React, { useState, useEffect, useContext } from "react";
import API from "../utils/axios";
import ScratchCard from "./ScratchCard";
import Leaderboard from "./Leaderboard";
import Profile from "./Profile";
import { AuthContext } from "../contexts/AuthContext";

const Scard = () => {
  const { user, token, refreshUser } = useContext(AuthContext);
  const [cards, setCards] = useState([]);
  const [profile, setProfile] = useState(null);
  const [leaderboard, setLeaderboard] = useState({
    lifetime: [],
    monthly: [],
    weekly: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("cards");
  const [timeUntilReset, setTimeUntilReset] = useState("");

  
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); 
      
      const diff = midnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilReset(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);

  
  const fetchTodayScard = async () => {
    try {
      setLoading(true);
      const [scardRes, profileRes] = await Promise.all([
        API.get("/scard/today"),
        API.get("/scard/profile"),
      ]);

      setCards(scardRes.data.scard?.cards || []);
      setProfile(profileRes.data.profile || {});
    } catch (err) {
      console.error("Error fetching scard/profile:", err);
    } finally {
      setLoading(false);
    }
  };


  const fetchLeaderboard = async () => {
    try {
      const [lifetimeRes, monthlyRes, weeklyRes] = await Promise.all([
        API.get(`/scard/leaderboard?type=lifetime`),
        API.get(`/scard/leaderboard?type=monthly`),
        API.get(`/scard/leaderboard?type=weekly`)
      ]);
      
      setLeaderboard({
        lifetime: lifetimeRes.data.leaderboard || [],
        monthly: monthlyRes.data.leaderboard || [],
        weekly: weeklyRes.data.leaderboard || []
      });
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchTodayScard();
    fetchLeaderboard();
  }, []);

  
  const handleScratchCard = async (index, cardId) => {
    try {
      const res = await API.post(
        "/scard/scratch",
        { cardIndex: index }
      );

      setCards(res.data.scard?.cards || []);
      setProfile({
        ...profile,
        totalPointsToday: res.data.scard?.totalPointsToday || 0,
        weeklyPoints: res.data.scard?.weeklyPoints || 0,
        weeklyBadge: res.data.scard?.weeklyBadge || "",
        monthlyPoints: res.data.scard?.monthlyPoints || 0,
        monthlyBadge: res.data.scard?.monthlyBadge || "",
        lifetimePoints: res.data.scard?.lifetimePoints || 0,
      });

    
      await fetchLeaderboard();
      await refreshUser?.(); 
    } catch (err) {
      console.error("Error scratching card:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-green-700 text-2xl">Loading your game...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-green-100 to-green-50 text-green-900">

      <div className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
         
          <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">📖</span>
                  How It Works
                </h2>
              </div>
              
              <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                {/* Intro Video */}
<div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-2 sm:p-3 border-2 border-green-300 shadow-sm hover:shadow-md transition-shadow">
  <div className="aspect-video w-full rounded-md overflow-hidden bg-black">
    <iframe
      className="w-full h-full"
      src="https://www.youtube.com/embed/g8o9HLbmgYc"
      title="How Scratch Card Works"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>

  <p className="mt-2 text-xs sm:text-sm text-green-800 font-medium text-center">
    Watch the complete feature demo before you start
  </p>
</div>

                {/* Step 1 */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-blue-900 mb-1 text-sm sm:text-base">Daily Cards</h3>
                      <p className="text-xs sm:text-sm text-blue-800">Get 2 scratch cards every day! Come back daily to collect your cards.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 sm:p-4 border-l-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-purple-900 mb-1 text-sm sm:text-base">Scratch & Win</h3>
                      <p className="text-xs sm:text-sm text-purple-800">Click on cards to reveal points (0-10 pts). Each card is a surprise!</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 sm:p-4 border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-orange-900 mb-1 text-sm sm:text-base">Earn Points</h3>
                      <p className="text-xs sm:text-sm text-orange-800">Points add to your daily, weekly, monthly, and lifetime totals.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-3 sm:p-4 border-l-4 border-pink-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold text-pink-900 mb-1 text-sm sm:text-base">Unlock Badges</h3>
                      <p className="text-xs sm:text-sm text-pink-800">Collect points to unlock badges from Bronze to Master rank!</p>
                    </div>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-3 sm:p-4 border-l-4 border-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h3 className="font-bold text-yellow-900 mb-1 text-sm sm:text-base">Compete</h3>
                      <p className="text-xs sm:text-sm text-yellow-800">Climb the leaderboard! Compete weekly & monthly with other players.</p>
                    </div>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 sm:p-4 border-l-4 border-green-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                      6
                    </div>
                    <div>
                      <h3 className="font-bold text-green-900 mb-1 text-sm sm:text-base">Track Progress</h3>
                      <p className="text-xs sm:text-sm text-green-800">View your profile to see all your stats, badges, and achievements!</p>
                    </div>
                  </div>
                </div>

                {/* Bonus Tip */}
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-3 sm:p-4 border-2 border-dashed border-red-300 shadow-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-xl sm:text-2xl">💡</span>
                    <div>
                      <h3 className="font-bold text-red-900 mb-1 text-sm sm:text-base">Pro Tip</h3>
                      <p className="text-xs sm:text-sm text-red-800">Scratch both cards daily to maximize your points and climb faster!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

        
          <main className="lg:col-span-2 order-1 lg:order-2">
            <div className="flex gap-2 sm:gap-3 mb-4 sm:mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab("cards")}
                className={`flex-1 min-w-[100px] py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${
                  activeTab === "cards"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white scale-105"
                    : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-200"
                }`}
              >
                <span className="hidden sm:inline">🎴 Scratch Cards</span>
                <span className="sm:hidden">🎴 Cards</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("leaderboard");
                  fetchLeaderboard();
                }}
                className={`flex-1 min-w-[100px] py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${
                  activeTab === "leaderboard"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white scale-105"
                    : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-200"
                }`}
              >
                🏆 <span className="">Leaderboard</span>
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 min-w-[100px] py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-200 shadow-md hover:shadow-xl transform hover:-translate-y-1 ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white scale-105"
                    : "bg-white text-green-700 hover:bg-green-50 border-2 border-green-200"
                }`}
              >
                👤 <span className="">Profile</span>
              </button>
            </div>

            <div>
              {activeTab === "cards" && (
                <div>
                  {cards.length > 0 ? (
                    <div>
                      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border border-green-200">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">🎯 Today's Challenge</h3>
                            <p className="text-sm sm:text-base text-gray-600">Scratch both cards to reveal your points!<br/> You get 2 cards daily.</p>
                          </div>
                          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border-2 border-purple-300 min-w-[280px] sm:min-w-[150px] sm:min-h-[110px] shadow-sm">
                            <p className="text-xs font-semibold text-green-700 mb-1">⏰ Cards Reset In:</p>
                            <p className="text-lg sm:text-xl font-bold text-green-900 font-mono">{timeUntilReset}</p>
                            <p className="text-xs text-green-600 mt-1">Daily at 12:00 AM</p>
                          </div>
        

                        </div>
                        <div className="mt-3 flex gap-2">
                          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                            cards.filter(c => c.scratched).length === 0 ? "bg-red-100 text-red-700" :
                            cards.filter(c => c.scratched).length === 2 ? "bg-green-100 text-green-700" :
                            "bg-yellow-100 text-yellow-700"
                          }`}>
                            {cards.filter(c => c.scratched).length} / 2 Scratched
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {cards.map((card, index) => (
                          <ScratchCard
                            key={index}
                            card={card}
                            onScratched={() => handleScratchCard(index, card._id)}
                          />
                        ))}
                      </div>

                      {/* Rewards Announcement */}
                      <div className="mt-6 sm:mt-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-lg p-4 sm:p-6 border-2 border-purple-300">
                        <h3 className="text-lg sm:text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                          <span className="text-2xl">🎁</span>
                          Exclusive Rewards & Offers
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Weekly Reward */}
                          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-4 border-2 border-blue-400 shadow-md hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🏆</div>
                              <h4 className="font-bold text-blue-900 text-lg mb-2">Weekly Winners</h4>
                              <div className="bg-white rounded-lg p-3 mb-2">
                                <p className="text-2xl font-bold text-blue-600">10% OFF</p>
                                <p className="text-xs text-blue-700">Coupon Code</p>
                              </div>
                              <p className="text-sm text-blue-800 font-semibold">Top 3 Players</p>
                              <p className="text-xs text-blue-700 mt-1">Get discount on all projects!</p>
                            </div>
                          </div>

                          {/* Monthly Reward */}
                          <div className="bg-gradient-to-br from-yellow-100 to-orange-200 rounded-xl p-4 border-2 border-orange-400 shadow-md hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-center">
                              <div className="text-4xl mb-2">🥇</div>
                              <h4 className="font-bold text-orange-900 text-lg mb-2">Monthly Champions</h4>
                              <div className="bg-white rounded-lg p-3 mb-2">
                                <p className="text-2xl font-bold text-orange-600">30% OFF</p>
                                <p className="text-xs text-orange-700">Coupon Code</p>
                              </div>
                              <p className="text-sm text-orange-800 font-semibold">Top 3 Players</p>
                              <p className="text-xs text-orange-700 mt-1">Huge savings on projects!</p>
                            </div>
                          </div>

                          {/* Lifetime Reward */}
                          <div className="bg-gradient-to-br from-pink-100 to-red-200 rounded-xl p-4 border-2 border-red-500 shadow-lg hover:shadow-2xl transition-all hover:scale-105 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                              SPECIAL
                            </div>
                            <div className="text-center">
                              <div className="text-4xl mb-2">👑</div>
                              <h4 className="font-bold text-red-900 text-lg mb-2">Lifetime Legend</h4>
                              <div className="bg-white rounded-lg p-3 mb-2">
                                <p className="text-2xl font-bold text-red-600">FREE</p>
                                <p className="text-xs text-red-700">Project</p>
                              </div>
                              <p className="text-sm text-red-800 font-semibold">#1 Player (400+ pts)</p>
                              <p className="text-xs text-red-700 mt-1">Once per month!</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-3 border border-purple-300">
                          <p className="text-center text-sm text-purple-900">
                            <span className="font-bold">🎯 Compete now!</span> Climb the leaderboards and win amazing discounts on our premium projects!
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center border border-green-200">
                      <div className="text-4xl sm:text-6xl mb-4">🎴</div>
                      <p className="text-lg sm:text-xl text-gray-600 font-semibold">No cards available for today.</p>
                      <p className="text-sm sm:text-base text-gray-500 mt-2">Check back tomorrow for new cards!</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "leaderboard" && <Leaderboard leaderboard={leaderboard} />}

              {activeTab === "profile" && <Profile profile={profile} user={user} />}
            </div>
          </main>

          
          <aside className="lg:col-span-1 space-y-4 order-3">
            <div className="bg-gradient-to-br from-white to-green-50 rounded-xl shadow-lg border-2 border-green-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-3 sm:p-4">
                <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span className="text-xl sm:text-2xl">🏅</span>
                  Rank Requirements
                </h2>
              </div>
              
              <div className="p-3 sm:p-4 space-y-2 grid grid-cols-2 gap-2">
                {/* Bronze Ranks */}
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-2 border-2 border-orange-300 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-orange-800 mb-1">🥉 Bronze 3rd</p>
                    <p className="text-sm font-bold text-orange-900">0-19 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-2 border-2 border-orange-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-orange-800 mb-1">🥉 Bronze 2nd</p>
                    <p className="text-sm font-bold text-orange-900">20-39 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-2 border-2 border-orange-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-orange-800 mb-1">🥉 Bronze 1st</p>
                    <p className="text-sm font-bold text-orange-900">40-59 pts</p>
                  </div>
                </div>

                {/* Silver Ranks */}
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-2 border-2 border-gray-300 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-800 mb-1">🥈 Silver 3rd</p>
                    <p className="text-sm font-bold text-gray-900">60-79 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-2 border-2 border-gray-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-800 mb-1">🥈 Silver 2nd</p>
                    <p className="text-sm font-bold text-gray-900">80-99 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg p-2 border-2 border-gray-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-gray-800 mb-1">🥈 Silver 1st</p>
                    <p className="text-sm font-bold text-gray-900">100-119 pts</p>
                  </div>
                </div>

                {/* Gold Ranks */}
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 border-2 border-yellow-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-yellow-800 mb-1">🥇 Gold 3rd</p>
                    <p className="text-sm font-bold text-yellow-900">120-139 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 border-2 border-yellow-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-yellow-800 mb-1">🥇 Gold 2nd</p>
                    <p className="text-sm font-bold text-yellow-900">140-159 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg p-2 border-2 border-yellow-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-yellow-800 mb-1">🥇 Gold 1st</p>
                    <p className="text-sm font-bold text-yellow-900">160-179 pts</p>
                  </div>
                </div>

                {/* Platinum Ranks */}
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg p-2 border-2 border-cyan-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-cyan-800 mb-1">💎 Platinum 3rd</p>
                    <p className="text-sm font-bold text-cyan-900">180-199 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg p-2 border-2 border-cyan-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-cyan-800 mb-1">💎 Platinum 2nd</p>
                    <p className="text-sm font-bold text-cyan-900">200-219 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg p-2 border-2 border-cyan-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-cyan-800 mb-1">💎 Platinum 1st</p>
                    <p className="text-sm font-bold text-cyan-900">220-239 pts</p>
                  </div>
                </div>

                {/* Diamond Ranks */}
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 border-2 border-blue-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-blue-800 mb-1">💠 Diamond 3rd</p>
                    <p className="text-sm font-bold text-blue-900">240-259 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 border-2 border-blue-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-blue-800 mb-1">💠 Diamond 2nd</p>
                    <p className="text-sm font-bold text-blue-900">260-279 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-2 border-2 border-blue-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-blue-800 mb-1">💠 Diamond 1st</p>
                    <p className="text-sm font-bold text-blue-900">280-299 pts</p>
                  </div>
                </div>

                {/* Crown Ranks */}
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 border-2 border-purple-400 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-purple-800 mb-1">👑 Crown 3rd</p>
                    <p className="text-sm font-bold text-purple-900">300-319 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 border-2 border-purple-500 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-purple-800 mb-1">👑 Crown 2nd</p>
                    <p className="text-sm font-bold text-purple-900">320-339 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-2 border-2 border-purple-600 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-purple-800 mb-1">👑 Crown 1st</p>
                    <p className="text-sm font-bold text-purple-900">340-359 pts</p>
                  </div>
                </div>

                {/* ACE Ranks */}
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-2 border-2 border-red-400 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-red-800 mb-1">🎴 ACE</p>
                    <p className="text-sm font-bold text-red-900">360-379 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-2 border-2 border-red-500 shadow-md hover:shadow-lg transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-red-800 mb-1">🎴 ACE+</p>
                    <p className="text-sm font-bold text-red-900">380-399 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-red-100 to-red-300 rounded-lg p-2 border-2 border-red-600 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-red-900 mb-1">🎴 ACE++</p>
                    <p className="text-sm font-bold text-red-900">400-419 pts</p>
                  </div>
                </div>

                {/* Master Ranks */}
                <div className="bg-gradient-to-br from-pink-200 to-pink-300 rounded-lg p-2 border-2 border-pink-500 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-pink-900 mb-1">⭐ Master</p>
                    <p className="text-sm font-bold text-pink-900">420-449 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-300 to-pink-400 rounded-lg p-2 border-2 border-pink-600 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-pink-900 mb-1">⭐ Master+</p>
                    <p className="text-sm font-bold text-pink-900">450-499 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-400 to-pink-500 rounded-lg p-2 border-2 border-pink-700 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-pink-950 mb-1">⭐ Master++</p>
                    <p className="text-sm font-bold text-pink-950">500-599 pts</p>
                  </div>
                </div>

                {/* Legend Ranks */}
                <div className="bg-gradient-to-br from-amber-200 to-amber-300 rounded-lg p-2 border-2 border-amber-500 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-amber-900 mb-1">🔥 Legend</p>
                    <p className="text-sm font-bold text-amber-950">600-749 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-300 to-amber-400 rounded-lg p-2 border-2 border-amber-600 shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-amber-950 mb-1">🔥 Legend+</p>
                    <p className="text-sm font-bold text-amber-950">750-899 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg p-2 border-2 border-amber-700 shadow-2xl hover:shadow-3xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-amber-950 mb-1">🔥 Legend++</p>
                    <p className="text-sm font-bold text-amber-950">900-1099 pts</p>
                  </div>
                </div>

                {/* Mythic Ranks */}
                <div className="bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-lg p-2 border-2 border-indigo-600 shadow-2xl hover:shadow-3xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-indigo-950 mb-1">✨ Mythic</p>
                    <p className="text-sm font-bold text-indigo-950">1100-1349 pts</p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-lg p-2 border-2 border-indigo-700 shadow-2xl hover:shadow-3xl transition-shadow">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-indigo-950 mb-1">✨ Mythic+</p>
                    <p className="text-sm font-bold text-indigo-950">1350+ pts</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Scard;


