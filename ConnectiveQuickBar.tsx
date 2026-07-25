import React from 'react';
import { Sparkles } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

interface ConnectiveQuickBarProps {
  onInsertConnective: (connective: string) => void;
  soundEnabled: boolean;
}

export const ConnectiveQuickBar: React.FC<ConnectiveQuickBarProps> = ({ onInsertConnective, soundEnabled }) => {
  const connectives = [
    { text: '그래서', desc: '원인 → 결과 연결' },
    { text: '왜냐하면', desc: '결과 → 원인 연결' },
    { text: '~때문이다', desc: '원인 강조 마무리' }
  ];

  return (
    <div className="bg-[#111114] border border-[#00F3FF]/20 rounded-sm p-3 font-mono shadow-sm">
      <div className="flex items-center gap-1.5 text-xs text-[#00F3FF] font-bold mb-2 uppercase tracking-wider">
        <Sparkles className="w-3.5 h-3.5 text-[#00F3FF] animate-spin" />
        <span>⚡ [필수 연결어 빠른 탑재]: 클릭하여 문장에 바로 추가하세요</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {connectives.map((item) => (
          <button
            key={item.text}
            type="button"
            onClick={() => {
              if (soundEnabled) playCyberSound('connective');
              onInsertConnective(item.text);
            }}
            className="group relative flex flex-col items-center justify-center p-2 rounded-sm bg-[#0A0A0B] hover:bg-[#00F3FF]/10 border border-[#00F3FF]/30 hover:border-[#00F3FF] text-[#00F3FF] transition-all active:scale-95"
          >
            <span className="font-bold text-sm text-[#00F3FF]">
              +{item.text}
            </span>
            <span className="text-[9px] text-[#00F3FF]/60 mt-0.5 hidden sm:inline uppercase">
              {item.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
