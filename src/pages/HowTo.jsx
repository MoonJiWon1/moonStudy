import { useState } from 'react'
import { steps } from '../data/howto'
import styles from './HowTo.module.css'

// BMAD 산출물 4가지
const bmadOutputs = [
  {
    icon: '📋',
    title: 'PRD',
    sub: '제품 요구사항 문서',
    desc: '무엇을 만들지, 왜 만드는지, 어떤 기능이 필요한지 체계적으로 정리한 문서',
    color: '#f59e0b',
  },
  {
    icon: '👤',
    title: 'User Stories',
    sub: '유저 스토리',
    desc: '"사용자로서 ~를 할 수 있어야 한다" 형식의 기능 요구사항 목록',
    color: '#00e5cc',
  },
  {
    icon: '🏗️',
    title: 'Tech Spec',
    sub: '기술 스펙 설계',
    desc: '아키텍처 구조, 사용할 기술 스택, API 설계, DB 스키마 등 구현 방향',
    color: '#a78bfa',
  },
  {
    icon: '✅',
    title: 'Task List',
    sub: '작업 분해',
    desc: '개발 작업을 단계별로 쪼개고 우선순위를 정한 실행 가능한 체크리스트',
    color: '#39d353',
  },
]

// 웹개발 팀 워크플로우
const workflow = [
  { name: 'BMAD', role: '기획/설계', color: '#f59e0b', cmd: '/bmad' },
  { name: 'frontend-design', role: '프론트엔드', color: '#00e5cc', cmd: '/frontend-design' },
  { name: 'mcp-builder', role: '백엔드/API', color: '#a78bfa', cmd: '/mcp-builder' },
  { name: 'systemic-debugging', role: '테스트/검증', color: '#39d353', cmd: '/systemic-debugging' },
]

export default function HowTo() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const [bmadCopied, setBmadCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleBmadCopy = () => {
    navigator.clipboard.writeText('npx skills add anthropics/skills/skills/bmad')
    setBmadCopied(true)
    setTimeout(() => setBmadCopied(false), 2000)
  }

  const current = steps[active]

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// HOW-TO</span>
          <h1 className={styles.title}>에이전트 만들기</h1>
          <p className={styles.subtitle}>
            Claude Code에서 나만의 스킬(에이전트)을 만드는 방법.<br />
            5단계로 팀처럼 동작하는 워크플로우를 구성할 수 있다.
          </p>
        </div>
      </section>

      {/* BMAD 소개 섹션 */}
      <section className={styles.bmadSection}>
        <div className={styles.inner}>

          {/* BMAD 타이틀 */}
          <div className={styles.bmadTitleRow}>
            <span className={styles.bmadStep}>STEP 0</span>
            <div>
              <h2 className={styles.bmadHeading}>BMAD Agent</h2>
              <p className={styles.bmadSubheading}>
                코딩 전에 반드시 거쳐야 할 <strong>기획·설계 전담 에이전트</strong>
              </p>
            </div>
          </div>

          {/* 설명 */}
          <div className={styles.bmadDescBlock}>
            <p>
              <strong>BMAD(Business Model AI Development)</strong>는 Claude Code 기반 프로젝트에서
              개발을 시작하기 전 <em>무엇을 어떻게 만들지</em>를 먼저 설계해주는 기획 에이전트다.
              막연한 아이디어를 PRD·유저스토리·기술스펙·작업 목록으로 변환해
              이후 개발 단계가 흔들리지 않도록 기반을 잡아준다.
            </p>
            <p>
              혼자 개발하더라도 BMAD를 먼저 실행하면, 무엇을 만들어야 하는지 명확해지고
              뒤에 실행할 <code>frontend-design</code>, <code>mcp-builder</code>,
              <code>systemic-debugging</code>이 정확하게 움직인다.
            </p>
          </div>

          {/* 산출물 카드 4개 */}
          <div className={styles.bmadOutputGrid}>
            {bmadOutputs.map((o) => (
              <div
                key={o.title}
                className={styles.bmadOutputCard}
                style={{ '--card-accent': o.color }}
              >
                <span className={styles.bmadOutputIcon}>{o.icon}</span>
                <div className={styles.bmadOutputInfo}>
                  <span className={styles.bmadOutputTitle}>{o.title}</span>
                  <span className={styles.bmadOutputSub}>{o.sub}</span>
                </div>
                <p className={styles.bmadOutputDesc}>{o.desc}</p>
              </div>
            ))}
          </div>

          {/* 웹개발 팀 워크플로우 */}
          <div className={styles.bmadFlowWrap}>
            <p className={styles.bmadFlowLabel}>// 웹개발 팀 실행 순서</p>
            <div className={styles.bmadFlow}>
              {workflow.map((w, i) => (
                <div key={w.name} className={styles.bmadFlowItem}>
                  <div
                    className={styles.bmadFlowCard}
                    style={{ '--flow-color': w.color }}
                  >
                    <span className={styles.bmadFlowCmd}>{w.cmd}</span>
                    <span className={styles.bmadFlowRole}>{w.role}</span>
                  </div>
                  {i < workflow.length - 1 && (
                    <span className={styles.bmadFlowArrow}>→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 설치 커맨드 */}
          <div className={styles.bmadInstall}>
            <span className={styles.bmadInstallLabel}>설치</span>
            <code className={styles.bmadInstallCode}>
              npx skills add anthropics/skills/skills/bmad
            </code>
            <button
              className={styles.bmadInstallCopy}
              onClick={handleBmadCopy}
            >
              {bmadCopied ? '✓ 복사됨' : '복사'}
            </button>
          </div>

        </div>
      </section>

      {/* 본문: 스텝 네비게이션 + 상세 */}
      <section className={styles.content}>
        <div className={styles.inner}>

          <div className={styles.sectionDivider}>
            <span>// 에이전트 직접 만들기 — 5단계</span>
          </div>

          <div className={styles.layout}>

            {/* 왼쪽: 스텝 리스트 */}
            <nav className={styles.stepNav}>
              {steps.map((step, i) => (
                <button
                  key={step.num}
                  className={`${styles.stepBtn} ${active === i ? styles.stepActive : ''}`}
                  style={{ '--accent': step.accent }}
                  onClick={() => setActive(i)}
                >
                  <span className={styles.stepNum}>{step.num}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                  {active === i && <span className={styles.stepArrow}>→</span>}
                </button>
              ))}

              {/* 진행 라인 */}
              <div className={styles.progressLine}>
                <div
                  className={styles.progressFill}
                  style={{ height: `${((active + 1) / steps.length) * 100}%` }}
                />
              </div>
            </nav>

            {/* 오른쪽: 상세 내용 */}
            <div className={styles.detail} key={active}>
              <div className={styles.detailHeader}>
                <span className={styles.detailNum} style={{ color: current.accent }}>
                  {current.num}
                </span>
                <h2 className={styles.detailTitle}>{current.title}</h2>
              </div>

              <p className={styles.detailDesc}>{current.desc}</p>

              {/* 코드 블록 */}
              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeLang}>bash / markdown</span>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(current.code)}
                    style={{ color: current.accent }}
                  >
                    {copied ? '✓ 복사됨' : '복사'}
                  </button>
                </div>
                <pre className={styles.code}>{current.code}</pre>
              </div>

              <div className={styles.tip}>
                <span className={styles.tipIcon} style={{ color: current.accent }}>💡</span>
                <p>{current.detail}</p>
              </div>

              {/* 이전/다음 */}
              <div className={styles.nav}>
                <button
                  className={styles.navBtn}
                  onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                >
                  ← 이전
                </button>
                <span className={styles.navPager}>
                  {active + 1} / {steps.length}
                </span>
                <button
                  className={styles.navBtn}
                  onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                >
                  다음 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
