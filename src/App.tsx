import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';
import DeveloperProfile from './components/DeveloperProfile';
import { Language, Theme, ViewState } from './types';
import { translations } from './constants';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [theme, setTheme] = useState<Theme>('light');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [view, setView] = useState<ViewState>('home');

  // Load language & theme prefs on mount (optional but good practice)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedLang = localStorage.getItem('lang') as Language | null;
    
    // Check system preference if no saved theme
    if (!savedTheme) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      }
    } else {
      setTheme(savedTheme);
    }
    
    if (savedLang) setLang(savedLang);
  }, []);

  // Sync dark mode class
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync lang
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = (key: keyof typeof translations) => translations[key][lang];

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      {/* Header NavBar */}
      <header className="flex h-16 items-center px-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-md z-20 shrink-0">
        <button 
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
        <h1 className="ml-4 text-xl font-bold tracking-tight text-gray-900 dark:text-white font-sans">
          {t('title')}
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden">
        {view === 'home' && <Viewer lang={lang} />}
        
        {view === 'about' && (
          <div className="h-full overflow-y-auto p-8 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{t('aboutTitle')}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                {t('aboutInfo')}
              </p>
            </div>
          </div>
        )}

        {view === 'developer' && <DeveloperProfile />}
      </main>

      {/* Drawer Overlay */}
      <Sidebar 
        isOpen={isDrawerOpen} 
        onClose={() => setDrawerOpen(false)} 
        lang={lang} 
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        currentView={view}
        setView={setView}
      />
    </div>
  );
}
