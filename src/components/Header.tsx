import { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeTab, setActiveTab, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '동력분무기', id: 'sprayers', tab: 'sprayer' as ActiveTab },
    { label: '피스톤 펌프', id: 'pumps', tab: 'pump' as ActiveTab },
    { label: '조립판매', id: 'assembly', tab: 'assembly' as ActiveTab },
    { label: '주문 안내', id: 'location', tab: 'order' as ActiveTab },
  ];

  const handleMenuClick = (id: string, tab: ActiveTab) => {
    setActiveTab(tab);
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Top Banner Bar */}
      <div className="w-full bg-[#15110f] text-gray-300 text-xs sm:text-sm py-2 px-4 border-b border-stone-800 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4 font-sans font-medium">
          <div className="flex items-center gap-1.5 text-stone-300">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span className="font-bold">동력분무기 및 피스톤펌프 전문 생산 기업</span>
          </div>
          <div className="flex items-center gap-1.5 text-stone-300 hover:text-amber-500 transition-colors">
            <Phone className="w-4 h-4 text-amber-500" />
            <a href="tel:054-334-2488" className="tracking-wide text-xs sm:text-sm">
              전화 주문·조립 및 문의 : <strong className="text-amber-400 font-extrabold font-mono text-[13px] sm:text-sm">054-334-2488</strong>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-stone-200 py-3'
            : 'bg-white border-b border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => handleMenuClick('hero', 'home')}
          >
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-black text-stone-900 tracking-tight group-hover:text-amber-600 transition-colors">
                영흥분무기
              </span>
              <span className="text-[11px] sm:text-xs text-stone-500 tracking-wider -mt-0.5 font-mono uppercase font-extrabold">
                Youngheung Sprayer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6 lg:gap-8 font-sans font-bold text-stone-700">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuClick(item.id, item.tab)}
                    className={`relative py-2 text-base lg:text-[17px] font-bold tracking-tight transition-colors cursor-pointer hover:text-amber-600 ${
                      activeTab === item.tab 
                        ? 'text-amber-600 font-extrabold' 
                        : 'text-stone-700'
                    }`}
                  >
                    {item.label}
                    {activeTab === item.tab && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-stone-700 bg-stone-100 active:bg-stone-200 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-white border-t border-stone-100"
            >
              <div className="px-4 py-4 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenuClick(item.id, item.tab)}
                    className={`block w-full text-left px-5 py-3.5 rounded-lg text-base font-extrabold tracking-tight transition-colors ${
                      activeTab === item.tab
                        ? 'bg-amber-50 text-amber-800 font-black'
                        : 'text-stone-850 hover:bg-stone-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
