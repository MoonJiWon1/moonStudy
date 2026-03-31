// 시작하기 - 3가지 방법 데이터
export const methods = [
  {
    id: 'vscode',
    icon: '⬡',
    label: 'VSCode 연동',
    title: 'VSCode에서 시작하기',
    desc: 'Claude Code VSCode 익스텐션을 설치하면 에디터 안에서 바로 Claude와 대화하며 코딩할 수 있다.',
    accent: '#00e5cc',
    steps: [
      {
        num: '01',
        title: 'VSCode 익스텐션 설치',
        desc: 'VSCode 마켓플레이스에서 "Claude Code" 를 검색해 설치한다.',
        code: '// VSCode 단축키로 마켓플레이스 열기\nCtrl + Shift + X  →  "Claude Code" 검색  →  Install',
      },
      {
        num: '02',
        title: 'Anthropic 계정 로그인',
        desc: '익스텐션 설치 후 사이드바에서 Claude 아이콘 클릭 → 로그인.',
        code: '// 또는 커맨드 팔레트\nCtrl + Shift + P  →  "Claude: Sign In"',
      },
      {
        num: '03',
        title: '프로젝트 폴더 열기',
        desc: '작업할 폴더를 VSCode로 열면 Claude가 해당 프로젝트 컨텍스트를 자동으로 파악한다.',
        code: 'File  →  Open Folder  →  프로젝트 폴더 선택',
      },
      {
        num: '04',
        title: 'Claude에게 프로젝트 생성 요청',
        desc: '사이드바 채팅창에서 바로 요청한다.',
        code: '> React + Vite 프로젝트 여기에 만들어줘\n> package.json도 같이 설정해줘',
      },
    ],
    tip: 'VSCode 연동의 가장 큰 장점은 파일을 열어두면 Claude가 현재 보고 있는 코드를 자동으로 컨텍스트로 가져간다는 것이다.',
  },
  {
    id: 'terminal',
    icon: '▶',
    label: '터미널 입력',
    title: '터미널에서 시작하기',
    desc: 'Claude Code CLI를 터미널에서 직접 실행해 대화형으로 프로젝트를 생성하는 방법이다.',
    accent: '#ff6b35',
    steps: [
      {
        num: '01',
        title: 'Node.js 설치 확인',
        desc: 'Claude Code CLI는 Node.js 기반이다. 18 이상 버전이 필요하다.',
        code: 'node --version\n# v18.0.0 이상이어야 함',
      },
      {
        num: '02',
        title: 'Claude Code CLI 설치',
        desc: 'npm으로 전역 설치한다.',
        code: 'npm install -g @anthropic-ai/claude-code',
      },
      {
        num: '03',
        title: '작업 폴더로 이동',
        desc: '프로젝트를 만들 폴더로 이동하거나 새로 생성한다.',
        code: 'mkdir my-project\ncd my-project',
      },
      {
        num: '04',
        title: 'Claude Code 실행',
        desc: '터미널에서 claude 명령어로 대화형 세션을 시작한다.',
        code: 'claude\n\n# 실행 후 요청 예시\n> React + Vite 프로젝트 구조 만들어줘\n> 네비바 있는 기본 레이아웃도 추가해줘',
      },
    ],
    tip: '터미널 방식은 서버, 스크립트 등 에디터 없이 작업할 때 유용하다. git과 조합하면 커밋 메시지 작성도 자동화할 수 있다.',
  },
  {
    id: 'install',
    icon: '◈',
    label: '데스크톱 앱 설치',
    title: 'Claude 데스크톱 앱으로 시작하기',
    desc: 'Claude 앱을 직접 설치하면 브라우저 없이 바로 실행할 수 있다. 앱 상단 "코드" 탭으로 전환하면 파일 생성, 터미널 실행 등 Claude Code 풀 기능을 쓸 수 있다.',
    accent: '#a78bfa',
    steps: [
      {
        num: '01',
        title: 'Claude 데스크톱 앱 다운로드',
        desc: 'claude.ai/download 에서 운영체제에 맞는 버전을 다운로드한다.',
        code: '# Windows: Claude-Setup-x64.exe 다운로드 → 설치\n# Mac: Claude.dmg 다운로드 → Applications 폴더로 이동\n\n# 설치 후 앱 실행',
      },
      {
        num: '02',
        title: 'Anthropic 계정 로그인',
        desc: '앱 실행 후 로그인한다. 계정이 없으면 회원가입 후 Pro 플랜 이상을 선택한다. Claude Code는 Pro 이상에서 사용 가능하다.',
        code: '# 플랜 안내\nPro  : $20/월  — Claude Code 사용 가능\nMax  : $100/월 — 더 많은 사용량\n\n# 앱 실행 → 로그인 버튼 → 계정 인증',
      },
      {
        num: '03',
        title: '"코드" 탭으로 전환',
        desc: '앱 상단에 채팅 / Cowork / 코드 탭이 있다. "코드" 탭을 클릭하면 Claude Code 모드가 활성화된다.',
        code: '# 앱 상단 탭\n채팅  →  일반 대화\nCowork →  협업 기능\n코드  →  Claude Code (파일 시스템 + 터미널 접근)',
      },
      {
        num: '04',
        title: '프로젝트 폴더 연결',
        desc: '"코드" 탭에서 작업할 폴더를 연결한다. 폴더를 열면 Claude가 프로젝트 구조를 자동으로 파악한다.',
        code: '# 채팅창 좌측 + 버튼 → 폴더 선택\n# 또는 폴더를 채팅창으로 드래그 앤 드롭\n\n# 연결 완료 후 바로 요청 가능',
      },
      {
        num: '05',
        title: '첫 프로젝트 생성 요청',
        desc: '폴더가 연결된 상태에서 채팅창에 요청하면 Claude가 직접 파일을 만들고 터미널 명령을 실행해준다.',
        code: '> Vite + React 프로젝트 구조 만들어줘\n> react-router-dom 설치하고 기본 라우터 설정해줘\n> 네비바 컴포넌트도 추가해줘',
      },
    ],
    tip: '데스크톱 앱은 브라우저보다 응답이 빠르고, 파일 접근 권한을 한 번만 설정하면 된다. "채팅" 탭에서 기획하고 "코드" 탭에서 구현하는 식으로 번갈아 사용하면 효율적이다.',
  },
]
