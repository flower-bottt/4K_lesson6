import React from 'react';
import { CyberItem } from '../types';
import { ALL_CYBER_ITEMS } from '../data/items';
import { X, Backpack, Sparkles, Lock } from 'lucide-react';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedItemIds: string[];
}

export const InventoryModal: React.FC<InventoryModalProps> = ({
  isOpen,
  onClose,
  unlockedItemIds
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-xl bg-[#111114] border border-[#00F3FF]/40 rounded-sm p-5 sm:p-6 shadow-[0_0_25px_rgba(0,243,255,0.15)] text-[#00F3FF] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#00F3FF]/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">
              <Backpack className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#00F3FF] uppercase tracking-wider">
                NEON RUNNER // STORED ITEMS
              </h3>
              <p className="text-xs text-[#00F3FF]/60">
                추리 분석 성공 및 레벨업 시 획득한 특수 사이버 장비
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-[#0A0A0B] hover:bg-[#00F3FF]/20 text-[#00F3FF] border border-[#00F3FF]/30 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
          {ALL_CYBER_ITEMS.map((item) => {
            const isUnlocked = unlockedItemIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`p-3.5 border transition-all ${
                  isUnlocked
                    ? 'bg-[#00F3FF]/10 border-[#00F3FF]/50 text-white'
                    : 'bg-[#1A1A1D] border-[#00F3FF]/10 text-[#00F3FF]/30 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="text-2xl">{isUnlocked ? item.icon : '🔒'}</span>
                  <div>
                    <h4 className={`font-bold font-mono text-sm uppercase ${isUnlocked ? 'text-[#00F3FF]' : 'text-[#00F3FF]/40'}`}>
                      {item.name}
                    </h4>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#0A0A0B] border border-[#00F3FF]/20 text-[#00F3FF]/60 uppercase">
                      {isUnlocked ? 'ACTIVE_ITEM' : 'LOCKED'}
                    </span>
                  </div>
                </div>

                <p className="text-xs leading-relaxed font-mono">
                  {isUnlocked ? item.effect : '15 XP 만점 추리 또는 레벨업을 달성하여 이 히든 장비를 획득하세요.'}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-[#00F3FF]/20 flex items-center justify-between text-xs text-[#00F3FF]/60 font-mono">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#00F3FF]" />
            획득한 히든 아이템: {unlockedItemIds.length} / {ALL_CYBER_ITEMS.length}개
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00F3FF] text-[#0A0A0B] font-black uppercase transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
