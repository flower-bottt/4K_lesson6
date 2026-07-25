import { CaseData } from './types';

export const NEO_CITY_CASES: CaseData[] = [
  {
    id: 'case_01',
    title: '사건 #1: 중앙 신호등 데이터 마비',
    codeName: 'TRAFFIC_GRID_LOCK',
    location: '네오-시티 제3지구 중앙 교차로',
    severity: 'CRITICAL',
    description: '갑자기 제3지구의 모든 교통 신호등이 보라색 점멸등으로 오작동하여 자율주행 차량들이 도로 중앙에 멈춰 섰다!',
    symptom: '자율주행 스카이카 50여 대가 교차로에서 엉켜 도로가 완전히 통제 불능이 됨.',
    mysteryQuestion: '탐정 네온: "네트런너, 왜 신호등 데이터가 오작동했고 그 결과 어떤 일이 일어났는지 원인과 결과를 분석하여 보고하게!"',
    hint: '힌트: 메인 제어 서버에 누군가 악성 노이즈 코드를 전송했기 때문일 수도 있고, 해킹 바이러스로 인해 신호 변환기가 과부화되었기 때문일 수 있어.'
  },
  {
    id: 'case_02',
    title: '사건 #2: 나노 택배 드론 집단 폭주',
    codeName: 'DRONE_SWARM_MALFUNCTION',
    location: '네오-시티 하늘정원 물류 센터',
    severity: 'HIGH',
    description: '소형 택배 드론 백여 대가 택배 박스를 상공에서 임의로 떨어뜨리고 빙글빙글 회전하는 이상 행동을 보이고 있다.',
    symptom: '도시 상공에서 피자 박스와 전자 기기가 무작위로 낙하함.',
    mysteryQuestion: '탐정 네온: "드론들의 위치 추적 센서가 이상 반응을 일으킨 원인은 무엇인가? 인과관계를 밝혀내라!"',
    hint: '힌트: 자기장 발생 장치가 고장 났거나, 주파수 간섭이 일어났기 때문에 위치 센서가 혼동을 일으켰을 거야.'
  },
  {
    id: 'case_03',
    title: '사건 #3: 홀로그램 빌보드 기억 환각',
    codeName: 'HOLOGRAM_MEMORY_LEAK',
    location: '네오-시티 광장 3D 홀로그램 타워',
    severity: 'MEDIUM',
    description: '광장의 거대한 고양이 홀로그램 광고판이 갑자기 시민들에게 10년 전 옛날 추억 노래만 무한 재생하고 있다.',
    symptom: '시민들이 광고를 보는 대신 길거리에서 갑자기 추억에 잠겨 눈물을 흘림.',
    mysteryQuestion: '탐정 네온: "홀로그램 타워에 무슨 일이 생겨서 시민들이 추억에 잠기게 되었는지 분석해봐!"',
    hint: '힌트: 음향 데이터 칩이 과거 파일과 섞였기 때문일 수 있고, 중앙 클라우드 메모리가 과열되어 백업 데이터가 유출되었기 때문이야.'
  },
  {
    id: 'case_04',
    title: '사건 #4: 중앙 로봇 강아지 집단 실종',
    codeName: 'CYBER_PET_DISAPPEARANCE',
    location: '네오-시티 중앙 공원',
    severity: 'MEDIUM',
    description: '시민들의 인공지능 반려견 로봇 20마리가 특정 시간만 되면 한꺼번에 공원 지하 통로로 이동하는 기이한 현상이 일어났다.',
    symptom: '공원에서 놀던 AI 반려견들이 주인의 명령을 무시하고 지하 터널로 걸어 들어감.',
    mysteryQuestion: '탐정 네온: "AI 반려견들이 특정 장소로 모인 원인과 그 결과를 인과관계로 정리해보자!"',
    hint: '힌트: 지하에서 초고주파 호루라기 소리가 출력되었기 때문이거나, 배터리 충전 신호 오류가 발생했기 때문일 수 있어.'
  },
  {
    id: 'case_05',
    title: '사건 #5: 사이버 스카이 트레인 탈선 위기',
    codeName: 'SKY_TRAIN_SPEED_UP',
    location: '네오-시티 공중 궤도 7호선',
    severity: 'CRITICAL',
    description: '공중 모노레일 스카이 트레인의 속도 제한 시스템이 풀려 정차역을 무시하고 계속 속도를 올리고 있다.',
    symptom: '승객들이 공포에 떨며 승강장을 그냥 통과하는 열차 안에서 비명을 지름.',
    mysteryQuestion: '탐정 네온: "속도 제어기가 마비된 원인과 열차가 역을 통과하게 된 결과를 연결어로 설명하라!"',
    hint: '힌트: 브레이크 냉각 센서가 고장 났기 때문이거나, 레일 회로에 전력 과부하가 걸려서 속도를 줄일 수 없었기 때문이야.'
  }
];
