import React, { useState } from 'react';
import { CaseData } from './types';
import { NEO_CITY_CASES } from './cases';
import { X, FolderOpen, Plus, AlertCircle, MapPin, Zap } from 'lucide-react';

interface CaseSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCase: (caseData: CaseData) => void;
  activeCaseId: string;
}

export const CaseSelectorModal: React.FC<CaseSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectCase,
  activeCaseId
}) => {
  const [activeTab, setActiveTab] = useState<'LIST' | 'CREATE'>('LIST');

  // Custom case creator form state
  const [customTitle, setCustomTitle] = useState('');
  const [customLocation, setCustomLocation] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');

  if (!isOpen) return null;

  const handleCreateCustomCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customDescription.trim() || !customSymptom.trim()) return;

    const newCase: CaseData = {
      id: `custom_${Date.now()}`,
      title: customTitle,
      codeName: 'CUSTOM_USER_INCIDENT',
      location: customLocation || '네오-시티 미확인 지구',
      severity: 'HIGH',
      description: customDescription,
      symptom: customSymptom,
      mysteryQuestion: customQuestion || `탐정 네온: "${customTitle}의 오작동 원인과 결과를 인과관계 필수 연결어를 넣어 분석하라!"`,
      hint: '원인을 일으킨 이유와 그로 인해 발생한 결과를 "그래서", "왜냐하면", "~때문이다" 연결어로 깔끔하게 정리해봐!'
    };

    onSelectCase(newCase);
    setActiveTab('LIST');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-2xl bg-[#111114] border border-[#00F3FF]/40 rounded-sm p-5 sm:p-6 shadow-[0_0_25px_rgba(0,243,255,0.15)] text-[#00F3FF] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#00F3FF]/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">
              <FolderOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#00F3FF] uppercase tracking-wider">
                NEON AI // INCIDENT DATABASE
              </h3>
              <p className="text-xs text-[#00F3FF]/60">
                해결할 인과관계 데이터 오작동 미션을 선택하세요
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

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 my-4 border-b border-[#00F3FF]/20 pb-2">
          <button
            onClick={() => setActiveTab('LIST')}
            className={`px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
              activeTab === 'LIST'
                ? 'bg-[#00F3FF] text-[#0A0A0B]'
                : 'text-[#00F3FF]/60 hover:text-[#00F3FF] bg-[#0A0A0B] border border-[#00F3FF]/20'
            }`}
          >
            기본 사건 DB ({NEO_CITY_CASES.length})
          </button>
          <button
            onClick={() => setActiveTab('CREATE')}
            className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs font-bold uppercase transition-all ${
              activeTab === 'CREATE'
                ? 'bg-[#00F3FF] text-[#0A0A0B]'
                : 'text-[#00F3FF]/60 hover:text-[#00F3FF] bg-[#0A0A0B] border border-[#00F3FF]/20'
            }`}
          >
            <Plus className="w-3.5 h-3.5" /> 나만의 커스텀 미션
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'LIST' ? (
          <div className="space-y-3 my-2">
            {NEO_CITY_CASES.map((c) => {
              const isSelected = c.id === activeCaseId;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    onSelectCase(c);
                    onClose();
                  }}
                  className={`p-4 border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#00F3FF]/10 border-[#00F3FF] text-white'
                      : 'bg-[#0A0A0B] border-[#00F3FF]/20 hover:border-[#00F3FF]/60 text-white/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#00F3FF]" />
                      <h4 className="font-bold text-sm font-mono text-[#00F3FF]">{c.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-mono text-[#00F3FF]/60">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3 text-[#00F3FF]" /> {c.location}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 bg-[#00F3FF] text-[#0A0A0B] font-bold text-[10px] uppercase">
                          ACTIVE
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-white/70 line-clamp-2">{c.description}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <form onSubmit={handleCreateCustomCase} className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-[#0A0A0B] border border-[#00F3FF]/30 text-[#00F3FF] leading-relaxed mb-3">
              💡 학교나 일상생활, 상상 속 미래 도시에서 발생한 오작동 사건을 직접 작성해보세요! 네온 탐정이 바로 추리 미션을 부여합니다.
            </div>

            <div>
              <label className="block text-[#00F3FF] font-bold mb-1 uppercase">사건 제목</label>
              <input
                type="text"
                required
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="예: 교실 스마트 칠판 화면 보라색 반전 사건"
                className="w-full px-3 py-2 bg-[#0A0A0B] border border-[#00F3FF]/30 text-white placeholder-[#00F3FF]/30 focus:border-[#00F3FF] outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[#00F3FF] font-bold mb-1 uppercase">발생 장소</label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="예: 6학년 2반 교실"
                  className="w-full px-3 py-2 bg-[#0A0A0B] border border-[#00F3FF]/30 text-white placeholder-[#00F3FF]/30 focus:border-[#00F3FF] outline-none"
                />
              </div>

              <div>
                <label className="block text-[#00F3FF] font-bold mb-1 uppercase">발생한 결과 (현상)</label>
                <input
                  type="text"
                  required
                  value={customSymptom}
                  onChange={(e) => setCustomSymptom(e.target.value)}
                  placeholder="예: 화면이 까맣게 깜빡이며 글씨가 뒤집힘"
                  className="w-full px-3 py-2 bg-[#0A0A0B] border border-[#00F3FF]/30 text-white placeholder-[#00F3FF]/30 focus:border-[#00F3FF] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#00F3FF] font-bold mb-1 uppercase">사건 상세 설명 (원인 힌트 포함)</label>
              <textarea
                required
                rows={3}
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                placeholder="어떤 원인 때문에 무슨 현상이 나타났는지 스토리를 작성하세요..."
                className="w-full px-3 py-2 bg-[#0A0A0B] border border-[#00F3FF]/30 text-white placeholder-[#00F3FF]/30 focus:border-[#00F3FF] outline-none resize-none"
              />
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-[#00F3FF] text-[#0A0A0B] font-black uppercase transition-all"
              >
                커스텀 사건 생성 및 탐정 접속
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
