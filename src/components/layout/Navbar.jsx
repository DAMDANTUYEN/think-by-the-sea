import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Waves, Menu, X } from 'lucide-react'; // Bổ sung Menu và X cho chuẩn UX di động

const NavItem = ({ label, active = false, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 rounded-full transition-all duration-300 cursor-pointer text-sm ${active ? 'bg-white/20 text-white font-medium shadow-md' : 'text-white/70 hover:text-white'
      }`}
  >
    {label}
  </motion.button>
);

const Navbar = ({ activeNav, setActiveNav }) => {
  const menuItems = ['Home', 'Science Route', 'Programs', 'Science Week', 'Knowledge Hub'];

  // State quản lý việc đóng/mở menu trên điện thoại
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hàm xử lý khi bấm vào 1 link (chuyển trang & đóng menu mobile)
  const handleNavClick = (item) => {
    setActiveNav(item);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-[100] p-4 md:p-6">

      {/* Viên thuốc (Pill) chính */}
      <div className="relative z-50 max-w-7xl mx-auto flex items-center justify-between backdrop-blur-2xl bg-white/5 border border-white/10 rounded-full px-6 py-2 shadow-2xl">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNavClick('Home')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full flex items-center justify-center p-2 shadow-lg group-hover:scale-105 transition-transform">
            <Waves className="text-white w-full h-full" />
          </div>
          <span className="text-white font-display font-bold tracking-tight text-xl hidden sm:block uppercase">
            Think <span className="font-light opacity-50">By The Sea</span>
          </span>
        </div>

        {/* Menu cho PC (Desktop) */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => (
            <NavItem
              key={item}
              label={item}
              active={activeNav === item}
              onClick={() => handleNavClick(item)}
            />
          ))}
        </nav>

        {/* Nút bấm Menu cho Mobile */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white/70 hover:text-white p-2 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu trượt xuống cho Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-24 left-4 right-4 z-40 lg:hidden overflow-hidden rounded-3xl backdrop-blur-3xl bg-[#0a0f1c]/90 border border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex flex-col p-4">
              {menuItems.map((item) => {
                const isActive = activeNav === item;
                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`text-left px-6 py-4 rounded-2xl text-sm font-display uppercase tracking-widest transition-all ${isActive
                        ? 'bg-white/10 text-cyan-400 font-bold border border-white/5'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
};

export default Navbar;