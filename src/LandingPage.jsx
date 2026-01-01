import React, { useRef, useEffect } from 'react';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const appConfig = {
  version: "1.0.0",
  downloads: {
    android: {
      url: "/habit-landing/habit.apk",
      size: "50 MB"
    },
  },
  analyticsEndpoint: "https://script.google.com/macros/s/AKfycbzqHkZC56v2PHqoBSpwqCRkHuHHpry_NaxDsGXTaZo6MTndsmZZ5M21EuVTkKH-8I3pHQ/exec"
};

// Simple Analytics Logger - Only 3 event types
const logEvent = async (eventType, platform = null) => {
  try {
    const data = {
      timestamp: new Date().toISOString(),
      eventType: eventType,
      platform: platform
    };

    await fetch(appConfig.analyticsEndpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    console.log('Analytics logged:', eventType, platform);
  } catch (error) {
    console.error('Analytics error:', error);
  }
};

const DownloadButton = ({ platform }) => {
  const isAndroid = platform === 'android';
  const config = appConfig.downloads[platform];
  
  const handleDownloadClick = (e) => {
    e.preventDefault();
    logEvent('app_download', platform);
    window.location.href = config.url;
  };
  
  return (
    <a
      href={config.url}
      onClick={handleDownloadClick}
      className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-full font-medium transition-colors text-lg"
    >
      <Download className="w-5 h-5" />
      Download for {isAndroid ? 'Android' : 'iOS'}
    </a>
  );
};

const ScreenshotCarousel = () => {
  // Add your screenshot filenames here (place images in /public/screenshots/)
  const screenshots = [
    { id: 1, image: './screenshots/screen1l.png', alt: 'Dashboard' },
    { id: 4, image: './screenshots/screen4.png', alt: 'Level Up' },
    { id: 2, image: './screenshots/screen2.png', alt: 'Habits' },
    { id: 3, image: './screenshots/screen3l.png', alt: 'Analytics' },
    { id: 5, image: './screenshots/screen5.png', alt: 'Profile' }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
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
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-900" />
      </button>
      
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-12 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {screenshots.map((screenshot) => (
          <div key={screenshot.id} className="flex-shrink-0 snap-center">
            <div className="w-72 h-[580px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img 
                src={screenshot.image} 
                alt={screenshot.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't load
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gray-100 flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <div class="text-4xl mb-2">📱</div>
                        <div class="text-sm">${screenshot.alt}</div>
                      </div>
                    </div>
                  `;
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-200 p-3 rounded-full shadow-sm hover:bg-gray-50 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-900" />
      </button>
    </div>
  );
};

const LandingPage = () => {
  useEffect(() => {
    logEvent('page_visit');
  }, []);

  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900 leading-tight">
            Turn habits into<br />an adventure
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Build better routines with analytics, gamification, and celebrations
          </p>
          
          <div className="flex flex-col items-center gap-4 mb-4">
            <DownloadButton platform="android" />
            <p className="text-sm text-gray-500">iOS coming soon</p>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <ScreenshotCarousel />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-24">
            {/* Analytics */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="text-5xl mb-6">📊</div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Track your progress
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Visualize your habit streaks, completion rates, and patterns over time with detailed analytics and insights
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">7-day streak</span>
                      <span className="text-2xl font-bold text-gray-900">🔥</span>
                    </div>
                    <div className="flex gap-2">
                      {[1,1,1,1,1,1,1].map((_, i) => (
                        <div key={i} className="flex-1 h-12 bg-gray-900 rounded-lg"></div>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-gray-300">
                      <div className="text-sm text-gray-600 mb-2">Completion rate</div>
                      <div className="text-3xl font-bold text-gray-900">94%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gamification */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12">
              <div className="flex-1">
                <div className="text-5xl mb-6">🎮</div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Level up your life
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Earn XP for completing habits, level up your character, and stay motivated with RPG-style progression
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-gray-900 rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-3xl">
                      ⚡
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Character</div>
                      <div className="text-2xl font-bold">Level 12</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Experience</span>
                      <span>750/1000 XP</span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-white" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Celebrations */}
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <div className="text-5xl mb-6">🎉</div>
                <h2 className="text-4xl font-bold mb-4 text-gray-900">
                  Celebrate every win
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Get instant feedback and rewards when you complete habits. Small wins create big momentum
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 text-center">
                    <div className="text-4xl mb-3">✨</div>
                    <div className="text-lg font-semibold text-gray-900 mb-1">Habit completed!</div>
                    <div className="text-3xl font-bold text-gray-900">+50 XP</div>
                  </div>
                  <div className="mt-4 flex gap-2 justify-center">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Start building better habits
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Free to download. No account required.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <DownloadButton platform="android" />
            <p className="text-sm text-gray-500">iOS coming soon</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 text-gray-400 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-xl font-bold text-white mb-1">Habit</div>
              <div className="text-sm">Version {appConfig.version}</div>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          
          <div className="text-center md:text-left mt-8 text-sm text-gray-600">
            © 2025 Habit App
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;