import { useState } from 'react'
import { steps } from '../data/howto'
import styles from './HowTo.module.css'

// ── BMAD 데이터 ──
const bmadOutputs = [
  { icon: '📋', title: 'PRD', sub: '제품 요구사항 문서', desc: '무엇을 만들지, 왜 만드는지, 어떤 기능이 필요한지 체계적으로 정리한 문서', color: '#f59e0b' },
  { icon: '👤', title: 'User Stories', sub: '유저 스토리', desc: '"사용자로서 ~를 할 수 있어야 한다" 형식의 기능 요구사항 목록', color: '#00e5cc' },
  { icon: '🏗️', title: 'Tech Spec', sub: '기술 스펙 설계', desc: '아키텍처 구조, 사용할 기술 스택, API 설계, DB 스키마 등 구현 방향', color: '#a78bfa' },
  { icon: '✅', title: 'Task List', sub: '작업 분해', desc: '개발 작업을 단계별로 쪼개고 우선순위를 정한 실행 가능한 체크리스트', color: '#39d353' },
]
const workflow = [
  { name: 'BMAD', role: '기획/설계', color: '#f59e0b', cmd: '/bmad' },
  { name: 'frontend-design', role: '프론트엔드', color: '#00e5cc', cmd: '/frontend-design' },
  { name: 'mcp-builder', role: '백엔드/API', color: '#a78bfa', cmd: '/mcp-builder' },
  { name: 'systemic-debugging', role: '테스트/검증', color: '#39d353', cmd: '/systemic-debugging' },
]

// ── CLAUDE.md 데이터 ──
const claudeTabs = [
  {
    id: 'global', label: '전역 설정', path: '~/.claude/CLAUDE.md',
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
    id: 'project', label: '프로젝트 설정', path: '.claude/CLAUDE.md',
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
const essentials = [
  { icon: '{ }', title: '코딩 스타일', desc: '들여쓰기, 네이밍, 주석 언어' },
  { icon: '⚙', title: '기술 스택', desc: '프레임워크, 라이브러리 버전' },
  { icon: '✕', title: '금지 사항', desc: '절대 하면 안 되는 것들' },
  { icon: '/', title: '파일 구조', desc: '어디에 무엇을 만들지' },
  { icon: '▶', title: '스킬 사용 규칙', desc: '언제 어떤 스킬을 쓸지' },
  { icon: '~', title: '팀 컨벤션', desc: '커밋 메시지, PR 규칙' },
]
const claudeTips = [
  'CLAUDE.md는 짧을수록 좋다. Claude가 매번 읽기 때문에 핵심만 담아야 한다.',
  '지키지 않아도 되는 규칙은 넣지 말 것. 있으나 마나한 규칙은 신뢰를 떨어뜨린다.',
  '프로젝트가 바뀌면 CLAUDE.md도 업데이트하자. 낡은 규칙은 혼란을 만든다.',
]

// ── MCP 데이터 ──
const mcpServers = [
  { name: 'GitHub MCP', tag: 'VCS', desc: 'PR·이슈 읽기·쓰기, 코드 검색. GitHub 워크플로우를 Claude에서 직접 처리한다.', install: 'claude mcp add github' },
  { name: 'Filesystem MCP', tag: 'FILE', desc: '프로젝트 디렉토리 밖 파일 시스템에 접근. 지정한 경로를 읽고 쓸 수 있다.', install: 'claude mcp add filesystem /path' },
  { name: 'Puppeteer MCP', tag: 'BROWSER', desc: '웹 브라우저 자동화, 스크린샷 캡처. UI 테스트와 크롤링을 Claude가 직접 수행한다.', install: 'claude mcp add puppeteer' },
  { name: 'PostgreSQL MCP', tag: 'DATABASE', desc: 'DB에 직접 연결해 쿼리를 실행. 스키마를 읽고 데이터를 조회·분석한다.', install: 'claude mcp add postgres postgresql://...' },
  { name: 'Web Search MCP', tag: 'SEARCH', desc: '실시간 웹 검색으로 최신 정보를 가져온다. 라이브러리 문서, 에러 해결에 유용하다.', install: 'claude mcp add web-search' },
]
const mcpSteps = [
  { num: '01', title: 'MCP 서버 추가', code: 'claude mcp add <서버명>', desc: '사용할 MCP 서버를 추가한다. 서버에 따라 경로나 연결 문자열이 필요하다.' },
  { num: '02', title: '설정 확인', code: 'claude mcp list', desc: '현재 등록된 MCP 서버 목록을 확인한다. 추가된 서버가 정상적으로 보이면 완료.' },
  { num: '03', title: 'Claude Code 재시작', code: '# 재시작 후 자동으로 MCP 서버 인식', desc: '재시작하면 Claude가 새 MCP 서버를 인식하고 해당 도구를 자동으로 활용한다.' },
]
const mcpUseCases = [
  { check: true, text: 'GitHub 이슈를 코드와 함께 분석하고 싶을 때' },
  { check: true, text: '웹에서 최신 라이브러리 문서를 찾아가며 코딩할 때' },
  { check: true, text: 'DB 스키마를 직접 보면서 쿼리를 짤 때' },
  { check: true, text: '브라우저 테스트를 자동화할 때' },
  { check: false, text: '단순 파일 작업은 기본 도구로 충분' },
]

// 상단 탭
const mainTabs = [
  { id: 'agent', label: '에이전트 만들기' },
  { id: 'claudemd', label: 'CLAUDE.md' },
  { id: 'mcp', label: 'MCP' },
]

export default function HowTo() {
  const [mainTab, setMainTab] = useState('agent')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const [bmadCopied, setBmadCopied] = useState(false)
  const [claudeTab, setClaudeTab] = useState('global')
  const [claudeCopied, setClaudeCopied] = useState(false)
  const [copiedMcpCard, setCopiedMcpCard] = useState(null)
  const [copiedMcpStep, setCopiedMcpStep] = useState(null)

  const current = steps[active]
  const currentClaude = claudeTabs.find(t => t.id === claudeTab)

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
  const handleClaudeCopy = () => {
    navigator.clipboard.writeText(currentClaude.code)
    setClaudeCopied(true)
    setTimeout(() => setClaudeCopied(false), 2000)
  }
  const handleMcpCardCopy = (code, name) => {
    navigator.clipboard.writeText(code)
    setCopiedMcpCard(name)
    setTimeout(() => setCopiedMcpCard(null), 2000)
  }
  const handleMcpStepCopy = (code, num) => {
    navigator.clipboard.writeText(code)
    setCopiedMcpStep(num)
    setTimeout(() => setCopiedMcpStep(null), 2000)
  }

  return (
    <div className={styles.page}>

      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// HOW-TO</span>
          <h1 className={styles.title}>사용법</h1>
          <p className={styles.subtitle}>
            에이전트 만들기, CLAUDE.md 설정, MCP 확장까지.<br />
            Claude Code를 제대로 쓰는 방법.
          </p>
        </div>
      </section>

      {/* 상단 탭 네비 */}
      <div className={styles.mainTabBar}>
        <div className={styles.inner}>
          <div className={styles.mainTabs}>
            {mainTabs.map(t => (
              <button
                key={t.id}
                className={`${styles.mainTab} ${mainTab === t.id ? styles.mainTabActive : ''}`}
                onClick={() => setMainTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 탭 1: 에이전트 만들기 ── */}
      {mainTab === 'agent' && (
        <>
          {/* BMAD 소개 */}
          <section className={styles.bmadSection}>
            <div className={styles.inner}>
              <div className={styles.bmadTitleRow}>
                <span className={styles.bmadStep}>STEP 0</span>
                <div>
                  <h2 className={styles.bmadHeading}>BMAD Agent</h2>
                  <p className={styles.bmadSubheading}>코딩 전에 반드시 거쳐야 할 <strong>기획·설계 전담 에이전트</strong></p>
                </div>
              </div>
              <div className={styles.bmadDescBlock}>
                <p><strong>BMAD(Business Model AI Development)</strong>는 개발을 시작하기 전 <em>무엇을 어떻게 만들지</em>를 먼저 설계해주는 기획 에이전트다. 막연한 아이디어를 PRD·유저스토리·기술스펙·작업 목록으로 변환해 이후 개발 단계가 흔들리지 않도록 기반을 잡아준다.</p>
                <p>혼자 개발하더라도 BMAD를 먼저 실행하면, 무엇을 만들어야 하는지 명확해지고 뒤에 실행할 <code>frontend-design</code>, <code>mcp-builder</code>, <code>systemic-debugging</code>이 정확하게 움직인다.</p>
              </div>
              <div className={styles.bmadOutputGrid}>
                {bmadOutputs.map(o => (
                  <div key={o.title} className={styles.bmadOutputCard} style={{ '--card-accent': o.color }}>
                    <span className={styles.bmadOutputIcon}>{o.icon}</span>
                    <div className={styles.bmadOutputInfo}>
                      <span className={styles.bmadOutputTitle}>{o.title}</span>
                      <span className={styles.bmadOutputSub}>{o.sub}</span>
                    </div>
                    <p className={styles.bmadOutputDesc}>{o.desc}</p>
                  </div>
                ))}
              </div>
              <div className={styles.bmadFlowWrap}>
                <p className={styles.bmadFlowLabel}>// 웹개발 팀 실행 순서</p>
                <div className={styles.bmadFlow}>
                  {workflow.map((w, i) => (
                    <div key={w.name} className={styles.bmadFlowItem}>
                      <div className={styles.bmadFlowCard} style={{ '--flow-color': w.color }}>
                        <span className={styles.bmadFlowCmd}>{w.cmd}</span>
                        <span className={styles.bmadFlowRole}>{w.role}</span>
                      </div>
                      {i < workflow.length - 1 && <span className={styles.bmadFlowArrow}>→</span>}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.bmadInstall}>
                <span className={styles.bmadInstallLabel}>설치</span>
                <code className={styles.bmadInstallCode}>npx skills add anthropics/skills/skills/bmad</code>
                <button className={styles.bmadInstallCopy} onClick={handleBmadCopy}>
                  {bmadCopied ? '✓ 복사됨' : '복사'}
                </button>
              </div>
            </div>
          </section>

          {/* 에이전트 5단계 */}
          <section className={styles.content}>
            <div className={styles.inner}>
              <div className={styles.sectionDivider}>
                <span>// 에이전트 직접 만들기 — 5단계</span>
              </div>
              <div className={styles.layout}>
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
                  <div className={styles.progressLine}>
                    <div className={styles.progressFill} style={{ height: `${((active + 1) / steps.length) * 100}%` }} />
                  </div>
                </nav>
                <div className={styles.detail} key={active}>
                  <div className={styles.detailHeader}>
                    <span className={styles.detailNum} style={{ color: current.accent }}>{current.num}</span>
                    <h2 className={styles.detailTitle}>{current.title}</h2>
                  </div>
                  <p className={styles.detailDesc}>{current.desc}</p>
                  <div className={styles.codeBlock}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeLang}>bash / markdown</span>
                      <button className={styles.copyBtn} onClick={() => handleCopy(current.code)} style={{ color: current.accent }}>
                        {copied ? '✓ 복사됨' : '복사'}
                      </button>
                    </div>
                    <pre className={styles.code}>{current.code}</pre>
                  </div>
                  <div className={styles.tip}>
                    <span className={styles.tipIcon} style={{ color: current.accent }}>💡</span>
                    <p>{current.detail}</p>
                  </div>
                  <div className={styles.nav}>
                    <button className={styles.navBtn} onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0}>← 이전</button>
                    <span className={styles.navPager}>{active + 1} / {steps.length}</span>
                    <button className={styles.navBtn} onClick={() => setActive(Math.min(steps.length - 1, active + 1))} disabled={active === steps.length - 1}>다음 →</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* ── 탭 2: CLAUDE.md ── */}
      {mainTab === 'claudemd' && (
        <section className={styles.tabContent}>
          <div className={styles.inner}>

            {/* 소개 */}
            <div className={styles.mdIntroGrid}>
              <div className={styles.mdIntroCard}>
                <span className={styles.mdIntroIcon}>◈</span>
                <p>Claude Code가 대화를 시작할 때 <strong>자동으로 읽는 설정 파일</strong>이다. 별도 지시 없이도 내 규칙대로 동작한다.</p>
              </div>
              <div className={styles.mdIntroCard}>
                <span className={styles.mdIntroIcon}>◉</span>
                <p>코딩 스타일, 금지 사항, 팀 규칙을 한 번 써두면 <strong>매번 설명하지 않아도</strong> AI가 알아서 따른다.</p>
              </div>
            </div>

            {/* 두 종류 탭 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// 두 종류의 CLAUDE.md</p>
              <div className={styles.mdTabRow}>
                {claudeTabs.map(t => (
                  <button key={t.id} className={`${styles.mdTabBtn} ${claudeTab === t.id ? styles.mdTabActive : ''}`} onClick={() => setClaudeTab(t.id)}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div className={styles.mdTabContent} key={claudeTab}>
                <div className={styles.mdTabMeta}>
                  <code className={styles.mdTabPath}>{currentClaude.path}</code>
                  <p className={styles.mdTabDesc}>{currentClaude.desc}</p>
                </div>
                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeLang}>CLAUDE.md</span>
                    <button className={styles.copyBtn} onClick={handleClaudeCopy} style={{ color: '#00e5cc' }}>
                      {claudeCopied ? '✓ 복사됨' : '복사'}
                    </button>
                  </div>
                  <pre className={styles.code}>{currentClaude.code}</pre>
                </div>
              </div>
            </div>

            {/* 필수 항목 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// 꼭 넣어야 할 항목들</p>
              <div className={styles.mdEssentialGrid}>
                {essentials.map(item => (
                  <div key={item.title} className={styles.mdEssentialCard}>
                    <span className={styles.mdEssentialIcon}>{item.icon}</span>
                    <h3 className={styles.mdEssentialTitle}>{item.title}</h3>
                    <p className={styles.mdEssentialDesc}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 팁 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// 작성 팁</p>
              <div className={styles.mdTipBox}>
                {claudeTips.map((tip, i) => (
                  <div key={i} className={styles.mdTipRow}>
                    <span className={styles.mdTipBullet}>→</span>
                    <p>{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 탭 3: MCP ── */}
      {mainTab === 'mcp' && (
        <section className={styles.tabContent}>
          <div className={styles.inner}>

            {/* MCP란? */}
            <div className={styles.mcpIntroGrid}>
              <div className={styles.mcpBaseCard}>
                <span className={styles.mcpTag}>기본</span>
                <h3>Claude Code 기본 기능</h3>
                <ul>
                  <li>파일 읽기 · 쓰기</li>
                  <li>터미널 명령어 실행</li>
                  <li>코드 분석 · 수정</li>
                </ul>
              </div>
              <div className={styles.mcpDivider}>
                <span className={styles.mcpPlus}>+</span>
                <span>MCP 추가 시</span>
              </div>
              <div className={styles.mcpExtCard}>
                <span className={`${styles.mcpTag} ${styles.mcpTagAccent}`}>확장</span>
                <h3>연결 가능한 기능들</h3>
                <ul>
                  <li>GitHub PR · 이슈 읽기</li>
                  <li>실시간 웹 검색</li>
                  <li>DB 직접 쿼리</li>
                  <li>브라우저 자동화</li>
                </ul>
              </div>
            </div>
            <p className={styles.mcpClaim}><span>◈</span> MCP는 "Claude Code의 플러그인 시스템"이다.</p>

            {/* 주요 서버 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// 주요 MCP 서버</p>
              <div className={styles.mcpServerGrid}>
                {mcpServers.map(s => (
                  <div key={s.name} className={styles.mcpServerCard}>
                    <div className={styles.mcpServerHead}>
                      <span className={styles.mcpServerTag}>{s.tag}</span>
                      <h3 className={styles.mcpServerName}>{s.name}</h3>
                    </div>
                    <p className={styles.mcpServerDesc}>{s.desc}</p>
                    <div className={styles.mcpInstallRow}>
                      <code>{s.install}</code>
                      <button className={styles.copyBtn} style={{ color: '#a78bfa' }} onClick={() => handleMcpCardCopy(s.install, s.name)}>
                        {copiedMcpCard === s.name ? '✓' : '복사'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 추가 방법 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// MCP 추가하는 법</p>
              <div className={styles.mcpSteps}>
                {mcpSteps.map((step, i) => (
                  <div key={step.num} className={styles.mcpStep}>
                    <div className={styles.mcpStepLeft}>
                      <span className={styles.mcpStepNum}>{step.num}</span>
                      {i < mcpSteps.length - 1 && <div className={styles.mcpStepLine} />}
                    </div>
                    <div className={styles.mcpStepRight}>
                      <h3 className={styles.mcpStepTitle}>{step.title}</h3>
                      <p className={styles.mcpStepDesc}>{step.desc}</p>
                      <div className={styles.codeBlock}>
                        <div className={styles.codeHeader}>
                          <span className={styles.codeLang}>bash</span>
                          <button className={styles.copyBtn} style={{ color: '#a78bfa' }} onClick={() => handleMcpStepCopy(step.code, step.num)}>
                            {copiedMcpStep === step.num ? '✓ 복사됨' : '복사'}
                          </button>
                        </div>
                        <pre className={styles.code}>{step.code}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 언제 쓸까 */}
            <div className={styles.mdSection}>
              <p className={styles.mdSectionLabel}>// 언제 MCP를 써야 할까</p>
              <div className={styles.mcpCheckList}>
                {mcpUseCases.map((item, i) => (
                  <div key={i} className={`${styles.mcpCheckRow} ${!item.check ? styles.mcpCheckNo : ''}`}>
                    <span className={item.check ? styles.mcpCheckYes : styles.mcpCheckNoIcon}>{item.check ? '✓' : '✗'}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

    </div>
  )
}
