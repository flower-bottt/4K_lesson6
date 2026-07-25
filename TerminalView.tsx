import React, { useRef, useEffect } from 'react';
import { ChatLogMessage } from '../types';
import { Terminal, Send, Cpu, CheckCircle2, AlertOctagon, Gift, Zap, CornerDownLeft } from 'lucide-react';
import { playCyberSound } from '../utils/audio';
import { getLevelInfo } from './LevelProgress';

interface TerminalViewProps {
  logs: ChatLogMessage[];
  inputAnswer: string;
  setInputAnswer: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  soundEnabled: boolean;
  totalXp: number;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  logs,
  inputAnswer,
  setInputAnswer,
  onSubmit,
  isLoading,
  soundEnabled,
  totalXp
}) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isLoading]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputAnswer.trim() && !isLoading) {
        onSubmit(e as unknown as React.FormEvent);
      }
    }
  };

  const currentLevel = getLevelInfo(totalXp);

  return (
    <div className="flex flex-col bg-[#0A0A0B] border border-[#00F3FF]/30 rounded-sm overflow-hidden shadow-[0_0_20px_rgba(0,243,255,0.08)] font-mono">
      {/* Terminal Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#111114] border-b border-[#00F3FF]/20 text-xs font-mono">
        <div className="flex items-center gap-2 text-[#00F3FF] font-bold uppercase tracking-wider">
          <Terminal className="w-4 h-4 text-[#00F3FF]" />
          <span>NEON AI // CYBER-ANALYST FEEDBACK LOG</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#00F3FF]/40 uppercase">MOD_ID: 99x-NEON</span>
          <div className="w-2 h-2 bg-[#00F3FF] rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Terminal Content Feed */}
      <div className="p-4 sm:p-5 space-y-4 max-h-[520px] min-h-[320px] overflow-y-auto font-mono text-sm leading-relaxed scrollbar-thin scrollbar-thumb-[#00F3FF]/30 scrollbar-track-[#0A0A0B]">
        {logs.map((log) => {
          if (log.sender === 'SYSTEM') {
            return (
              <div key={log.id} className="p-3 rounded-sm bg-[#111114] border border-[#00F3FF]/20 text-xs text-[#00F3FF]/70 font-mono">
                <span className="text-[#00F3FF] font-bold">[SYSTEM_INIT]:</span> {log.content}
              </div>
            );
          }

          if (log.sender === 'NETRUNNER') {
            return (
              <div key={log.id} className="flex justify-end">
                <div className="max-w-[85%] p-3 rounded-sm bg-[#00F3FF]/10 border border-[#00F3FF]/40 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#00F3FF] font-bold mb-1 uppercase tracking-wider">
                    <span>🕶️ 네트런너 (분석관)</span>
                    <span className="text-[#00F3FF]/30">|</span>
                    <span className="text-[#00F3FF]/60 text-[10px]">{log.timestamp}</span>
                  </div>
                  <p className="whitespace-pre-wrap">{log.content}</p>
                </div>
              </div>
            );
          }

          // NEON AI Output (Terminal Log Strict Template Format)
          return (
            <div key={log.id} className="flex justify-start">
              <div className="w-full max-w-[95%] sm:max-w-[92%] p-4 rounded-sm bg-[#111114] border border-[#00F3FF]/20 relative">
                <div className="absolute top-1 right-2 text-[8px] text-[#00F3FF]/20 uppercase">MOD_ID: 99x-NEON</div>

                {/* Header Tag */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#00F3FF]/20 text-xs text-[#00F3FF] font-bold">
                  <span className="flex items-center gap-1.5 uppercase tracking-wider">
                    <Cpu className="w-4 h-4 text-[#00F3FF] animate-pulse" />
                    🖥️ [사이버 분석 피드백]
                  </span>
                  <span className="text-[#00F3FF]/40 text-[10px]">{log.timestamp}</span>
                </div>

                {/* Strict Template Structure */}
                <div className="space-y-4 text-xs sm:text-sm">
                  {/* Feedback Section */}
                  <div className={`p-3 rounded-sm border ${
                    log.hasConnectiveError
                      ? 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                      : 'bg-[#00F3FF]/5 border-[#00F3FF]/30 text-white'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-[#00F3FF]">
                      {log.hasConnectiveError ? (
                        <AlertOctagon className="w-4 h-4 text-rose-400" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-[#00F3FF]" />
                      )}
                      <span>분석 상태 리포트:</span>
                    </div>
                    <p className="leading-relaxed">{log.feedback || log.content}</p>
                  </div>

                  {/* Restored Sentence */}
                  {log.restoredSentence && (
                    <div className="p-4 bg-[#00F3FF]/5 border-l-4 border-[#00F3FF]">
                      <p className="text-[#00F3FF]/70 text-xs mb-1 uppercase tracking-widest italic">
                        ✏️ [데이터 복구 문장]:
                      </p>
                      <p className="text-base sm:text-lg font-semibold text-white">
                        "{log.restoredSentence}"
                      </p>
                    </div>
                  )}

                  {/* Energy XP Reward & Cyber Level */}
                  {typeof log.gainedXp === 'number' && (
                    <div className="flex flex-wrap items-center gap-3 font-mono">
                      <div className="bg-[#00F3FF] text-[#0A0A0B] px-3 py-1 text-xs sm:text-sm font-black uppercase">
                        ⚡ [에너지 보상]
                      </div>
                      <div className="text-sm text-white">
                        +{log.gainedXp} XP <span className="text-[#00F3FF]/50">(현재: Lv.{currentLevel.level} / TOTAL {totalXp} XP)</span>
                      </div>
                    </div>
                  )}

                  {/* Hidden Item Box */}
                  {log.newItem && (
                    <div className="border border-dashed border-[#00F3FF]/40 p-3 flex items-center gap-3 bg-[#0A0A0B]">
                      <span className="text-2xl">💾</span>
                      <div>
                        <div className="text-xs font-bold uppercase text-[#00F3FF]">🎁 [히든 아이템] 획득!</div>
                        <div className="text-sm text-white font-bold">{log.newItem.name}</div>
                        <div className="text-xs text-[#00F3FF]/70">{log.newItem.effect}</div>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t border-[#00F3FF]/20 my-2"></div>

                  {/* Next Cyber Mission */}
                  <div className="bg-[#00F3FF]/10 border border-[#00F3FF]/30 p-3.5">
                    <p className="text-[#00F3FF] text-xs font-bold mb-1 uppercase tracking-wider">🔍 [다음 사이버 미션]:</p>
                    <p className="text-sm text-white leading-relaxed">{log.content}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex items-center gap-3 p-4 bg-[#111114] border border-[#00F3FF]/40 text-[#00F3FF] animate-pulse font-mono text-xs">
            <Cpu className="w-5 h-5 text-[#00F3FF] animate-spin" />
            <span>NEON 분석 회로에서 원인과 결과 데이터 연결성을 검증하는 중...</span>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Terminal Form */}
      <form onSubmit={onSubmit} className="p-3 bg-[#111114] border-t border-[#00F3FF]/30">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-[#00F3FF] font-bold text-base select-none">
            &gt;
          </span>
          <textarea
            value={inputAnswer}
            onChange={(e) => setInputAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="원인과 결과 필수 연결어(그래서, 왜냐하면, ~때문이다)를 사용하여 분석 데이터를 입력하세요..."
            rows={2}
            disabled={isLoading}
            className="w-full pl-8 pr-28 py-2.5 bg-[#0A0A0B] text-white placeholder-[#00F3FF]/30 border border-[#00F3FF]/30 focus:border-[#00F3FF] outline-none text-xs sm:text-sm font-mono resize-none transition-all"
          />
          <button
            type="submit"
            disabled={!inputAnswer.trim() || isLoading}
            onClick={() => {
              if (soundEnabled) playCyberSound('click');
            }}
            className="absolute right-2 px-3 py-2 bg-[#00F3FF] hover:bg-[#00F3FF]/80 disabled:bg-[#1A1A1D] text-[#0A0A0B] disabled:text-[#00F3FF]/30 font-black text-xs font-mono uppercase flex items-center gap-1 transition-all"
          >
            <span>분석 전송</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-1.5 px-1 text-[11px] text-[#00F3FF]/50 font-mono">
          <span>[Shift + Enter: 줄바꿈 | Enter: 전송]</span>
          <span className="flex items-center gap-1 text-[#00F3FF]">
            <CornerDownLeft className="w-3 h-3" /> 필수 연결어 자동 검증
          </span>
        </div>
      </form>
    </div>
  );
};
