import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 12, mins: 30, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <GlassCard className="p-6 mt-8 max-w-md">
      <h3 className="text-white font-medium mb-4 flex items-center gap-2">
        <Calendar className="w-4 h-4" /> Quy Nhơn Science Week Countdown
      </h3>
      <div className="grid grid-cols-4 gap-4 text-center">
        {[
          { v: timeLeft.days, l: 'Days' },
          { v: timeLeft.hours, l: 'Hours' },
          { v: timeLeft.mins, l: 'Mins' },
          { v: timeLeft.secs, l: 'Secs' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-2xl font-bold text-white leading-none">{item.v}</span>
            <span className="text-[10px] text-white/50 uppercase mt-1">{item.l}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default Countdown;
