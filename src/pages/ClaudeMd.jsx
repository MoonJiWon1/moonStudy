import { useState } from 'react'
import styles from './ClaudeMd.module.css'

// 탭 데이터
const tabs = [
  {
    id: 'global',
    label: '전역 설정',
    path: '~/.claude/CLAUDE.md',
    desc: '모든 프로젝트에 적용. 본인 개인 스타일과 선호 언어를 설정한다.',
    code: `# 코딩 스타일
- 주석은 한국어로
- 불필요한 console.log 남기지 말 것
- 파일 새로 만들기보다 기존 파일 수정 선호

# 자주 쓰는 스택
- 프론트: React
- 백엔드: Node.js + Express

# 내가 싫어하는 것
- 장황한 설명 말고 바로 코드
- TypeScript 강요하지 말 것`,
  },
  {
    id: 'project',
    label: '프로젝트 설정',
    path: '.claude/CLAUDE.md',
    desc: '해당 프로젝트에만 적용. 팀 컨벤션, 아키텍처 규칙, 금지 명령어 등을 담는다.',
    code: `# 프로젝트 규칙
- DB 직접 수정 금지, 반드시 마이그레이션 파일 사용
- 컴포넌트는 src/components/ 에만 생성
- API 엔드포인트는 /api/v1/ 접두사 필수

# 기술 스택
- Next.js 14 (App Router)
- Prisma + PostgreSQL
- Tailwind CSS

# 금지 사항
- npm install --force 사용 금지
- 하드코딩된 API 키 금지`,
  },
]

// 필수 항목 카드
const essentials = [
  {
    icon: '{ }',
    title: '코딩 스타일',
    desc: '들여쓰기, 네이밍, 주석 언어',
  },
  {
    icon: '⚙',
    title: '기술 스택',
    desc: '프레임워크, 라이브러리 버전',
  },
  {
    icon: '✕',
    title: '금지 사항',
    desc: '절대 하면 안 되는 것들',
  },
  {
    icon: '/',
    title: '파일 구조',
    desc: '어디에 무엇을 만들지',
  },
  {
    icon: '▶',
    title: '스킬 사용 규칙',
    desc: '언제 어떤 스킬을 쓸지',
  },
  {
    icon: '~',
    title: '팀 컨벤션',
    desc: '커밋 메시지, PR 규칙',
  },
]

// 팁 목록
const tips = [
  'CLAUDE.md는 짧을수록 좋다. Claude가 매번 읽기 때문에 핵심만 담아야 한다.',
  '지키지 않아도 되는 규칙은 넣지 말 것. 있으나 마나한 규칙은 신뢰를 떨어뜨린다.',
  '프로젝트가 바뀌면 CLAUDE.md도 업데이트하자. 낡은 규칙은 혼란을 만든다.',
]

export default function ClaudeMd() {
  const [activeTab, setActiveTab] = useState('global')
  const [copied, setCopied] = useState(false)

  const current = tabs.find(t => t.id === activeTab)

  const handleCopy = () => {
    navigator.clipboard.writeText(current.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// CLAUDE.md</span>
          <h1 className={styles.title}>CLAUDE.md 가이드</h1>
          <p className={styles.subtitle}>
            Claude Code가 모든 대화에서 자동으로 읽는 규칙 파일.<br />
            한 번만 설정해두면 매번 설명할 필요가 없다.
          </p>
        </div>
      </section>

      {/* 섹션 1 — CLAUDE.md란? */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 01</p>
          <h2 className={styles.sectionTitle}>CLAUDE.md란?</h2>
          <div className={styles.introGrid}>
            <div className={styles.introCard}>
              <span className={styles.introIcon}>◈</span>
              <p className={styles.introText}>
                Claude Code가 대화를 시작할 때 <strong>자동으로 읽는 설정 파일</strong>이다.
                별도 지시 없이도 내 규칙대로 동작한다.
              </p>
            </div>
            <div className={styles.introCard}>
              <span className={styles.introIcon}>◉</span>
              <p className={styles.introText}>
                코딩 스타일, 금지 사항, 팀 규칙을 한 번 써두면
                <strong> 매번 설명하지 않아도</strong> AI가 알아서 따른다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 2 — 두 종류의 CLAUDE.md */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 02</p>
          <h2 className={styles.sectionTitle}>두 종류의 CLAUDE.md</h2>

          {/* 탭 버튼 */}
          <div className={styles.tabRow}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`${styles.tabBtn} ${activeTab === tab.id ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 탭 콘텐츠 */}
          <div className={styles.tabContent} key={activeTab}>
            <div className={styles.tabMeta}>
              <code className={styles.tabPath}>{current.path}</code>
              <p className={styles.tabDesc}>{current.desc}</p>
            </div>
            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <span className={styles.codeLang}>CLAUDE.md</span>
                <button className={styles.copyBtn} onClick={handleCopy}>
                  {copied ? '✓ 복사됨' : '복사'}
                </button>
              </div>
              <pre className={styles.code}>{current.code}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 섹션 3 — 꼭 넣어야 할 항목들 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 03</p>
          <h2 className={styles.sectionTitle}>꼭 넣어야 할 항목들</h2>
          <div className={styles.essentialGrid}>
            {essentials.map((item, i) => (
              <div
                key={item.title}
                className={styles.essentialCard}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <span className={styles.essentialIcon}>{item.icon}</span>
                <h3 className={styles.essentialTitle}>{item.title}</h3>
                <p className={styles.essentialDesc}>{item.desc}</p>
                <div className={styles.essentialGlow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 4 — 팁 박스 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 04</p>
          <h2 className={styles.sectionTitle}>작성 팁</h2>
          <div className={styles.tipBox}>
            {tips.map((tip, i) => (
              <div key={i} className={styles.tipRow}>
                <span className={styles.tipBullet}>→</span>
                <p className={styles.tipText}>{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
