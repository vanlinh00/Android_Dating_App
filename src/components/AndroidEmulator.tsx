import React, { useState } from 'react';
import { 
  Heart, 
  X, 
  RotateCcw, 
  MapPin, 
  Sparkles, 
  Flame, 
  Wifi, 
  Battery, 
  Smartphone,
  CheckCircle2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
  distance: string;
  tags?: string[];
}

export const INITIAL_PROFILES: UserProfile[] = [
  {
    id: "1",
    name: "Mai Anh",
    age: 23,
    bio: "Thích cà phê sáng, sách và mèo. Tìm một người bạn cùng gu âm nhạc Indie! ☕🐱",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    distance: "Cách bạn 2 km",
    tags: ["Cà phê", "Indie Pop", "Mèo", "Sách"]
  },
  {
    id: "2",
    name: "Bảo Hân",
    age: 25,
    bio: "Đam mê nhiếp ảnh đường phố, du lịch phượt và nấu ăn cuối tuần. 📸✈️",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    distance: "Cách bạn 5 km",
    tags: ["Nhiếp ảnh", "Du lịch", "Ẩm thực", "Yoga"]
  },
  {
    id: "3",
    name: "Hải Đăng",
    age: 26,
    bio: "Software Engineer ban ngày, guitarist ban đêm. Rất thích chạy bộ hồ Tây lúc hoàng hôn. 🎸💻",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    distance: "Cách bạn 3 km",
    tags: ["Guitar", "Chạy bộ", "Coding", "Cà phê"]
  },
  {
    id: "4",
    name: "Thảo My",
    age: 24,
    bio: "Thiết kế thời trang & mê gốm sứ. Luôn tràn đầy năng lượng tích cực ✨🎨",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    distance: "Cách bạn 7 km",
    tags: ["Thiết kế", "Gốm sứ", "Art Gallery"]
  },
  {
    id: "5",
    name: "Minh Khôi",
    age: 27,
    bio: "Kiến trúc sư yêu không gian xanh, thích tập gym và khám phá ẩm thực vỉa hè. 🏃‍♂️🍜",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    distance: "Cách bạn 4 km",
    tags: ["Kiến trúc", "Gym", "Street Food"]
  }
];

export const AndroidEmulator: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>(INITIAL_PROFILES);
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [matchedProfile, setMatchedProfile] = useState<UserProfile | null>(null);

  // Swipe animation trigger for top card
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = profiles[0];

  const handleSwipeLeft = () => {
    if (!currentProfile) return;
    setSwipeDirection('left');
    setLastAction(`Đã bỏ qua ${currentProfile.name}`);
    setTimeout(() => {
      setProfiles(prev => prev.slice(1));
      setSwipeDirection(null);
    }, 240);
  };

  const handleSwipeRight = () => {
    if (!currentProfile) return;
    setSwipeDirection('right');
    setLastAction(`Đã thích ${currentProfile.name} ❤️`);
    
    // Simulate high-match delight randomly or on first
    if (currentProfile.id === '1' || currentProfile.id === '3') {
      setTimeout(() => {
        setMatchedProfile(currentProfile);
      }, 300);
    }

    setTimeout(() => {
      setProfiles(prev => prev.slice(1));
      setSwipeDirection(null);
    }, 240);
  };

  const handleReset = () => {
    setProfiles(INITIAL_PROFILES);
    setLastAction("Đã làm mới danh sách hồ sơ!");
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* Device Wrapper */}
      <div className="relative w-[360px] sm:w-[390px] h-[780px] bg-slate-900 rounded-[44px] p-3 shadow-2xl ring-1 ring-white/20 shadow-slate-950/60 flex flex-col">
        {/* Hardware details: Speaker & Camera */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-4 bg-black rounded-full flex items-center justify-center z-30">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ring-1 ring-slate-700"></div>
        </div>

        {/* Screen inner */}
        <div className="relative w-full h-full bg-[#F6F8FB] rounded-[36px] overflow-hidden flex flex-col select-none">
          {/* Android Status Bar */}
          <div className="h-9 px-6 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white/70 backdrop-blur z-20">
            <span>09:41</span>
            <div className="flex items-center space-x-2 text-slate-600">
              <Wifi className="w-3.5 h-3.5" />
              <div className="text-[10px] font-bold">5G</div>
              <Battery className="w-4 h-4 fill-slate-700" />
            </div>
          </div>

          {/* TopAppBar (Material 3 TopAppBar in Jetpack Compose) */}
          <div className="h-14 px-4 bg-white border-b border-slate-100 flex items-center justify-between shadow-xs z-10">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm">
                <Flame className="w-5 h-5 fill-white" />
              </div>
              <div>
                <h1 className="font-bold text-base text-slate-800 leading-tight">Dating Match</h1>
                <span className="text-[10px] text-pink-500 font-medium tracking-wide">JETPACK COMPOSE</span>
              </div>
            </div>
            <button 
              onClick={handleReset}
              title="Làm mới danh sách"
              className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Cards & Main Body */}
          <div className="flex-1 relative p-4 flex flex-col justify-between overflow-hidden">
            {profiles.length === 0 ? (
              // Empty State view (khi danh sách hết thẻ)
              <div className="my-auto flex flex-col items-center justify-center text-center px-4 py-8">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-24 h-24 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 mb-5 shadow-inner"
                >
                  <Heart className="w-12 h-12 fill-pink-500 stroke-pink-500" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Không còn hồ sơ nào gần bạn
                </h3>
                <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                  Bạn đã duyệt hết hồ sơ được đề xuất trong khu vực hôm nay. Hãy làm mới để khám phá lại từ đầu.
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full shadow-lg shadow-pink-500/30 hover:brightness-105 active:scale-95 transition-all text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Tải lại hồ sơ</span>
                </button>
              </div>
            ) : (
              <>
                {/* Profile Card Deck */}
                <div className="relative w-full flex-1 max-h-[510px] flex items-center justify-center">
                  {/* Background Card (Preview next card for depth) */}
                  {profiles.length > 1 && (
                    <div className="absolute inset-0 top-3 scale-[0.94] opacity-80 rounded-[28px] overflow-hidden shadow-md bg-slate-200 pointer-events-none transition-all">
                      <img 
                        src={profiles[1].imageUrl} 
                        alt={profiles[1].name}
                        className="w-full h-full object-cover" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>
                  )}

                  {/* Active Top Card */}
                  {currentProfile && (
                    <motion.div
                      key={currentProfile.id}
                      animate={
                        swipeDirection === 'left'
                          ? { x: -400, rotate: -25, opacity: 0 }
                          : swipeDirection === 'right'
                          ? { x: 400, rotate: 25, opacity: 0 }
                          : { x: 0, rotate: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="absolute inset-0 rounded-[28px] overflow-hidden shadow-xl bg-slate-800 cursor-grab active:cursor-grabbing border border-white/20"
                    >
                      {/* Avatar Image (via Coil in Android) */}
                      <img
                        src={currentProfile.imageUrl}
                        alt={currentProfile.name}
                        className="w-full h-full object-cover select-none pointer-events-none"
                      />

                      {/* Top Action Tags Indicator during swipe */}
                      {swipeDirection === 'right' && (
                        <div className="absolute top-6 left-6 border-4 border-emerald-500 text-emerald-500 bg-white/80 font-black text-2xl tracking-wider px-4 py-1.5 rounded-lg -rotate-12 backdrop-blur shadow-md">
                          THÍCH
                        </div>
                      )}
                      {swipeDirection === 'left' && (
                        <div className="absolute top-6 right-6 border-4 border-rose-500 text-rose-500 bg-white/80 font-black text-2xl tracking-wider px-4 py-1.5 rounded-lg rotate-12 backdrop-blur shadow-md">
                          BỎ QUA
                        </div>
                      )}

                      {/* Dark Gradient Overlay for readable text */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-white pointer-events-none">
                        {/* Name and Age */}
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold tracking-tight">{currentProfile.name}</span>
                          <span className="text-xl font-medium text-white/90">{currentProfile.age}</span>
                          <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                        </div>

                        {/* Distance info */}
                        <div className="flex items-center space-x-1.5 text-xs text-slate-300 mt-1">
                          <MapPin className="w-3.5 h-3.5 text-pink-400" />
                          <span>{currentProfile.distance}</span>
                        </div>

                        {/* Bio */}
                        <p className="text-xs text-white/90 mt-2 line-clamp-2 leading-relaxed">
                          {currentProfile.bio}
                        </p>

                        {/* Badges / Passions */}
                        {currentProfile.tags && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {currentProfile.tags.map((tag, i) => (
                              <span 
                                key={i} 
                                className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* 2 Main Action Buttons: Dislike (X - Red) & Like (Heart - Pink) */}
                <div className="flex items-center justify-center space-x-8 py-3">
                  {/* Bỏ qua (Dislike - X) */}
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ scale: 1.08 }}
                    onClick={handleSwipeLeft}
                    className="w-16 h-16 rounded-full bg-white shadow-lg shadow-slate-300/60 border border-slate-100 flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Bỏ qua (Swipe Left)"
                  >
                    <X className="w-8 h-8 stroke-[2.5]" />
                  </motion.button>

                  {/* Thích (Like - Heart) */}
                  <motion.button
                    whileTap={{ scale: 0.88 }}
                    whileHover={{ scale: 1.08 }}
                    onClick={handleSwipeRight}
                    className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-rose-500 shadow-lg shadow-pink-500/40 flex items-center justify-center text-white hover:brightness-110 transition-all"
                    title="Thích (Swipe Right)"
                  >
                    <Heart className="w-8 h-8 fill-white stroke-white" />
                  </motion.button>
                </div>
              </>
            )}
          </div>

          {/* Android Navigation bar pill */}
          <div className="h-6 flex items-center justify-center bg-white/40 pb-1">
            <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
          </div>
        </div>

        {/* Match modal celebratory popup */}
        <AnimatePresence>
          {matchedProfile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-3 rounded-[36px] bg-black/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 text-white text-center"
            >
              <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mb-4 text-pink-400">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 mb-1">
                TƯƠNG HỢP! (MATCH)
              </h2>
              <p className="text-xs text-slate-300 mb-6">
                Bạn và <span className="font-bold text-white">{matchedProfile.name}</span> đã thích nhau.
              </p>

              <div className="flex items-center space-x-3 mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-pink-500 shadow-md">
                  <img src={matchedProfile.imageUrl} alt={matchedProfile.name} className="w-full h-full object-cover" />
                </div>
                <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/60 bg-slate-700 flex items-center justify-center text-xs font-semibold">
                  <span>Bạn</span>
                </div>
              </div>

              <button
                onClick={() => setMatchedProfile(null)}
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full font-bold text-sm shadow-lg shadow-pink-500/40 hover:brightness-110 active:scale-95 transition-all"
              >
                Tiếp tục quẹt thẻ
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Simulator info strip */}
      <div className="mt-4 flex items-center space-x-2 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-xs">
        <Smartphone className="w-3.5 h-3.5 text-pink-500" />
        <span>Bấm nút <strong className="text-rose-500">X</strong> hoặc <strong className="text-pink-500">❤️</strong> để trải nghiệm logic ViewModel</span>
      </div>
    </div>
  );
};
