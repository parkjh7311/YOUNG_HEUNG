import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CatalogView from './components/CatalogView';
import AssemblySection from './components/AssemblySection';
import OrderSection from './components/OrderSection';
import { ActiveTab } from './types';
import { SPRAYERS, PUMPS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  return (
    <div className="min-h-screen bg-[#13100f] text-gray-100 selection:bg-amber-500 selection:text-stone-950 font-sans flex flex-col justify-between">
      
      {/* 1. Top Notification Bar + Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onNavigate={(sectionId) => {
          // Scroll to top when switching views for premium UX
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />

      {/* 2. Main Visual Frame */}
      <main className="flex-grow pb-16">
        
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            {/* Hero Main Presentation */}
            <Hero onScrollToExplore={() => setActiveTab('sprayer')} />
          </div>
        )}

        {activeTab === 'sprayer' && (
          <div className="animate-fade-in">
            <CatalogView category="sprayer" products={SPRAYERS} />
          </div>
        )}

        {activeTab === 'pump' && (
          <div className="animate-fade-in">
            <CatalogView category="pump" products={PUMPS} />
          </div>
        )}

        {activeTab === 'assembly' && (
          <div className="animate-fade-in">
            <AssemblySection />
          </div>
        )}

        {activeTab === 'order' && (
          <div className="animate-fade-in">
            <OrderSection />
          </div>
        )}

      </main>

      {/* 4. Comprehensive Footer with registered information */}
      <Footer />

    </div>
  );
}


