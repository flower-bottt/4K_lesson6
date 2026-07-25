import React, { useState } from 'react';
import { CaseData } from '../types';
import { AlertTriangle, Lightbulb, MapPin, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { playCyberSound } from './audio';

interface CaseDetailsCardProps {
  currentCase: CaseData;
  soundEnabled: boolean;
}

export const CaseDetailsCard: React.FC<CaseDetailsCardProps> = ({ currentCase, soundEnabled }) => {
  const [showHint, setShowHint] = useState(false);

  const toggleHint = () => {
    setShowHint(!showHint);
    if (soundEnabled) playCyberSound('click');
  };

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-rose-950/80 text-rose-300 border-rose-500/50';
      case 'HIGH':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50';
      default:
        return 'bg-[#00F3FF]/10 text-[#00F3FF] border-[#00F3FF]/40';
    }
  };

  return (
    <div className="bg-[#111114] border border-[#00F3FF]/20 rounded-sm p-4 sm:p-5 font-mono relative shadow-[0_0_15px_rgba(0,243,255,0.05)]">
      <div className="absolute top-1 right-2 text-[8px] text-[#00F3FF]/20 uppercase">MOD_ID: 99x-NEON</div>

      {/* Title Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#00F3FF]/20 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">
            {currentCase.codeName}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#00F3FF]" />
            {currentCase.title}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 text-[#00F3FF]/70">
            <MapPin className="w-3.5 h-3.5 text-[#00F3FF]" /> {currentCase.location}
          </span>
          <span className={`px-2 py-0.5 border font-semibold text-[10px] uppercase ${getSeverityStyle(currentCase.severity)}`}>
            {currentCase.severity}
          </span>
        </div>
      </div>

      {/* Description & Symptoms */}
      <div className="space-y-3 text-sm">
        <div className="bg-[#0A0A0B] p-3 border border-[#00F3FF]/20">
          <div className="text-xs font-mono text-[#00F3FF] font-semibold mb-1 flex items-center gap-1 uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" /> 사건 브리핑
          </div>
          <p className="text-white/90 leading-relaxed text-xs sm:text-sm">{currentCase.description}</p>
        </div>

        <div className="bg-[#00F3FF]/5 p-3 border-l-4 border-[#00F3FF]">
          <div className="text-xs font-mono text-[#00F3FF] font-bold mb-1 uppercase tracking-wider">
            🚨 발생한 현상 [결과]
          </div>
          <p className="text-white font-mono text-xs sm:text-sm">{currentCase.symptom}</p>
        </div>

        {/* Detective Question */}
        <div className="bg-[#0A0A0B] p-3.5 border border-[#00F3FF]/40 shadow-[0_0_10px_rgba(0,243,255,0.1)]">
          <p className="text-[#00F3FF] font-bold text-xs sm:text-sm leading-relaxed">
            {currentCase.mysteryQuestion}
          </p>
        </div>

        {/* Expandable Hint Box */}
        <div className="pt-1">
          <button
            onClick={toggleHint}
            className="flex items-center justify-between w-full text-xs font-mono px-3 py-1.5 bg-[#0A0A0B] text-[#00F3FF] border border-[#00F3FF]/30 hover:border-[#00F3FF] transition-all"
          >
            <span className="flex items-center gap-1.5 font-bold uppercase">
              <Lightbulb className="w-3.5 h-3.5 text-[#00F3FF] animate-pulse" />
              사이버 힌트 (인과관계 분석 도우미)
            </span>
            {showHint ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHint && (
            <div className="mt-2 p-3 bg-[#0A0A0B] border border-[#00F3FF]/30 text-[#00F3FF]/90 text-xs leading-relaxed font-mono">
              {currentCase.hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
