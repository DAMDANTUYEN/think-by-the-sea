import React from 'react';
import { motion } from 'motion/react';
import { MapPin, ChevronRight, Navigation, BookOpen } from 'lucide-react';
import ScienceSnapshot from './ScienceSnapshot';
import Countdown from './Countdown';
import GlassCard from '../ui/GlassCard';

const Hero = ({ onExplore, onPrograms, onKnowledgeHub }) => (
  <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

    {/* CỘT TRÁI: Nội dung chữ và Nút bấm */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium mb-6 backdrop-blur-sm">
        <MapPin className="w-3 h-3 text-blue-400" /> QUY NHON, VIETNAM
      </div>

      <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
        WHERE <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300 drop-shadow-sm">KNOWLEDGE</span> <br />
        MEETS THE OCEAN.
      </h1>

      <p className="text-xl text-white/70 max-w-lg mb-10 leading-relaxed font-light">
        Think by the Sea - Đồng hành cùng hành trình biến dải bờ biển Quy Nhơn thành trung tâm khoa học của Việt Nam.
        Nơi tri thức được nuôi dưỡng bởi đại dương.
      </p>

      <div className="flex flex-wrap gap-4 mb-8">
        <motion.button
          whileHover={{ gap: '1.25rem' }}
          onClick={onExplore}
          className="group flex items-center gap-3 bg-blue-600 font-display text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
        >
          EXPLORE ROUTE <ChevronRight className="w-5 h-5 transition-all" />
        </motion.button>
        <button
          onClick={onPrograms}
          className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all backdrop-blur-md border border-white/10 cursor-pointer"
        >
          UPCOMING PROGRAMS
        </button>
      </div>

      {/* Tuỳ chọn: Bạn có thể giữ hoặc xoá ScienceSnapshot ở đây nếu đã dùng Live Snapshot Card bên phải */}
      <ScienceSnapshot />
    </motion.div>

    {/* CỘT PHẢI: Các Widgets được chuyển từ App.jsx sang */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
      className="flex flex-col gap-6"
    >
      <Countdown />

      <div className="grid grid-cols-2 gap-4">
        <GlassCard
          onClick={onExplore}
          className="p-6 group cursor-pointer hover:bg-white/20 transition-all border-b-4 border-b-blue-400"
        >
          <div className="w-12 h-12 bg-blue-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-400 group-hover:text-white transition-all">
            <Navigation className="w-6 h-6 text-blue-300 group-hover:text-white" />
          </div>
          <h4 className="text-white font-bold mb-2">Science Route</h4>
          <p className="text-white/50 text-xs">Dẫn lối hành trình tri thức.</p>
        </GlassCard>

        <GlassCard
          onClick={onKnowledgeHub}
          className="p-6 group cursor-pointer hover:bg-white/20 transition-all border-b-4 border-b-teal-400"
        >
          <div className="w-12 h-12 bg-teal-400/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-400 group-hover:text-white transition-all">
            <BookOpen className="w-6 h-6 text-teal-300 group-hover:text-white" />
          </div>
          <h4 className="text-white font-bold mb-2">Knowledge Hub</h4>
          <p className="text-white/50 text-xs">Kho lưu trữ nghiên cứu.</p>
        </GlassCard>
      </div>

      <GlassCard className="p-6 flex items-center justify-between bg-gradient-to-r from-blue-900/40 via-blue-900/10 to-transparent border-white/5">
        <div>
          <h4 className="text-white font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" /> Live Snapshot
          </h4>
          <p className="text-white/40 text-xs uppercase mt-1">Real-time data from Quy Nhon coast</p>
        </div>
        <div className="text-right">
          <span className="block text-2xl font-display font-light text-white">26.5°C</span>
          <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold font-display">Sea Temp</span>
        </div>
      </GlassCard>
    </motion.div>

  </div>
);

export default Hero;