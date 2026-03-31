import { useState } from 'react'
import { steps } from '../data/howto'
import styles from './HowTo.module.css'

export default function HowTo() {
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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

      {/* 본문: 스텝 네비게이션 + 상세 */}
      <section className={styles.content}>
        <div className={styles.inner}>
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
