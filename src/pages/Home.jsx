import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Home.module.css'

// 카드 데이터
const cards = [
  {
    id: '01',
    path: '/get-started',
    label: 'GET STARTED',
    title: '시작하기',
    desc: 'VSCode 연동, 터미널, Claude Code 신규 설치. 환경에 맞는 방법으로 첫 프로젝트를 시작한다.',
    accent: '#39d353',
    tag: '입문',
  },
  {
    id: '02',
    path: '/skills',
    label: 'SKILLS',
    title: '스킬 시스템',
    desc: '/bmad, /frontend-design 등 역할별 전문 에이전트. 복잡한 작업을 팀처럼 분담한다.',
    accent: '#00e5cc',
    tag: '에이전트 팀',
  },
  {
    id: '03',
    path: '/how-to',
    label: 'HOW-TO',
    title: '사용법',
    desc: '기획부터 배포까지. Claude Code로 바이브 코딩하는 실전 워크플로우.',
    accent: '#ff6b35',
    tag: '워크플로우',
  },
  {
    id: '04',
    path: '/caution',
    label: 'CAUTION',
    title: '주의사항',
    desc: '자주 하는 실수와 안티패턴. 이것만 알아도 삽질을 반으로 줄인다.',
    accent: '#f59e0b',
    tag: '안티패턴',
  },
  {
    id: '05',
    path: '/token-context',
    label: 'TOKEN & CTX',
    title: '토큰 & 컨텍스트',
    desc: '토큰이 어떻게 소비되고 컨텍스트 윈도우가 왜 중요한지. 비용을 줄이는 팁.',
    accent: '#a78bfa',
    tag: '핵심 개념',
  },
]

// 타이핑 효과 훅
function useTypewriter(text, speed = 60, delay = 0) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, ++i))
        } else {
          setDone(true)
          clearInterval(interval)
        }
      }, speed)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [text, speed, delay])

  return { displayed, done }
}

// 배경 매트릭스 캔버스
function MatrixCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const chars = '01アイウエオカキクケコ▶◀░▒▓'
    const cols = Math.floor(canvas.width / 20)
    const drops = Array(cols).fill(1)

    const draw = () => {
      ctx.fillStyle = 'rgba(8, 11, 15, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgba(0, 229, 204, 0.12)'
      ctx.font = '14px JetBrains Mono'

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 20, y * 20)
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    const interval = setInterval(draw, 80)
    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.matrix} />
}

export default function Home() {
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const { displayed: line1, done: done1 } = useTypewriter('> CLAUDE CODE', 80, 300)
  const { displayed: line2, done: done2 } = useTypewriter('바이브 코딩', 100, 1400)
  const { displayed: line3 } = useTypewriter(
    'AI와 함께 흐르듯 코딩하는 새로운 패러다임.',
    40,
    done1 ? 2200 : 99999
  )

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2800)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className={styles.page}>
      <MatrixCanvas />

      {/* 히어로 */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* 왼쪽 장식 라인 */}
          <div className={styles.sideBar}>
            {['→', '▶', '◈', '⬡'].map((s, i) => (
              <span key={i} style={{ animationDelay: `${i * 0.4}s` }}>{s}</span>
            ))}
          </div>

          <div className={styles.heroText}>
            {/* 라인 1: 코드 스타일 */}
            <div className={styles.codeLine}>
              <span className={styles.prompt}>{line1}</span>
              {!done1 && <span className={styles.caret} />}
            </div>

            {/* 라인 2: 메인 타이틀 */}
            <h1 className={styles.title}>
              {line2}
              {done1 && !done2 && <span className={styles.caret} />}
            </h1>

            {/* 라인 3: 서브타이틀 */}
            <p className={styles.subtitle}>
              {line3}
              {done2 && line3.length < 'AI와 함께 흐르듯 코딩하는 새로운 패러다임.'.length && (
                <span className={styles.caret} />
              )}
            </p>

            {/* 배지 */}
            <div className={`${styles.badges} ${visible ? styles.show : ''}`}>
              {['Claude Code', 'Skill System', 'MCP', 'React'].map((b) => (
                <span key={b} className={styles.badge}>{b}</span>
              ))}
            </div>
          </div>

          {/* 오른쪽: 터미널 창 */}
          <div className={`${styles.terminal} ${visible ? styles.show : ''}`}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} style={{ background: '#ff5f57' }} />
              <span className={styles.dot} style={{ background: '#febc2e' }} />
              <span className={styles.dot} style={{ background: '#28c840' }} />
              <span className={styles.terminalTitle}>claude — bash</span>
            </div>
            <div className={styles.terminalBody}>
              <div className={styles.termLine}>
                <span className={styles.termPrompt}>$</span>
                <span className={styles.termCmd}> claude</span>
              </div>
              <div className={styles.termLine} style={{ color: 'var(--cyan)', animationDelay: '0.5s' }}>
                ✓ Claude Code initialized
              </div>
              <div className={styles.termLine} style={{ animationDelay: '1s' }}>
                <span className={styles.termPrompt}>{'>'}</span>
                <span> /bmad 새 프로젝트 시작해줘</span>
              </div>
              <div className={styles.termLine} style={{ color: '#a78bfa', animationDelay: '1.5s' }}>
                ⟳ BMAD Agent 활성화 중...
              </div>
              <div className={styles.termLine} style={{ color: 'var(--green)', animationDelay: '2s' }}>
                ✓ Product Brief 생성 완료
              </div>
              <div className={styles.termLine} style={{ animationDelay: '2.5s' }}>
                <span className={styles.termPrompt}>{'>'}</span>
                <span> /frontend-design 홈 페이지 만들어줘</span>
              </div>
              <div className={styles.termLine} style={{ color: 'var(--amber)', animationDelay: '3s' }}>
                ⟳ frontend-design 실행 중...
              </div>
              <div className={styles.termBlink}>
                <span className={styles.termPrompt}>{'>'}</span>
                <span className={styles.caret} />
              </div>
            </div>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className={`${styles.scrollHint} ${visible ? styles.show : ''}`}>
          <span>탐색하기</span>
          <div className={styles.scrollArrow}>↓</div>
        </div>
      </section>

      {/* 카드 섹션 */}
      <section className={`${styles.cards} ${visible ? styles.show : ''}`}>
        <div className={styles.cardsInner}>
          <div className={styles.sectionLabel}>
            <span>// EXPLORE</span>
          </div>

          <div className={styles.cardGrid}>
            {cards.map((card, i) => (
              <button
                key={card.id}
                className={styles.card}
                onClick={() => navigate(card.path)}
                style={{
                  '--accent': card.accent,
                  animationDelay: `${i * 0.12}s`,
                }}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardId}>{card.id}</span>
                  <span className={styles.cardTag}>{card.tag}</span>
                </div>
                <div className={styles.cardLabel}>{card.label}</div>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.desc}</p>
                <div className={styles.cardFooter}>
                  <span>자세히 보기 →</span>
                </div>
                <div className={styles.cardGlow} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerLogo}>▶ VIBE.CODE</span>
          <span className={styles.footerText}>
            Built with Claude Code × frontend-design skill
          </span>
          <span className={styles.footerText}>2026</span>
        </div>
      </footer>
    </div>
  )
}
