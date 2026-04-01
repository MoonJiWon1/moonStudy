# Claude Code 바이브 코딩 가이드

Claude Code로 바이브 코딩을 시작하는 방법을 소개하는 웹 사이트입니다.

🔗 **배포 URL**: [Vercel에서 확인](https://github.com/MoonJiWon1/moonStudy)

---

## 소개

Claude Code를 처음 접하는 사람부터 실전 활용을 원하는 개발자까지,  
바이브 코딩의 개념·스킬·사용법·주의사항·배포 방법을 한 곳에 정리했습니다.

---

## 페이지 구성

| 페이지 | 경로 | 내용 |
|--------|------|------|
| 홈 | `/` | 소개 및 전체 메뉴 |
| 시작하기 | `/get-started` | VSCode, 터미널, 데스크탑 앱 연동 방법 |
| 스킬 | `/skills` | 유형별 추천 스킬 Top 3 및 설치 명령어 |
| 사용법 | `/how-to` | 에이전트 만들기 / CLAUDE.md / MCP |
| 주의사항 | `/caution` | 바이브 코딩 시 주의해야 할 것들 |
| 토큰 & 컨텍스트 | `/token-context` | 토큰 개념과 컨텍스트 관리 팁 |
| 배포하기 | `/deploy` | GitHub Pages, Vercel 배포 방법 |
| DB Connect | `/db-connect` | GitHub · Vercel · PostgreSQL 연결 흐름 |
| 실전 예시 | `/example` | Todo 앱 기획~배포 전체 워크플로우 |
| 요금 | `/pricing` | Pro 플랜 vs API 키 방식 비교 |

---

## 기술 스택

- **프레임워크**: React 18 + Vite
- **라우팅**: react-router-dom
- **스타일**: CSS Modules
- **배포**: Vercel (GitHub 연동 자동 배포)
- **폰트**: JetBrains Mono, Syne (Google Fonts)

---

## 로컬 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

---

## 프로젝트 구조

```
src/
├── components/
│   ├── Navbar.jsx
│   └── Navbar.module.css
├── data/
│   ├── skills.js
│   ├── howto.js
│   ├── caution.js
│   ├── tokenContext.js
│   ├── getstarted.js
│   └── deploy.js
├── pages/
│   ├── Home.jsx
│   ├── GetStarted.jsx
│   ├── Skills.jsx
│   ├── HowTo.jsx
│   ├── Caution.jsx
│   ├── TokenContext.jsx
│   ├── Deploy.jsx
│   ├── DbConnect.jsx
│   ├── Example.jsx
│   └── Pricing.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## 웹개발 팀 구성 (Claude Code Skills)

이 프로젝트는 다음 4개의 Claude Code 스킬로 개발되었습니다.

| 스킬 | 역할 |
|------|------|
| `/bmad` | 기획 · 설계 |
| `/frontend-design` | UI · 컴포넌트 구현 |
| `/mcp-builder` | 백엔드 · API |
| `/systemic-debugging` | 테스트 · 디버깅 |

---

## 라이선스

MIT
