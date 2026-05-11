import React from 'react';
import { Waves, Sun, Wind, Droplets } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const Widget = ({ icon: Icon, label, value, unit }) => (
  <GlassCard className="p-4 flex items-center gap-4 min-w-[160px]">
    <div className="p-2 bg-white/10 rounded-lg">
      <Icon className="w-5 h-5 text-blue-300" />
    </div>
    <div>
      <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
      <p className="text-lg font-semibold text-white">
        {value}<span className="text-sm font-normal text-white/70 ml-1">{unit}</span>
      </p>
    </div>
  </GlassCard>
);

const ScienceSnapshot = () => (
  <div className="flex flex-wrap gap-4 mt-8">
    <Widget icon={Waves} label="Sea Temp" value="26.5" unit="°C" />
    <Widget icon={Sun} label="UV Index" value="8" unit="High" />
    <Widget icon={Wind} label="Wind Speed" value="12" unit="km/h" />
    <Widget icon={Droplets} label="Humidity" value="78" unit="%" />
  </div>
);

export default ScienceSnapshot;
