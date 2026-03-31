import { useState } from 'react'
import { deployMethods, vercelAdvantages } from '../data/deploy'
import styles from './Deploy.module.css'

export default function Deploy() {
  const [activeMethod, setActiveMethod] = useState('github-pages')
  const [activeStep, setActiveStep] = useState(0)
  const [copied, setCopied] = useState(null)
  const [activeTab, setActiveTab] = useState('guide') // 'guide' | 'vercel-why'

  const method = deployMethods.find(m => m.id === activeMethod)
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
          <span className={styles.label}>// DEPLOY</span>
          <h1 className={styles.title}>배포하기</h1>
          <p className={styles.subtitle}>
            만든 웹사이트를 인터넷에 올리는 방법.<br />
            GitHub Pages와 Vercel, 두 가지 방법과 차이점을 설명한다.
          </p>

          {/* 탭 */}
          <div className={styles.topTabs}>
            <button
              className={`${styles.topTab} ${activeTab === 'guide' ? styles.topTabActive : ''}`}
              onClick={() => setActiveTab('guide')}
            >
              배포 방법 가이드
            </button>
            <button
              className={`${styles.topTab} ${activeTab === 'vercel-why' ? styles.topTabActive : ''}`}
              onClick={() => setActiveTab('vercel-why')}
            >
              Vercel을 쓰는 이유
            </button>
          </div>
        </div>
      </section>

      {/* 배포 방법 가이드 탭 */}
      {activeTab === 'guide' && (
        <section className={styles.content}>
          <div className={styles.inner}>
            {/* 방법 선택 */}
            <div className={styles.methodCards}>
              {deployMethods.map(m => (
                <button
                  key={m.id}
                  className={`${styles.methodCard} ${activeMethod === m.id ? styles.methodActive : ''}`}
                  style={{ '--accent': m.accent }}
                  onClick={() => handleMethodChange(m.id)}
                >
                  <span className={styles.methodIcon}>{m.icon}</span>
                  <div className={styles.methodInfo}>
                    <span className={styles.methodLabel}>{m.label}</span>
                    <span className={styles.methodDesc}>{m.desc}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* 장단점 */}
            <div className={styles.proscons} style={{ '--accent': method.accent }}>
              <div className={styles.pros}>
                <span className={styles.pcLabel} style={{ color: '#39d353' }}>✓ 장점</span>
                <ul>
                  {method.pros.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
              <div className={styles.cons}>
                <span className={styles.pcLabel} style={{ color: '#ef4444' }}>✗ 단점</span>
                <ul>
                  {method.cons.map(c => <li key={c}>{c}</li>)}
                </ul>
              </div>
            </div>

            {/* 스텝 */}
            <div className={styles.layout}>
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

              <div className={styles.stepDetail} key={`${activeMethod}-${activeStep}`}>
                <div className={styles.stepDetailHeader}>
                  <span className={styles.stepDetailNum} style={{ color: method.accent }}>{step.num}</span>
                  <h3 className={styles.stepDetailTitle}>{step.title}</h3>
                </div>
                <p className={styles.stepDetailDesc}>{step.desc}</p>

                <div className={styles.codeBlock}>
                  <div className={styles.codeHeader}>
                    <span className={styles.codeLang}>terminal / config</span>
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

                <div className={styles.nav}>
                  <button
                    className={styles.navBtn}
                    onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                    disabled={activeStep === 0}
                  >← 이전</button>
                  <span className={styles.navPager}>{activeStep + 1} / {method.steps.length}</span>
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
              <span>💡</span>
              <p>{method.tip}</p>
            </div>
          </div>
        </section>
      )}

      {/* Vercel을 쓰는 이유 탭 */}
      {activeTab === 'vercel-why' && (
        <section className={styles.content}>
          <div className={styles.inner}>
            <div className={styles.whyHeader}>
              <h2 className={styles.whyTitle}>왜 Vercel인가?</h2>
              <p className={styles.whyDesc}>
                GitHub Pages도 무료고 잘 동작하는데, 왜 굳이 Vercel을 쓰는지 항목별로 비교한다.
              </p>
            </div>

            <div className={styles.advantageGrid}>
              {vercelAdvantages.map((adv, i) => (
                <div
                  key={adv.title}
                  className={styles.advantageCard}
                  style={{ '--accent': adv.accent, animationDelay: `${i * 0.07}s` }}
                >
                  <div className={styles.advHeader}>
                    <span className={styles.advIcon}>{adv.icon}</span>
                    <h3 className={styles.advTitle}>{adv.title}</h3>
                  </div>
                  <p className={styles.advDesc}>{adv.desc}</p>
                  <div className={styles.advCompare}>
                    <span className={styles.compareLabel}>vs GitHub Pages</span>
                    <span>{adv.compare}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 결론 */}
            <div className={styles.conclusion}>
              <div className={styles.conclusionInner}>
                <span className={styles.conclusionIcon}>⚡</span>
                <div>
                  <h3 className={styles.conclusionTitle}>결론</h3>
                  <p className={styles.conclusionDesc}>
                    개인 소개 페이지 수준이라면 GitHub Pages도 충분하다.<br />
                    하지만 <strong>자동 배포, 빠른 속도, PR 미리보기</strong>가 필요하다면 Vercel이 압도적으로 편하다.<br />
                    Claude Code로 바이브 코딩할 때는 push → 자동 배포가 흐름을 끊지 않아서 Vercel이 더 잘 맞는다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
