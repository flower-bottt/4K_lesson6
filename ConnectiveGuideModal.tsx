import React from 'react';
import { X, Sparkles, CheckCircle2, AlertTriangle, BookOpen } from 'lucide-react';

interface ConnectiveGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConnectiveGuideModal: React.FC<ConnectiveGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0B]/85 backdrop-blur-md animate-fadeIn font-mono">
      <div className="relative w-full max-w-2xl bg-[#111114] border border-[#00F3FF]/40 rounded-sm p-5 sm:p-6 shadow-[0_0_25px_rgba(0,243,255,0.15)] text-[#00F3FF] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#00F3FF]/20">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#00F3FF]/10 text-[#00F3FF] border border-[#00F3FF]/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#00F3FF] uppercase tracking-wider">
                NEON AI // CAUSE & EFFECT CONNECTIVE RULES
              </h3>
              <p className="text-xs text-[#00F3FF]/60">
                사이버 터미널 데이터 복구를 위한 필수 가이드
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

        {/* Modal Content */}
        <div className="space-y-4 my-4 text-xs sm:text-sm">
          {/* Concept Explanation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 bg-[#0A0A0B] border border-[#00F3FF]/30">
              <div className="text-[#00F3FF] font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                🔍 원인 (Cause)
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                사건이나 현상이 일어나게 만든 <span className="text-[#00F3FF] font-bold">이유와 배경</span>입니다.
              </p>
            </div>

            <div className="p-3.5 bg-[#0A0A0B] border border-[#00F3FF]/30">
              <div className="text-[#00F3FF] font-bold mb-1 flex items-center gap-1 uppercase tracking-wider">
                💥 결과 (Effect)
              </div>
              <p className="text-white/80 text-xs leading-relaxed">
                원인으로 인해 마지막에 <span className="text-[#00F3FF] font-bold">벌어진 결과나 상태</span>입니다.
              </p>
            </div>
          </div>

          {/* Mandatory Connective Rules */}
          <div className="p-4 bg-[#00F3FF]/5 border border-[#00F3FF]/30 space-y-3">
            <h4 className="font-bold text-[#00F3FF] flex items-center gap-1.5 text-sm uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#00F3FF]" />
              필수 탑재 연결어 3가지 (데이터 전송 오류 방지)
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-[#0A0A0B] border border-[#00F3FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-[#00F3FF] text-sm">1. "그래서"</span>
                <span className="text-white/80">[원인]을 먼저 쓰고, 그 뒤에 [결과]를 이어 줄 때 사용!</span>
              </div>

              <div className="p-2.5 bg-[#0A0A0B] border border-[#00F3FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-[#00F3FF] text-sm">2. "왜냐하면"</span>
                <span className="text-white/80">[결과]를 먼저 밝히고, 그 뒤에 [원인]을 설명할 때 사용!</span>
              </div>

              <div className="p-2.5 bg-[#0A0A0B] border border-[#00F3FF]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-[#00F3FF] text-sm">3. "~때문이다"</span>
                <span className="text-white/80">문장의 마지막에 원인을 강조하며 깔끔하게 마무리할 때 사용!</span>
              </div>
            </div>
          </div>

          {/* Examples Comparison */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#00F3FF] text-xs uppercase tracking-wider">
              💡 실전 분석 문장 비교
            </h4>

            <div className="p-3 bg-rose-950/20 border border-rose-500/30 text-xs">
              <div className="font-bold text-rose-400 mb-0.5 flex items-center gap-1 uppercase">
                <AlertTriangle className="w-3.5 h-3.5" /> [데이터 전송 오류 예시 - 필수 연결어 누락]
              </div>
              <p className="text-white/80 italic">"해킹 바이러스가 침투했다. 신호등이 고장 났다."</p>
              <p className="text-[11px] text-rose-300 mt-1">➔ NEON 피드백: 원인과 결과는 맞지만 연결어가 없어서 파편화된 데이터입니다!</p>
            </div>

            <div className="p-3 bg-[#00F3FF]/10 border border-[#00F3FF]/40 text-xs">
              <div className="font-bold text-[#00F3FF] mb-0.5 flex items-center gap-1 uppercase">
                <CheckCircle2 className="w-3.5 h-3.5" /> [데이터 완벽 복구 예시 - 연결어 탑재]
              </div>
              <p className="text-white font-bold">
                "메인 제어 서버에 해킹 바이러스가 침투했다. <span className="text-[#00F3FF] underline underline-offset-2 font-black">그래서</span> 신호등이 보라색으로 반짝이며 마비되었다."
              </p>
              <p className="text-[11px] text-[#00F3FF] mt-1">➔ NEON 피드백: 데이터 분석 완료! +15 XP 및 히든 아이템 획득!</p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#00F3FF]/20 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00F3FF] text-[#0A0A0B] font-black uppercase transition-all"
          >
            확인 및 터미널 복귀
          </button>
        </div>
      </div>
    </div>
  );
};
