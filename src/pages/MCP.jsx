import { useState } from 'react'
import styles from './MCP.module.css'

// MCP 서버 카드 데이터
const mcpServers = [
  {
    name: 'GitHub MCP',
    tag: 'VCS',
    desc: 'PR·이슈 읽기·쓰기, 코드 검색. GitHub 워크플로우를 Claude에서 직접 처리한다.',
    install: 'claude mcp add github',
  },
  {
    name: 'Filesystem MCP',
    tag: 'FILE',
    desc: '프로젝트 디렉토리 밖 파일 시스템에 접근. 지정한 경로를 읽고 쓸 수 있다.',
    install: 'claude mcp add filesystem /path',
  },
  {
    name: 'Puppeteer MCP',
    tag: 'BROWSER',
    desc: '웹 브라우저 자동화, 스크린샷 캡처. UI 테스트와 크롤링을 Claude가 직접 수행한다.',
    install: 'claude mcp add puppeteer',
  },
  {
    name: 'PostgreSQL MCP',
    tag: 'DATABASE',
    desc: 'DB에 직접 연결해 쿼리를 실행. 스키마를 읽고 데이터를 조회·분석한다.',
    install: 'claude mcp add postgres postgresql://...',
  },
  {
    name: 'Web Search MCP',
    tag: 'SEARCH',
    desc: '실시간 웹 검색으로 최신 정보를 가져온다. 라이브러리 문서, 에러 해결에 유용하다.',
    install: 'claude mcp add web-search',
  },
]

// 설치 스텝
const installSteps = [
  {
    num: '01',
    title: 'MCP 서버 추가',
    code: 'claude mcp add <서버명>',
    desc: '사용할 MCP 서버를 추가한다. 서버에 따라 경로나 연결 문자열이 필요하다.',
  },
  {
    num: '02',
    title: '설정 확인',
    code: 'claude mcp list',
    desc: '현재 등록된 MCP 서버 목록을 확인한다. 추가된 서버가 정상적으로 보이면 완료.',
  },
  {
    num: '03',
    title: 'Claude Code 재시작',
    code: '# Claude Code 재시작 후 자동으로 사용 가능',
    desc: '재시작하면 Claude가 새 MCP 서버를 인식하고 해당 도구를 자동으로 활용한다.',
  },
]

// 사용 시나리오
const useCases = [
  { check: true, text: 'GitHub 이슈를 코드와 함께 분석하고 싶을 때' },
  { check: true, text: '웹에서 최신 라이브러리 문서를 찾아가며 코딩할 때' },
  { check: true, text: 'DB 스키마를 직접 보면서 쿼리를 짤 때' },
  { check: true, text: '브라우저 테스트를 자동화할 때' },
  { check: false, text: '단순 파일 작업은 기본 도구로 충분' },
]

export default function MCP() {
  const [copiedCard, setCopiedCard] = useState(null)
  const [copiedStep, setCopiedStep] = useState(null)

  const handleCardCopy = (code, name) => {
    navigator.clipboard.writeText(code)
    setCopiedCard(name)
    setTimeout(() => setCopiedCard(null), 2000)
  }

  const handleStepCopy = (code, num) => {
    navigator.clipboard.writeText(code)
    setCopiedStep(num)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// MCP</span>
          <h1 className={styles.title}>Model Context Protocol</h1>
          <p className={styles.subtitle}>
            Claude Code가 외부 도구·서비스와 연결하는 표준 프로토콜.<br />
            플러그인처럼 설치해서 Claude의 능력을 확장한다.
          </p>
        </div>
      </section>

      {/* 섹션 1 — MCP란? */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 01</p>
          <h2 className={styles.sectionTitle}>MCP란?</h2>
          <div className={styles.introGrid}>
            <div className={styles.introCard}>
              <div className={styles.introCardTop}>
                <span className={styles.introTag}>기본</span>
                <h3 className={styles.introCardTitle}>Claude Code 기본 기능</h3>
              </div>
              <ul className={styles.introList}>
                <li>파일 읽기 · 쓰기</li>
                <li>터미널 명령어 실행</li>
                <li>코드 분석 · 수정</li>
              </ul>
            </div>
            <div className={styles.introDivider}>
              <span className={styles.introPlusIcon}>+</span>
              <span className={styles.introPlusLabel}>MCP 추가 시</span>
            </div>
            <div className={`${styles.introCard} ${styles.introCardAccent}`}>
              <div className={styles.introCardTop}>
                <span className={`${styles.introTag} ${styles.introTagAccent}`}>확장</span>
                <h3 className={styles.introCardTitle}>연결 가능한 기능들</h3>
              </div>
              <ul className={styles.introList}>
                <li>GitHub PR · 이슈 읽기</li>
                <li>실시간 웹 검색</li>
                <li>DB 직접 쿼리</li>
                <li>Slack 메시지</li>
                <li>브라우저 자동화</li>
              </ul>
            </div>
          </div>
          <p className={styles.introClaim}>
            <span className={styles.introClaimIcon}>◈</span>
            MCP는 "Claude Code의 플러그인 시스템"이다.
          </p>
        </div>
      </section>

      {/* 섹션 2 — 주요 MCP 서버 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 02</p>
          <h2 className={styles.sectionTitle}>주요 MCP 서버</h2>
          <div className={styles.serverGrid}>
            {mcpServers.map((server, i) => (
              <div
                key={server.name}
                className={styles.serverCard}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <div className={styles.serverHeader}>
                  <span className={styles.serverTag}>{server.tag}</span>
                  <h3 className={styles.serverName}>{server.name}</h3>
                </div>
                <p className={styles.serverDesc}>{server.desc}</p>
                <div className={styles.installBlock}>
                  <code className={styles.installCode}>{server.install}</code>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCardCopy(server.install, server.name)}
                  >
                    {copiedCard === server.name ? '✓' : '복사'}
                  </button>
                </div>
                <div className={styles.cardGlow} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 3 — 설치 방법 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 03</p>
          <h2 className={styles.sectionTitle}>MCP 추가하는 법</h2>
          <div className={styles.steps}>
            {installSteps.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepLeft}>
                  <span className={styles.stepNum}>{step.num}</span>
                  {i < installSteps.length - 1 && <div className={styles.stepLine} />}
                </div>
                <div className={styles.stepRight}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  <div className={styles.codeBlock}>
                    <div className={styles.codeHeader}>
                      <span className={styles.codeLang}>bash</span>
                      <button
                        className={styles.copyBtn}
                        onClick={() => handleStepCopy(step.code, step.num)}
                      >
                        {copiedStep === step.num ? '✓ 복사됨' : '복사'}
                      </button>
                    </div>
                    <pre className={styles.code}>{step.code}</pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 4 — 언제 써야 할까 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 04</p>
          <h2 className={styles.sectionTitle}>언제 MCP를 써야 할까</h2>
          <div className={styles.checkList}>
            {useCases.map((item, i) => (
              <div
                key={i}
                className={`${styles.checkRow} ${!item.check ? styles.checkRowNo : ''}`}
              >
                <span className={`${styles.checkIcon} ${item.check ? styles.checkYes : styles.checkNo}`}>
                  {item.check ? '✓' : '✗'}
                </span>
                <p className={styles.checkText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
