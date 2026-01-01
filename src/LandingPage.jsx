import React, { useRef } from 'react';
import { Download, Target, Zap, TrendingUp, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const appConfig = {
  version: "1.0.0",
  downloads: {
    android: {
      url: "#download-android",
      size: "25 MB"
    },
    ios: {
      url: "#download-ios",
      size: "30 MB"
    }
  }
};

const DownloadButton = ({ platform }) => {
  const isAndroid = platform === 'android';
  const config = appConfig.downloads[platform];
  
  return (
    <a
      href={config.url}
      className="inline-flex items-center gap-3 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
    >
      <Download className="w-5 h-5" />
      Download for {isAndroid ? 'Android' : 'iOS'}
    </a>
  );
};

const ScreenshotCarousel = () => {
  const screenshots = [
    { id: 1, title: 'Dashboard', color: 'bg-purple-400' },
    { id: 2, title: 'Habits', color: 'bg-blue-400' },
    { id: 3, title: 'Analytics', color: 'bg-green-400' },
    { id: 4, title: 'Level Up', color: 'bg-yellow-400' },
    { id: 5, title: 'Profile', color: 'bg-pink-400' }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative max-w-5xl mx-auto">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-8 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="flex-shrink-0 snap-center">
            <div className="w-64 h-[500px] bg-gray-900 rounded-2xl p-2 shadow-lg">
              <div className={`w-full h-full ${screenshot.color} rounded-xl flex items-center justify-center`}>
                <div className="text-center text-white">
                  <div className="text-5xl mb-3">📱</div>
                  <div className="font-semibold">{screenshot.title}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            Level Up Your Life, One Habit at a Time
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Turn daily habits into an epic adventure. Build better routines with gamified tracking powered by Atomic Habits principles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <DownloadButton platform="android" />
            <DownloadButton platform="ios" />
          </div>

          {/* Simple visual */}
          <div className="max-w-md mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                🎯
              </div>
              <div className="text-left">
                <div className="font-bold">Level 12</div>
                <div className="text-sm opacity-90">Keep going!</div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>XP</span>
                <span>750/1000</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between text-sm">
                <span>HP</span>
                <span>85/100</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-red-400" style={{ width: '85%' }}></div>
              </div>
            </div>

            <div className="bg-green-500/30 border-2 border-green-300 rounded-lg p-3 text-center">
              <div className="text-sm font-medium">Habit Completed!</div>
              <div className="text-lg font-bold">+50 XP</div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900">
            See the App
          </h2>
          <p className="text-center text-gray-600 mb-10">
            Swipe through screenshots
          </p>
          
          <ScreenshotCarousel />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Key Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Atomic Habits</h3>
              <p className="text-gray-600">Built on proven behavioral science principles</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Gamification</h3>
              <p className="text-gray-600">Earn XP, level up, and unlock achievements</p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Track Progress</h3>
              <p className="text-gray-600">Visualize your daily improvements</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Create your habits</h3>
                <p className="text-gray-600">Set up daily habits with difficulty levels and reminders</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Complete and earn XP</h3>
                <p className="text-gray-600">Check off habits daily to earn experience points</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Level up your character</h3>
                <p className="text-gray-600">Gain levels and unlock rewards as you build consistency</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">Stay consistent or lose HP</h3>
                <p className="text-gray-600">Missing habits costs health points - reach zero and restart</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game Mechanics */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            The Game Mechanics
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-2 border-yellow-400 bg-yellow-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Earn XP</h3>
              <p className="text-gray-700 mb-4">Complete habits to earn experience points. Harder habits give more XP.</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Easy habit</span>
                  <span className="font-bold text-green-600">+10 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Medium habit</span>
                  <span className="font-bold text-blue-600">+25 XP</span>
                </div>
                <div className="flex justify-between">
                  <span>Hard habit</span>
                  <span className="font-bold text-purple-600">+50 XP</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-red-400 bg-red-50 p-6 rounded-xl">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Protect Your HP</h3>
              <p className="text-gray-700 mb-4">Missing habits costs health points. Reach zero HP and your character resets to Level 1.</p>
              <div className="bg-white p-3 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Current HP</span>
                  <span className="font-bold">45/100</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-purple-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Download Habit and level up your life today
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={appConfig.downloads.android.url} className="inline-flex items-center gap-3 px-6 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <Download className="w-5 h-5" />
              Download for Android
            </a>
            <a href={appConfig.downloads.ios.url} className="inline-flex items-center gap-3 px-6 py-3 bg-white text-purple-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
              <Download className="w-5 h-5" />
              Download for iOS
            </a>
          </div>

          <div className="flex justify-center gap-8 text-sm text-purple-100">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Free to download
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              No account needed
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-purple-400 mb-2">Habit</h3>
            <p className="text-gray-400 text-sm">Level up your life</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-4 text-sm text-gray-400">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2025 Habit App. Version {appConfig.version}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;