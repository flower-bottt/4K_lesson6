import React from 'react';
import { CyberLevelInfo } from '../types';
import { CYBER_LEVELS } from './items';
import { motion } from 'motion/react';

interface LevelProgressProps {
  currentXp: number;
}

export const getLevelInfo = (xp: number): CyberLevelInfo => {
  if (xp >= 105) return CYBER_LEVELS[3]; // Lv 4
  if (xp >= 65) return CYBER_LEVELS[2];  // Lv 3
  if (xp >= 30) return CYBER_LEVELS[1];  // Lv 2
  return CYBER_LEVELS[0];                // Lv 1
};

export const LevelProgress: React.FC<LevelProgressProps> = ({ currentXp }) => {
  const currentLevel = getLevelInfo(currentXp);

  // Calculate percentage within current level step
  let percent = 0;
  if (currentLevel.level === 1) {
    percent = Math.min(100, Math.max(0, (currentXp / 25) * 100));
  } else if (currentLevel.level === 2) {
    percent = Math.min(100, Math.max(0, ((currentXp - 30) / 30) * 100));
  } else if (currentLevel.level === 3) {
    percent = Math.min(100, Math.max(0, ((currentXp - 65) / 35) * 100));
  } else {
    percent = 100;
  }

  return (
    <div className="bg-[#111114] border border-[#00F3FF]/20 rounded-sm p-4 font-mono shadow-[0_0_15px_rgba(0,243,255,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentLevel.badge}</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30 uppercase tracking-widest">
                LV.{currentLevel.level} {currentLevel.title}
              </span>
            </div>
            <p className="text-xs text-[#00F3FF]/60 font-mono mt-1 hidden sm:block">
              {currentLevel.description}
            </p>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-xl font-black text-[#00F3FF]">{currentXp}</span>
          <span className="text-xs text-[#00F3FF]/50 ml-1">XP</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-[#1A1A1D] rounded-none overflow-hidden border border-[#00F3FF]/20 my-2">
        <motion.div
          className="h-full bg-[#00F3FF] shadow-[0_0_10px_#00F3FF]"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>

      {/* Level Tier Stepper */}
      <div className="grid grid-cols-4 gap-2 mt-3 pt-2 border-t border-[#00F3FF]/20 text-center text-[10px] font-mono">
        {CYBER_LEVELS.map((lvl) => {
          const isActive = currentLevel.level >= lvl.level;
          const isCurrent = currentLevel.level === lvl.level;
          return (
            <div
              key={lvl.level}
              className={`py-1 px-1 transition-all ${
                isCurrent
                  ? 'bg-[#00F3FF] text-[#0A0A0B] font-black'
                  : isActive
                  ? 'text-[#00F3FF] bg-[#00F3FF]/10 border border-[#00F3FF]/30'
                  : 'text-[#00F3FF]/30 bg-[#1A1A1D] border border-[#00F3FF]/10'
              }`}
            >
              <div className="truncate">{lvl.badge} LV.{lvl.level}</div>
              <div className="text-[9px] truncate uppercase">{lvl.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
