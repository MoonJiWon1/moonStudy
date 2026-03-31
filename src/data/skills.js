// 유형별 TOP 3 스킬 데이터 (실제 설치 확인된 명령어만 사용)
export const skillCategories = [
  {
    id: 'dev',
    label: '개발 & 코딩',
    icon: '⌨',
    accent: '#00e5cc',
    skills: [
      {
        name: 'frontend-design',
        owner: 'anthropics',
        desc: '프로덕션급 프론트엔드 UI를 생성. 독창적인 디자인과 애니메이션까지 자동으로 구현해준다.',
        install: 'npx skills add anthropics/skills/skills/frontend-design',
        tag: '★ 추천',
      },
      {
        name: 'vercel-react-best-practices',
        owner: 'vercel-labs',
        desc: 'Vercel 엔지니어링 팀의 React/Next.js 성능 최적화 가이드. 컴포넌트 설계, 훅 패턴, 렌더링 최적화를 다룬다.',
        install: 'npx skills add vercel-labs/agent-skills/skills/react-best-practices',
        tag: 'React',
      },
      {
        name: 'web-artifacts-builder',
        owner: 'anthropics',
        desc: 'React, Tailwind, shadcn/ui를 활용한 복잡한 멀티 컴포넌트 웹 아티팩트를 생성한다.',
        install: 'npx skills add anthropics/skills/skills/web-artifacts-builder',
        tag: 'UI',
      },
    ],
  },
  {
    id: 'docs',
    label: '문서 & 산출물',
    icon: '📄',
    accent: '#ff6b35',
    skills: [
      {
        name: 'pdf',
        owner: 'anthropics',
        desc: 'PDF 문서를 읽고 분석하거나, 구조화된 보고서를 PDF로 직접 생성한다.',
        install: 'npx skills add anthropics/skills/skills/pdf',
        tag: '★ 추천',
      },
      {
        name: 'pptx',
        owner: 'anthropics',
        desc: '내용을 입력하면 디자인된 PowerPoint 프레젠테이션을 자동으로 만들어준다.',
        install: 'npx skills add anthropics/skills/skills/pptx',
        tag: 'Office',
      },
      {
        name: 'canvas-design',
        owner: 'anthropics',
        desc: '캔버스 기반의 비주얼 디자인 산출물을 생성. 포스터, 인포그래픽, 배너 등에 활용한다.',
        install: 'npx skills add anthropics/skills/skills/canvas-design',
        tag: '디자인',
      },
    ],
  },
  {
    id: 'workflow',
    label: '개발 워크플로우',
    icon: '⚡',
    accent: '#39d353',
    skills: [
      {
        name: 'mcp-builder',
        owner: 'anthropics',
        desc: '고품질 MCP 서버를 만드는 전문 에이전트. TypeScript/Python 기반 MCP 서버 설계부터 구현, 테스트까지 가이드한다.',
        install: 'npx skills add anthropics/skills/skills/mcp-builder',
        tag: '★ 추천',
      },
      {
        name: 'deploy-to-vercel',
        owner: 'vercel-labs',
        desc: '프로젝트를 Vercel에 배포하는 전 과정을 자동화한다. 환경변수 설정, 도메인 연결까지 지원.',
        install: 'npx skills add vercel-labs/agent-skills/skills/deploy-to-vercel',
        tag: '배포',
      },
      {
        name: 'skill-creator',
        owner: 'anthropics',
        desc: '새로운 스킬을 직접 만들거나 기존 스킬을 개선한다. 나만의 에이전트 팀을 구성할 때 사용.',
        install: 'npx skills add anthropics/skills/skills/skill-creator',
        tag: '스킬 제작',
      },
    ],
  },
  {
    id: 'data',
    label: '데이터 & 분석',
    icon: '📊',
    accent: '#a78bfa',
    skills: [
      {
        name: 'claude-api',
        owner: 'anthropics',
        desc: 'Claude API / Anthropic SDK를 활용한 앱을 빌드한다. API 연동, 툴 사용, 에이전트 SDK 패턴을 가이드한다.',
        install: 'npx skills add anthropics/skills/skills/claude-api',
        tag: 'AI 앱',
      },
      {
        name: 'xlsx',
        owner: 'anthropics',
        desc: 'Excel/CSV 스프레드시트를 읽고, 수식 계산, 차트 생성, 데이터 변환 등을 자동화한다.',
        install: 'npx skills add anthropics/skills/skills/xlsx',
        tag: 'Excel',
      },
      {
        name: 'doc-coauthoring',
        owner: 'anthropics',
        desc: '기술 스펙, 제안서, 의사결정 문서 등 구조화된 문서를 함께 작성하는 워크플로우를 가이드한다.',
        install: 'npx skills add anthropics/skills/skills/doc-coauthoring',
        tag: '문서',
      },
    ],
  },
]
