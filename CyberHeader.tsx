import React from 'react';
import { Shield, Volume2, VolumeX, Tv, HelpCircle, Backpack, FolderOpen, Radio } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

interface CyberHeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  crtEnabled: boolean;
  setCrtEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenRules: () => void;
  onOpenInventory: () => void;
  onOpenCases: () => void;
  unlockedCount: number;
}

export const CyberHeader: React.FC<CyberHeaderProps> = ({
  soundEnabled,
  setSoundEnabled,
  crtEnabled,
  setCrtEnabled,
  onOpenRules,
  onOpenInventory,
  onOpenCases,
  unlockedCount
}) => {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (next) playCyberSound('click');
  };

  const toggleCrt = () => {
    setCrtEnabled(!crtEnabled);
    if (soundEnabled) playCyberSound('click');
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0A0A0B]/95 border-b border-[#00F3FF]/30 backdrop-blur-md px-3 py-3 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono">
        {/* Logo & Persona Badge */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#00F3FF] animate-pulse rounded-full shadow-[0_0_10px_#00F3FF]"></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-widest uppercase text-[#00F3FF]">
                NEON AI // CYBER-ANALYST TERMINAL
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] tracking-wider font-mono px-2 py-0.5 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">
                <Radio className="w-3 h-3 animate-pulse" /> SECURE_ENCRYPTED
              </span>
            </div>
            <p className="text-[11px] text-[#00F3FF]/60">
              네오-시티 인과관계 원인&결과 데이터 분석 시스템
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Incident Cases Button */}
          <button
            onClick={() => {
              if (soundEnabled) playCyberSound('click');
              onOpenCases();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111114] hover:bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-mono border border-[#00F3FF]/30 hover:border-[#00F3FF] transition-all"
            title="사건 선택 및 커스텀 미션"
          >
            <FolderOpen className="w-4 h-4 text-[#00F3FF]" />
            <span className="hidden md:inline uppercase">사건 DB</span>
          </button>

          {/* Connective Pedagogy Rules Button */}
          <button
            onClick={() => {
              if (soundEnabled) playCyberSound('click');
              onOpenRules();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111114] hover:bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-mono border border-[#00F3FF]/40 hover:border-[#00F3FF] transition-all"
            title="원인과 결과 필수 연결어 가이드"
          >
            <HelpCircle className="w-4 h-4 text-[#00F3FF]" />
            <span className="hidden sm:inline font-bold uppercase">연결어 법칙</span>
          </button>

          {/* Hidden Inventory Button */}
          <button
            onClick={() => {
              if (soundEnabled) playCyberSound('click');
              onOpenInventory();
            }}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#111114] hover:bg-[#00F3FF]/10 text-[#00F3FF] text-xs font-mono border border-[#00F3FF]/40 hover:border-[#00F3FF] transition-all"
            title="사이버 배낭 (히든 아이템)"
          >
            <Backpack className="w-4 h-4 text-[#00F3FF]" />
            <span className="hidden sm:inline font-bold uppercase">사이버 배낭</span>
            {unlockedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 text-[10px] bg-[#00F3FF] text-[#0A0A0B] font-black">
                {unlockedCount}
              </span>
            )}
          </button>

          {/* CRT Effect Toggle */}
          <button
            onClick={toggleCrt}
            className={`p-1.5 rounded-sm border text-xs transition-all ${
              crtEnabled
                ? 'bg-[#00F3FF]/20 text-[#00F3FF] border-[#00F3FF]'
                : 'bg-[#111114] text-[#00F3FF]/40 border-[#00F3FF]/20 hover:text-[#00F3FF]'
            }`}
            title={crtEnabled ? 'CRT 필터 켜짐' : 'CRT 필터 꺼짐'}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-sm border text-xs transition-all ${
              soundEnabled
                ? 'bg-[#00F3FF]/20 text-[#00F3FF] border-[#00F3FF]'
                : 'bg-[#111114] text-[#00F3FF]/40 border-[#00F3FF]/20 hover:text-[#00F3FF]'
            }`}
            title={soundEnabled ? '사운드 켜짐' : '사운드 음소거'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
