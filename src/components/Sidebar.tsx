import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Globe, Info, Code, Store, Tag, X,
  Moon, Sun
} from 'lucide-react';
import { Language, Theme, ViewState } from '../types';
import { translations } from '../constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  setLang: (l: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  currentView: ViewState;
  setView: (v: ViewState) => void;
}

export default function Sidebar({
  isOpen, onClose, lang, setLang, theme, setTheme, currentView, setView
}: SidebarProps) {
  const t = (key: keyof typeof translations) => translations[key][lang];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-xl font-bold font-sans text-gray-900 dark:text-white">
                {t('title')}
              </h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
              <NavItem 
                icon={<Home size={20} />} 
                label={t('home')} 
                active={currentView === 'home'} 
                onClick={() => { setView('home'); onClose(); }} 
              />
              
              <div className="my-2 border-t border-gray-100 dark:border-gray-800" />
              
              <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {t('language')}
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mx-2 mb-2">
                <button
                  className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${lang === 'bn' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  onClick={() => setLang('bn')}
                >
                  বাংলা
                </button>
                <button
                  className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${lang === 'en' ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}
                  onClick={() => setLang('en')}
                >
                  English
                </button>
              </div>

              <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 w-full text-left font-medium"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                {theme === 'dark' ? t('light') : t('dark')}
              </button>

              <div className="my-2 border-t border-gray-100 dark:border-gray-800" />

              <NavItem 
                icon={<Info size={20} />} 
                label={t('aboutApp')} 
                active={currentView === 'about'} 
                onClick={() => { setView('about'); onClose(); }} 
              />
              <NavItem 
                icon={<Code size={20} />} 
                label={t('developer')} 
                active={currentView === 'developer'} 
                onClick={() => { setView('developer'); onClose(); }} 
              />
              
              <a 
                href="https://asifio.blogspot.com/p/appstore.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium"
              >
                <Store size={20} />
                <span>{t('appStore')}</span>
              </a>

            </div>

            <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center text-sm font-medium text-gray-400 dark:text-gray-500 gap-2">
              <Tag size={16} />
              {t('version')}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors w-full text-left font-medium ${
        active 
          ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' 
          : 'hover:bg-gray-100 text-gray-700 dark:hover:bg-gray-800 dark:text-gray-300'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
