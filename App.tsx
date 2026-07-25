import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CaseData, ChatLogMessage, DetectiveResponse } from './types';
import { NEO_CITY_CASES } from './cases';
import { CyberHeader } from './CyberHeader';
import { LevelProgress, getLevelInfo } from './LevelProgress';
import { CaseDetailsCard } from './CaseDetailsCard';
import { ConnectiveQuickBar } from './ConnectiveQuickBar';
import { TerminalView } from './TerminalView';
import { ConnectiveGuideModal } from './ConnectiveGuideModal';
import { InventoryModal } from './InventoryModal';
import { CaseSelectorModal } from './CaseSelectorModal';
import { playCyberSound } from './audio';

export default function App() {
  // Game & User State
  const [currentCase, setCurrentCase] = useState<CaseData>(NEO_CITY_CASES[0]);
  const [totalXp, setTotalXp] = useState<number>(0);
  const [unlockedItemIds, setUnlockedItemIds] = useState<string[]>([]);

  // UI Toggles
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [crtEnabled, setCrtEnabled] = useState<boolean>(true);

  // Modals
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState<boolean>(false);
  const [isCasesOpen, setIsCasesOpen] = useState<boolean>(false);

  // Terminal & Inputs
  const [inputAnswer, setInputAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Chat Log Feed
  const [logs, setLogs] = useState<ChatLogMessage[]>([
    {
      id: 'init_1',
      sender: 'SYSTEM',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      content: '네오-시티 사이버 메인프레임 접속 성공. 탐정 AI "NEON" 동기화 완료.'
    },
    {
      id: 'init_2',
      sender: 'NEON',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      content: '반갑네, 네트런너! 네오-시티 제3지구 중앙 교차로 신호등이 마비되었어. 오작동 원인과 그로 인한 결과를 분석하게! 필수 연결어("그래서", "왜냐하면", "~때문이다") 중 하나 이상을 꼭 넣어주어야 데이터가 복구된다네!',
      hasConnectiveError: false
    }
  ]);

  // Case Change Handler
  const handleSelectCase = (newCase: CaseData) => {
    setCurrentCase(newCase);
    const newLog: ChatLogMessage = {
      id: `case_change_${Date.now()}`,
      sender: 'NEON',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      content: `${newCase.title} 미션 접속 완료! ${newCase.mysteryQuestion}`,
      hasConnectiveError: false
    };
    setLogs((prev) => [...prev, newLog]);
    if (soundEnabled) playCyberSound('success');
  };

  // Insert connective helper into text field
  const handleInsertConnective = (connective: string) => {
    setInputAnswer((prev) => {
      if (!prev.trim()) {
        return `${connective} `;
      }
      return `${prev.trim()} ${connective} `;
    });
  };

  // Submit Answer to AI Detective Endpoint
  const handleSubmitAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAnswer.trim() || isLoading) return;

    const userMsgText = inputAnswer.trim();
    setInputAnswer('');

    // Add user message to log
    const userLog: ChatLogMessage = {
      id: `usr_${Date.now()}`,
      sender: 'NETRUNNER',
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      content: userMsgText
    };

    setLogs((prev) => [...prev, userLog]);
    setIsLoading(true);

    const oldLevel = getLevelInfo(totalXp).level;

    try {
      const response = await fetch('/api/detective', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userAnswer: userMsgText,
          caseTitle: currentCase.title,
          caseDescription: currentCase.description,
          caseSymptom: currentCase.symptom,
          currentXp: totalXp,
          currentLevel: oldLevel,
          unlockedItemIds
        })
      });

      const data: DetectiveResponse = await response.json();

      const newXpTotal = totalXp + (data.gainedXp || 0);
      const newLevel = getLevelInfo(newXpTotal).level;

      // Update XP & Unlock Item if granted
      setTotalXp(newXpTotal);

      let grantedItem = data.newItem;
      if (grantedItem && !unlockedItemIds.includes(grantedItem.id)) {
        setUnlockedItemIds((prev) => [...prev, grantedItem!.id]);
      } else {
        grantedItem = null;
      }

      // Check level-up sound & confetti celebration
      if (newLevel > oldLevel) {
        if (soundEnabled) playCyberSound('levelup');
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } else if (data.hasMandatoryConnective) {
        if (soundEnabled) playCyberSound('success');
      } else {
        if (soundEnabled) playCyberSound('error');
      }

      // Append NEON output log
      const neonLog: ChatLogMessage = {
        id: `neon_${Date.now()}`,
        sender: 'NEON',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        content: data.nextMissionPrompt || '다음 사건 단서를 더 조사해봅시다.',
        feedback: data.feedback,
        restoredSentence: data.restoredSentence,
        gainedXp: data.gainedXp,
        newItem: grantedItem,
        hasConnectiveError: !data.hasMandatoryConnective
      };

      setLogs((prev) => [...prev, neonLog]);
    } catch (err) {
      console.error('Error submitting to NEON Detective server:', err);
      if (soundEnabled) playCyberSound('error');

      const errorLog: ChatLogMessage = {
        id: `err_${Date.now()}`,
        sender: 'NEON',
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
        content: '데이터 네트워크 일시 손상. 필수 연결어("그래서", "왜냐하면", "~때문이다")를 넣어 다시 시도하세요!',
        feedback: '네트워크 연결 상태를 확인하고 원인과 결과 연결어를 탑재하여 재전송해 주세요.',
        restoredSentence: `${userMsgText} 왜냐하면 메인 통신회로에 이상이 발생했기 때문이다.`,
        gainedXp: 5,
        hasConnectiveError: true
      };
      setLogs((prev) => [...prev, errorLog]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-[#0A0A0B] text-[#00F3FF] font-mono selection:bg-[#00F3FF] selection:text-[#0A0A0B] relative overflow-x-hidden ${crtEnabled ? 'crt-scanlines' : ''}`}>
      {/* Background Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-[#00F3FF]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-[#00F3FF]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Cyberpunk Navigation Header */}
      <CyberHeader
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        crtEnabled={crtEnabled}
        setCrtEnabled={setCrtEnabled}
        onOpenRules={() => setIsRulesOpen(true)}
        onOpenInventory={() => setIsInventoryOpen(true)}
        onOpenCases={() => setIsCasesOpen(true)}
        unlockedCount={unlockedItemIds.length}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-4 space-y-4">
        {/* Level & XP Progression Status */}
        <LevelProgress currentXp={totalXp} />

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Active Case Overview & Quick Connective Bar */}
          <div className="lg:col-span-5 space-y-4">
            <CaseDetailsCard currentCase={currentCase} soundEnabled={soundEnabled} />
            <ConnectiveQuickBar onInsertConnective={handleInsertConnective} soundEnabled={soundEnabled} />
          </div>

          {/* Right Column: Terminal Chat Feed & Input */}
          <div className="lg:col-span-7">
            <TerminalView
              logs={logs}
              inputAnswer={inputAnswer}
              setInputAnswer={setInputAnswer}
              onSubmit={handleSubmitAnswer}
              isLoading={isLoading}
              soundEnabled={soundEnabled}
              totalXp={totalXp}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ConnectiveGuideModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
      <InventoryModal
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        unlockedItemIds={unlockedItemIds}
      />
      <CaseSelectorModal
        isOpen={isCasesOpen}
        onClose={() => setIsCasesOpen(false)}
        onSelectCase={handleSelectCase}
        activeCaseId={currentCase.id}
      />
    </div>
  );
}
