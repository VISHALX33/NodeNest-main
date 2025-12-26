import React, { useState } from "react";

const ScratchCard = ({ card, onScratched }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleScratch = () => {
    if (!card.scratched) {
      onScratched();
    }
  };

  // Get message based on points
  const getPointsMessage = (points) => {
    if (points === 0) return "Better luck tomorrow!";
    if (points === 1) return "Every point counts!";
    if (points === 2) return "Small steps matter!";
    if (points === 3) return "Keep climbing!";
    if (points === 4) return "Good progress!";
    if (points === 5) return "Halfway to max!";
    if (points === 6) return "Nice score!";
    if (points === 7) return "Great work!";
    if (points === 8) return "Excellent performance!";
    if (points === 9) return "Almost perfect!";
    if (points === 10) return "JACKPOT! Maximum points!";
    return "Nice!";
  };

  return (
    <div
      onClick={handleScratch}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative cursor-pointer rounded-xl p-6 sm:p-8 text-center shadow-lg transition-all duration-300 transform ${
        card.scratched
          ? "bg-gradient-to-br from-green-400 to-green-600 scale-100"
          : `bg-gradient-to-br from-gray-300 to-gray-400 hover:from-green-300 hover:to-green-500 ${
              isHovered ? "sm:scale-105 shadow-2xl" : "scale-100"
            }`
      } border-4 ${
        card.scratched ? "border-green-700" : "border-gray-500 hover:border-green-600"
      } min-h-[200px] sm:min-h-[250px] flex items-center justify-center`}
    >
      {/* Card content */}
      <div className="relative z-10 w-full">
        {card.scratched ? (
          <div className="space-y-2 sm:space-y-3">
           
            <div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
                {card.points}
              </p>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-green-100 mt-1">POINTS</p>
            </div>
            <div className="mt-2 px-2">
              <p className="text-xs sm:text-sm md:text-base font-bold text-white bg-green-800 bg-opacity-50 rounded-lg py-1 px-2">
                {getPointsMessage(card.points)}
              </p>
            </div>
            <div className="text-xl sm:text-2xl">🎊</div>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            <div className="text-3xl sm:text-4xl md:text-5xl">
              {isHovered ? "👆" : "🎴"}
            </div>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-700 drop-shadow px-2">
              {isHovered ? "Click to Reveal!" : "Scratch Me"}
            </p>
            <div className="flex justify-center gap-1 mt-2">
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative corner elements */}
      {!card.scratched && (
        <>
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gray-600 rounded-tl-lg"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gray-600 rounded-tr-lg"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gray-600 rounded-bl-lg"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gray-600 rounded-br-lg"></div>
        </>
      )}
    </div>
  );
};

export default ScratchCard;
