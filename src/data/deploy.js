// 배포 방법 데이터
export const deployMethods = [
  {
    id: 'github-pages',
    icon: '⬡',
    label: 'GitHub Pages',
    title: 'GitHub Pages로 배포하기',
    desc: '별도 서버 없이 GitHub 저장소에서 바로 정적 웹사이트를 호스팅한다. 무료로 사용 가능하다.',
    accent: '#39d353',
    pros: ['완전 무료', 'GitHub 저장소와 일체화', '커스텀 도메인 지원'],
    cons: ['정적 사이트만 가능', 'Vite 경로 설정 필요', '빌드 자동화 설정 필요'],
    steps: [
      {
        num: '01',
        title: 'vite.config.js에 base 경로 설정',
        desc: 'GitHub Pages는 `https://유저명.github.io/저장소명/` 경로로 서빙된다. Vite에 이 경로를 알려줘야 한다.',
        code: `// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/저장소명/',  // ← 본인 저장소 이름으로 변경
})`,
      },
      {
        num: '02',
        title: 'gh-pages 패키지 설치',
        desc: '빌드 결과물을 GitHub Pages 브랜치에 자동으로 올려주는 패키지를 설치한다.',
        code: 'npm install --save-dev gh-pages',
      },
      {
        num: '03',
        title: 'package.json에 배포 스크립트 추가',
        desc: '빌드 후 dist 폴더를 gh-pages 브랜치에 push하는 스크립트를 추가한다.',
        code: `// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  }
}`,
      },
      {
        num: '04',
        title: '배포 실행',
        desc: '명령어 한 번으로 빌드 + GitHub Pages 배포가 동시에 완료된다.',
        code: `npm run deploy

# 완료 후 접속 URL
# https://유저명.github.io/저장소명/`,
      },
      {
        num: '05',
        title: 'GitHub 저장소 Pages 설정 확인',
        desc: 'GitHub 저장소 → Settings → Pages → Branch를 gh-pages로 설정하면 완료.',
        code: `# GitHub 저장소 설정 경로
Settings → Pages → Branch: gh-pages / (root) → Save

# 배포 완료까지 1~2분 소요`,
      },
    ],
    tip: 'push할 때마다 자동 배포를 원하면 GitHub Actions를 추가로 설정하면 된다. 단순 소개 페이지라면 npm run deploy 수동 실행으로 충분하다.',
  },
  {
    id: 'vercel',
    icon: '▶',
    label: 'Vercel',
    title: 'Vercel로 배포하기',
    desc: 'GitHub 저장소를 연결하면 push할 때마다 자동으로 빌드·배포된다. 설정이 거의 없고 속도가 빠르다.',
    accent: '#00e5cc',
    pros: ['push만 하면 자동 배포', '설정 거의 불필요', 'PR마다 미리보기 URL 생성', '전 세계 CDN 엣지 서버'],
    cons: ['무료 플랜 팀 기능 제한', '상업용 트래픽 많으면 유료'],
    steps: [
      {
        num: '01',
        title: 'vercel.com 접속 후 GitHub 로그인',
        desc: 'vercel.com에서 GitHub 계정으로 로그인한다.',
        code: '# vercel.com → Continue with GitHub → 권한 허용',
      },
      {
        num: '02',
        title: '저장소 연결',
        desc: 'Add New → Project → GitHub 저장소 선택 → Import 클릭.',
        code: `# Vercel 대시보드
Add New → Project
→ MoonJiWon1/moonStudy 선택
→ Import 클릭`,
      },
      {
        num: '03',
        title: '설정 확인 후 Deploy',
        desc: 'Vercel이 Vite 프로젝트를 자동 감지해 빌드 설정을 채워준다. 그대로 Deploy 클릭.',
        code: `# 자동 감지 설정 (수정 불필요)
Framework Preset: Vite
Build Command:    npm run build
Output Directory: dist
Install Command:  npm install

→ Deploy 클릭`,
      },
      {
        num: '04',
        title: '배포 완료 — URL 발급',
        desc: '1~2분 후 배포가 완료되고 접속 가능한 URL이 발급된다.',
        code: `# 발급되는 URL 예시
https://moon-study.vercel.app

# 이후 git push할 때마다 자동 재배포`,
      },
    ],
    tip: 'Vercel은 PR을 올릴 때마다 별도 미리보기 URL을 자동 생성해준다. 코드 리뷰 전에 실제 동작을 확인할 수 있어서 협업할 때 특히 유용하다.',
  },
]

export const vercelAdvantages = [
  {
    icon: '⚡',
    title: '자동 배포 (CI/CD)',
    desc: 'GitHub에 push하면 끝. 빌드·배포·CDN 배포까지 자동으로 처리된다. 명령어 한 줄도 안 쳐도 된다.',
    accent: '#00e5cc',
    compare: 'GitHub Pages는 npm run deploy를 직접 실행해야 한다.',
  },
  {
    icon: '🌐',
    title: '전 세계 엣지 네트워크',
    desc: '전 세계 수백 개 엣지 서버에서 서빙된다. 한국 사용자가 접속하면 가장 가까운 서버에서 응답해 속도가 빠르다.',
    accent: '#ff6b35',
    compare: 'GitHub Pages는 GitHub 서버 단일 위치에서 서빙된다.',
  },
  {
    icon: '🔍',
    title: 'PR 미리보기 URL',
    desc: 'Pull Request를 올리면 해당 브랜치의 빌드 결과를 볼 수 있는 고유 URL을 자동 생성한다. 리뷰어가 실제 동작을 확인하고 머지할 수 있다.',
    accent: '#a78bfa',
    compare: 'GitHub Pages는 main 브랜치만 배포돼 PR 단계에서 미리 볼 수 없다.',
  },
  {
    icon: '🔧',
    title: '환경변수 관리',
    desc: 'API 키, 비밀 값들을 Vercel 대시보드에서 안전하게 관리한다. .env 파일을 git에 올릴 필요 없다.',
    accent: '#39d353',
    compare: 'GitHub Pages는 환경변수 개념이 없어 정적 파일만 배포 가능하다.',
  },
  {
    icon: '📊',
    title: '빌드 로그 & 분석',
    desc: '배포마다 빌드 로그, 에러 내역, 접속 통계를 대시보드에서 확인할 수 있다.',
    accent: '#f59e0b',
    compare: 'GitHub Pages는 배포 성공/실패 외 별도 분석 도구가 없다.',
  },
  {
    icon: '🆓',
    title: '개인 프로젝트 무료',
    desc: '개인 프로젝트는 무제한 배포, 커스텀 도메인, HTTPS가 전부 무료다.',
    accent: '#00e5cc',
    compare: '팀 협업 기능은 유료 플랜이 필요하다.',
  },
]
