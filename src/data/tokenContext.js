// 토큰 & 컨텍스트 설명 데이터

// Claude 모델 비교 데이터
export const models = [
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus',
    version: '4.6',
    tier: 'POWERFUL',
    tierColor: '#a78bfa',
    icon: '◆',
    desc: '가장 강력한 모델. 복잡한 추론과 장기 프로젝트에 최적화. 속도는 느리지만 품질이 가장 높다.',
    context: '200K',
    inputPrice: '$15',
    outputPrice: '$75',
    priceUnit: '/ 1M tokens',
    strengths: ['복잡한 아키텍처 설계', '장문 코드 분석', '까다로운 버그 해결'],
    vibeCoding: '복잡한 설계 단계에만 선택적으로',
    accent: '#a78bfa',
  },
  {
    id: 'claude-sonnet-4-6',
    name: 'Claude Sonnet',
    version: '4.6',
    tier: 'RECOMMENDED',
    tierColor: '#00e5cc',
    icon: '◈',
    desc: '속도와 성능의 최적 균형. 바이브 코딩 일상 작업에 가장 적합하고 비용 대비 효율이 뛰어나다.',
    context: '200K',
    inputPrice: '$3',
    outputPrice: '$15',
    priceUnit: '/ 1M tokens',
    strengths: ['기능 구현', '코드 리뷰', '리팩터링', 'BMAD 기획'],
    vibeCoding: '바이브 코딩 기본 모델 — 대부분의 작업에 최적',
    accent: '#00e5cc',
    recommended: true,
  },
  {
    id: 'claude-haiku-4-5',
    name: 'Claude Haiku',
    version: '4.5',
    tier: 'FAST',
    tierColor: '#39d353',
    icon: '◇',
    desc: '가장 빠르고 저렴한 모델. 단순 질문, 빠른 수정, 비용을 아껴야 할 때 적합하다.',
    context: '200K',
    inputPrice: '$0.80',
    outputPrice: '$4',
    priceUnit: '/ 1M tokens',
    strengths: ['빠른 질문 응답', '단순 코드 수정', '문서 요약'],
    vibeCoding: '가벼운 작업·비용 절약이 우선일 때',
    accent: '#39d353',
  },
]
export const tokenBasics = [
  {
    icon: '🪙',
    title: '토큰이란?',
    desc: 'AI가 텍스트를 처리하는 최소 단위다. 단어 하나가 대략 1~2개 토큰이다. "안녕하세요"는 약 3토큰, "Hello"는 약 1토큰이다.',
    example: '"Claude Code로 바이브 코딩하기" ≈ 10 토큰',
    accent: '#00e5cc',
  },
  {
    icon: '💸',
    title: '토큰 = 비용',
    desc: 'Claude API는 입력 토큰과 출력 토큰 모두에 요금이 발생한다. 긴 대화, 큰 파일 읽기, 반복 요청이 쌓이면 비용이 빠르게 늘어난다.',
    example: 'Sonnet 4.5: 입력 $3 / 100만 토큰, 출력 $15 / 100만 토큰',
    accent: '#ff6b35',
  },
]

export const contextBasics = [
  {
    icon: '🪟',
    title: '컨텍스트 윈도우란?',
    desc: 'Claude가 한 번에 볼 수 있는 텍스트의 최대량이다. 대화 기록, 파일 내용, 시스템 프롬프트 모두 합산된다.',
    visual: [
      { label: '시스템 프롬프트', size: 10, color: '#a78bfa' },
      { label: '이전 대화', size: 35, color: '#ff6b35' },
      { label: '파일 내용', size: 30, color: '#00e5cc' },
      { label: '현재 요청', size: 10, color: '#39d353' },
      { label: '남은 공간', size: 15, color: '#1e293b' },
    ],
    accent: '#a78bfa',
  },
  {
    icon: '📉',
    title: '컨텍스트가 넘치면?',
    desc: '컨텍스트 창이 꽉 차면 Claude는 가장 오래된 대화를 밀어낸다. 앞에서 설정한 내용, 만든 파일 이름, 합의한 규칙들을 잊어버린다. 이게 "Claude가 갑자기 이상하게 행동하는" 주요 원인이다.',
    accent: '#ef4444',
  },
]

export const tips = [
  {
    num: '01',
    title: '기능 단위로 새 대화 시작',
    desc: '하나의 긴 대화보다 기능별로 짧은 대화 여러 개가 효율적이다. 컨텍스트도 줄고 집중도도 높아진다.',
    icon: '✂',
    accent: '#00e5cc',
  },
  {
    num: '02',
    title: 'CLAUDE.md로 컨텍스트 절약',
    desc: '매번 "React 써줘", "주석은 한국어로"를 설명하지 말고 CLAUDE.md에 한 번만 써두면 된다. 토큰을 아끼는 가장 쉬운 방법이다.',
    icon: '📋',
    accent: '#39d353',
  },
  {
    num: '03',
    title: '큰 파일은 필요한 부분만 읽게',
    desc: '"파일 전체 읽어줘" 대신 "src/components/Button.jsx의 onClick 핸들러 부분만 봐줘"처럼 범위를 좁혀서 요청한다.',
    icon: '🔍',
    accent: '#f59e0b',
  },
  {
    num: '04',
    title: '요약 요청으로 컨텍스트 압축',
    desc: '대화가 길어지면 "지금까지 한 작업을 3줄로 요약해줘"라고 요청한 뒤, 새 대화에서 그 요약을 시작 프롬프트로 붙여넣는다.',
    icon: '📌',
    accent: '#a78bfa',
  },
  {
    num: '05',
    title: '/clear 또는 새 대화로 리셋',
    desc: '이전 맥락이 방해가 될 때는 깨끗하게 새 대화를 시작하는 게 낫다. "이 대화에서 이어가야 한다"는 강박을 버려라.',
    icon: '🔄',
    accent: '#ff6b35',
  },
]
