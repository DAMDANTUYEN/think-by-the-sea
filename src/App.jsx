import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Layout & UI
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Features
import Hero from './components/features/Hero';
import ScienceRoute from './components/features/ScienceRoute';
import Programs from './components/features/Programs';

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  // State mới để điều khiển sự xuất hiện của Navbar
  const [showNavbar, setShowNavbar] = useState(true);

  const renderContent = () => {
    switch (activeNav) {
      case 'Science Route':
        // Truyền setShowNavbar xuống để ScienceRoute có thể điều khiển
        return <ScienceRoute setShowNavbar={setShowNavbar} />;
      case 'Programs':
        return <Programs />;
      case 'Home':
      default:
        return (
          <Hero
            onExplore={() => setActiveNav('Science Route')}
            onPrograms={() => setActiveNav('Programs')}
            onKnowledgeHub={() => setActiveNav('Knowledge Hub')}
          />
        );
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans selection:bg-blue-500/30">

      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073"
          alt="Sea Background"
          className="w-full h-full object-cover"
        />

        {/* Animated Atmosphere */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none"
        />
      </div>

      {/* LOGIC IF-ELSE: Navbar chỉ render khi showNavbar là true */}
      {showNavbar && (
        <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      )}

      {/* Main Content Area */}
      <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto min-h-screen flex flex-col justify-center pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeNav}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}