export type CyberLevelId = 1 | 2 | 3 | 4;

export interface CyberLevelInfo {
  level: CyberLevelId;
  title: string;
  minXp: number;
  maxXp: number;
  badge: string;
  color: string;
  description: string;
}

export interface CyberItem {
  id: string;
  name: string;
  icon: string;
  effect: string;
  unlockedAtXp?: number;
}

export interface CaseData {
  id: string;
  title: string;
  codeName: string;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  description: string;
  symptom: string; // 현상 (결과)
  mysteryQuestion: string; // 사건 질문
  hint: string;
}

export interface ChatLogMessage {
  id: string;
  sender: 'SYSTEM' | 'NEON' | 'NETRUNNER';
  timestamp: string;
  content: string;
  feedback?: string;
  restoredSentence?: string;
  gainedXp?: number;
  newItem?: CyberItem | null;
  hasConnectiveError?: boolean;
}

export interface DetectiveResponse {
  feedback: string;
  restoredSentence: string;
  gainedXp: number;
  hasMandatoryConnective: boolean;
  usedConnectives: string[];
  newItem: CyberItem | null;
  nextMissionPrompt: string;
}
