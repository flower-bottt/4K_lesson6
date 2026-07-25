import { CyberItem, CyberLevelInfo } from '../types';

export const CYBER_LEVELS: CyberLevelInfo[] = [
  {
    level: 1,
    title: '신입 코더',
    minXp: 0,
    maxXp: 25,
    badge: '👾',
    color: 'from-emerald-500 to-teal-400',
    description: '기초 원인과 결과 논리를 배우기 시작한 터미널 데이터 수습생'
  },
  {
    level: 2,
    title: '사이버 탐정',
    minXp: 30,
    maxXp: 60,
    badge: '🕶️',
    color: 'from-cyan-500 to-blue-500',
    description: '네오-시티의 기이한 사건들의 인과관계를 능숙하게 추리하는 분석 전문가'
  },
  {
    level: 3,
    title: '네트런너',
    minXp: 65,
    maxXp: 100,
    badge: '⚡',
    color: 'from-purple-500 to-pink-500',
    description: '복잡한 도시 시스템의 오류 코드를 한눈에 꿰뚫어 보는 고급 데이터 추리자'
  },
  {
    level: 4,
    title: '전설의 마스터 해커',
    minXp: 105,
    maxXp: 9999,
    badge: '👑',
    color: 'from-amber-400 to-yellow-300',
    description: '모든 네트워크 오류를 원인과 결과의 법칙으로 지배하는 네오-시티의 레전드'
  }
];

export const ALL_CYBER_ITEMS: CyberItem[] = [
  {
    id: 'quantum_chip',
    name: '💾 양자 데이터 칩',
    icon: '💾',
    effect: '데이터 분석 속도를 200% 향상시켜 사건의 원인을 1초 만에 스캔합니다.'
  },
  {
    id: 'neon_visor',
    name: '🕶️ 네온 바이저',
    icon: '🕶️',
    effect: '오작동 네트워크 신호 속 숨겨진 인과관계 연결어("그래서", "왜냐하면")를 투시합니다.'
  },
  {
    id: 'plasma_memory',
    name: '⚡ 플라스마 메모리',
    icon: '⚡',
    effect: '추리 논리력을 극대화하여 분석 성공 시 추가 에너지를 축적합니다.'
  },
  {
    id: 'crypto_key',
    name: '🔑 암호 해독키',
    icon: '🔑',
    effect: '네오-시티 중앙 보안 침입 기록을 복구하는 핵심 보안 디바이스.'
  },
  {
    id: 'nano_drone',
    name: '🤖 나노 드론',
    icon: '🤖',
    effect: '사건 현장 방방곡곡에 침투해 결과 분석을 돕는 정찰용 공중 드론.'
  },
  {
    id: 'quantum_firewall',
    name: '🛡️ 양자 방화벽',
    icon: '🛡️',
    effect: '데이터 전송 오류와 비논리적 연결어 생성을 원천 차단하는 방어막.'
  },
  {
    id: 'satellite_link',
    name: '🛰️ 위성 해킹 렌즈',
    icon: '🛰️',
    effect: '네오-시티 전역의 인과관계 데이터를 실시간 추적하는 위성 스캐너.'
  }
];
