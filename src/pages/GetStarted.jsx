import { useState } from 'react'
import { methods } from '../data/getstarted'
import styles from './GetStarted.module.css'

export default function GetStarted() {
  const [activeMethod, setActiveMethod] = useState('vscode')
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(null)

  const method = methods.find(m => m.id === activeMethod)
  const step = method.steps[activeStep]

  const handleMethodChange = (id) => {
    setActiveMethod(id)
    setActiveStep(0)
  }

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// GET STARTED</span>
          <h1 className={styles.title}>시작하기</h1>
          <p className={styles.subtitle}>
            Claude Code로 프로젝트를 시작하는 3가지 방법.<br />
            환경에 맞는 방법을 선택하면 된다.
          </p>

          {/* 방법 선택 카드 */}
          <div className={styles.methodCards}>
            {methods.map(m => (
              <button
                key={m.id}
                className={`${styles.methodCard} ${activeMethod === m.id ? styles.methodActive : ''}`}
                style={{ '--accent': m.accent }}
                onClick={() => handleMethodChange(m.id)}
              >
                <span className={styles.methodIcon}>{m.icon}</span>
                <span className={styles.methodLabel}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className={styles.content}>
        <div className={styles.inner}>

          {/* 선택된 방법 헤더 */}
          <div className={styles.methodHeader} style={{ '--accent': method.accent }}>
            <span className={styles.methodBadge}>{method.icon} {method.label}</span>
            <h2 className={styles.methodTitle}>{method.title}</h2>
            <p className={styles.methodDesc}>{method.desc}</p>
          </div>

          {/* 스텝 레이아웃 */}
          <div className={styles.layout}>
            {/* 스텝 리스트 */}
            <div className={styles.stepList}>
              {method.steps.map((s, i) => (
                <button
                  key={s.num}
                  className={`${styles.stepItem} ${activeStep === i ? styles.stepActive : ''} ${i < activeStep ? styles.stepDone : ''}`}
                  style={{ '--accent': method.accent }}
                  onClick={() => setActiveStep(i)}
                >
                  <div className={styles.stepCircle}>
                    {i < activeStep ? '✓' : s.num}
                  </div>
                  <span className={styles.stepItemTitle}>{s.title}</span>
                </button>
              ))}
            </div>

            {/* 스텝 상세 */}
            <div className={styles.stepDetail} key={`${activeMethod}-${activeStep}`}>
              <div className={styles.stepDetailHeader}>
                <span className={styles.stepDetailNum} style={{ color: method.accent }}>
                  {step.num}
                </span>
                <h3 className={styles.stepDetailTitle}>{step.title}</h3>
              </div>

              <p className={styles.stepDetailDesc}>{step.desc}</p>

              <div className={styles.codeBlock}>
                <div className={styles.codeHeader}>
                  <span className={styles.codeLang}>terminal</span>
                  <button
                    className={styles.copyBtn}
                    style={{ color: method.accent }}
                    onClick={() => handleCopy(step.code, `${activeMethod}-${activeStep}`)}
                  >
                    {copied === `${activeMethod}-${activeStep}` ? '✓ 복사됨' : '복사'}
                  </button>
                </div>
                <pre className={styles.code}>{step.code}</pre>
              </div>

              {/* 이전/다음 */}
              <div className={styles.nav}>
                <button
                  className={styles.navBtn}
                  onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                  disabled={activeStep === 0}
                >
                  ← 이전
                </button>
                <span className={styles.navPager}>
                  {activeStep + 1} / {method.steps.length}
                </span>
                <button
                  className={`${styles.navBtn} ${activeStep === method.steps.length - 1 ? styles.navDone : ''}`}
                  onClick={() => setActiveStep(s => Math.min(method.steps.length - 1, s + 1))}
                  disabled={activeStep === method.steps.length - 1}
                  style={activeStep < method.steps.length - 1 ? { '--accent': method.accent } : {}}
                >
                  {activeStep === method.steps.length - 1 ? '완료 ✓' : '다음 →'}
                </button>
              </div>
            </div>
          </div>

          {/* 팁 */}
          <div className={styles.tip} style={{ '--accent': method.accent }}>
            <span className={styles.tipIcon}>💡</span>
            <p>{method.tip}</p>
          </div>
        </div>
      </section>
    </div>
  )
}
