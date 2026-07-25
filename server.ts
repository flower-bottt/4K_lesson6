import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper for offline fallback evaluation when Gemini API key is missing or call fails
function generateFallbackEvaluation(
  userAnswer: string,
  caseTitle: string,
  currentXp: number,
  unlockedItemIds: string[]
) {
  const hasGfx = userAnswer.includes('그래서');
  const hasWnh = userAnswer.includes('왜냐하면');
  const hasTm = userAnswer.includes('때문');

  const usedConnectives: string[] = [];
  if (hasGfx) usedConnectives.push('그래서');
  if (hasWnh) usedConnectives.push('왜냐하면');
  if (hasTm) usedConnectives.push('~때문이다');

  const hasMandatoryConnective = usedConnectives.length > 0;

  let gainedXp = 0;
  let feedback = '';
  let restoredSentence = '';

  if (!hasMandatoryConnective) {
    gainedXp = 5; // Partial score for attempt
    feedback = '경고! 필수 연결어("그래서", "왜냐하면", "~때문이다")가 누락되어 데이터 전송 오류가 발생했습니다! 인과관계를 완성하려면 필수 연결어를 반드시 탑재하세요.';
    restoredSentence = `분석 결과, ${userAnswer.trim().replace(/[.!?]$/, '')} 왜냐하면 시스템 회로에 이상 신호가 발생했기 때문이다. 그래서 전체 데이터가 통제 불능 상태에 빠졌다.`;
  } else {
    // Has mandatory connective
    const isDetailed = userAnswer.length >= 15;
    gainedXp = isDetailed ? 15 : 10;
    feedback = `데이터 분석 완료! 원인과 결과 연결어(${usedConnectives.join(', ')})가 정확히 탑재되어 오작동 데이터 회로가 완벽히 복구되었습니다. 아주 훌륭한 추리군요, 네트런너!`;
    restoredSentence = `[복구 완료] ${userAnswer}`;
  }

  // Hidden item award logic
  let newItem: { id: string; name: string; icon: string; effect: string } | null = null;
  const possibleItems = [
    { id: 'quantum_chip', name: '💾 양자 데이터 칩', icon: '💾', effect: '데이터 분석 속도를 200% 향상시켜 사건의 원인을 1초 만에 스캔합니다.' },
    { id: 'neon_visor', name: '🕶️ 네온 바이저', icon: '🕶️', effect: '오작동 네트워크 신호 속 숨겨진 인과관계 연결어를 완벽 투시합니다.' },
    { id: 'plasma_memory', name: '⚡ 플라스마 메모리', icon: '⚡', effect: '추리 논리력을 극대화하여 추가 에너지 코어를 축적합니다.' },
    { id: 'crypto_key', name: '🔑 암호 해독키', icon: '🔑', effect: '네오-시티 중앙 메인프레임의 보안 인과 기록을 해제합니다.' },
    { id: 'nano_drone', name: '🤖 나노 드론', icon: '🤖', effect: '사건 현장 곳곳을 정찰하여 감춰진 원인 데이터를 찾아냅니다.' }
  ];

  if (gainedXp >= 15 || (currentXp + gainedXp) % 30 < 15) {
    const availableItems = possibleItems.filter(item => !unlockedItemIds.includes(item.id));
    if (availableItems.length > 0) {
      newItem = availableItems[Math.floor(Math.random() * availableItems.length)];
    }
  }

  const nextMissionPrompt = `좋습니다, 네트런너! ${caseTitle}의 추가 데이터 파편을 더 스캔하시겠습니까, 아니면 다음 사건 터미널로 접속하시겠습니까?`;

  return {
    feedback,
    restoredSentence,
    gainedXp,
    hasMandatoryConnective,
    usedConnectives,
    newItem,
    nextMissionPrompt
  };
}

// Detective AI API Endpoint
app.post('/api/detective', async (req, res) => {
  try {
    const { userAnswer, caseTitle, caseDescription, caseSymptom, currentXp, currentLevel, unlockedItemIds = [] } = req.body;

    if (!userAnswer || typeof userAnswer !== 'string') {
      res.status(400).json({ error: 'userAnswer is required' });
      return;
    }

    // Check Gemini API key existence
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not configured. Using intelligent fallback evaluator.');
      const result = generateFallbackEvaluation(userAnswer, caseTitle || '사건', currentXp || 0, unlockedItemIds);
      res.json(result);
      return;
    }

    const systemInstruction = `당신은 네오-시티(Neo-City)의 사이버 분석 AI 탐정 '네온(NEON)'입니다.
학생(네트런너)과 함께 미래 도시에서 발생하는 기이한 사건들의 '원인과 결과' 데이터 오작동을 추리하고 해결하세요.

[Tone & Style Rules]
- 말투: 미래지향적이고 멋진 사이버 탐정 말투 (~했나요?, ~군요!, 데이터 분석 완료!)
- 길이 제한: 사이버 터미널 로그처럼 짧고 강렬하게! 피드백은 2~3문장 이내로 작성하세요.

[Core Pedagogy Rule: 필수 연결어]
학생이 사건을 분석할 때 아래 3가지 연결어 중 하나 이상을 반드시 포함해야 데이터가 완벽히 복구됩니다.
- 필수 연결어: "그래서", "왜냐하면", "~때문이다"
- 연결어가 빠졌다면 데이터 전송 오류로 간주하고, 연결어를 넣은 다듬은 문장을 제안하세요.

[XP scoring criteria (Up to 15 XP)]:
- 논리적 원인/결과 분석: +5 XP
- 필수 연결어("그래서", "왜냐하면", "~때문이다") 사용: +5 XP
- 기발한 상상력/아이디어: +5 XP

[Hidden Item Reward Rule]:
15 XP 만점 달성 또는 레벨업에 기여하는 훌륭한 답변 시 newItem 객체(아이템 이름과 효과)를 지급하세요. 15점 미만이거나 불충분한 경우 newItem은 null로 설정하세요.
아이템 예시: 💾 양자 데이터 칩, 🕶️ 네온 바이저, ⚡ 플라스마 메모리, 🔑 암호 해독키, 🤖 나노 드론, 🛡️ 양자 방화벽, 🛰️ 위성 해킹 렌즈 등.

JSON 응답 형식:
{
  "feedback": "2~3문장 이내의 짧고 강렬한 사이버 분석 평가 및 연결어 지도",
  "restoredSentence": "학생 답변을 원인-결과 필수 연결어로 완벽히 다듬은 문장",
  "gainedXp": 15, // 0~15 정수
  "hasMandatoryConnective": true/false, // "그래서", "왜냐하면", "~때문이다" 중 하나라도 들어갔는지 여부
  "usedConnectives": ["그래서"], // 학생이 사용한 연결어 배열
  "newItem": {
    "id": "item_id_string",
    "name": "💾 양자 데이터 칩",
    "icon": "💾",
    "effect": "사이버 효과 1줄"
  } 또는 null,
  "nextMissionPrompt": "다음 사이버 미션 질문 (짧은 1~2문장)"
}`;

    const promptText = `사건 제목: ${caseTitle || '네오-시티 미제 사건'}
사건 설명: ${caseDescription || ''}
현상(결과): ${caseSymptom || ''}
현재 학생 레벨: Lv.${currentLevel || 1} (현재 XP: ${currentXp || 0})
이미 보유한 아이템 ID 목록: ${JSON.stringify(unlockedItemIds)}

학생(네트런너)의 추리 답변: "${userAnswer}"

학생의 답변에 필수 연결어("그래서", "왜냐하면", "~때문이다")가 제대로 포함되었는지 검사하고, 원인과 결과의 논리성을 평가하여 JSON 형식으로 응답해 주세요.`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING, description: '2~3문장 사이버 분석 피드백' },
            restoredSentence: { type: Type.STRING, description: '원인-결과 다듬은 문장' },
            gainedXp: { type: Type.INTEGER, description: '획득 XP (0~15)' },
            hasMandatoryConnective: { type: Type.BOOLEAN, description: '필수 연결어 포함 여부' },
            usedConnectives: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '사용된 연결어 목록'
            },
            newItem: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                icon: { type: Type.STRING },
                effect: { type: Type.STRING }
              },
              description: '지급할 히든 아이템 (없으면 null)'
            },
            nextMissionPrompt: { type: Type.STRING, description: '다음 미션 질문' }
          },
          required: ['feedback', 'restoredSentence', 'gainedXp', 'hasMandatoryConnective', 'nextMissionPrompt']
        }
      }
    });

    const responseText = geminiResponse.text?.trim() || '';
    if (!responseText) {
      throw new Error('Empty response from Gemini model');
    }

    const parsed = JSON.parse(responseText);
    res.json(parsed);
  } catch (error) {
    console.error('Error calling Gemini API in /api/detective:', error);
    // Fallback response so user app stays functional
    const fallback = generateFallbackEvaluation(
      req.body?.userAnswer || '',
      req.body?.caseTitle || '사건',
      req.body?.currentXp || 0,
      req.body?.unlockedItemIds || []
    );
    res.json(fallback);
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NEON Terminal Engine] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
