import { tokenBasics, contextBasics, tips } from '../data/tokenContext'
import styles from './TokenContext.module.css'

export default function TokenContext() {
  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// TOKEN & CONTEXT</span>
          <h1 className={styles.title}>토큰 & 컨텍스트</h1>
          <p className={styles.subtitle}>
            Claude가 어떻게 텍스트를 처리하는지 이해하면<br />
            더 효율적으로, 더 저렴하게 쓸 수 있다.
          </p>
        </div>
      </section>

      {/* 토큰 기초 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>01</span> 토큰이란?
          </h2>

          <div className={styles.cardRow}>
            {tokenBasics.map(item => (
              <div key={item.title} className={styles.basicCard} style={{ '--accent': item.accent }}>
                <div className={styles.basicIcon}>{item.icon}</div>
                <h3 className={styles.basicTitle}>{item.title}</h3>
                <p className={styles.basicDesc}>{item.desc}</p>
                <div className={styles.example}>{item.example}</div>
              </div>
            ))}
          </div>

          {/* 토큰 시각화 */}
          <div className={styles.tokenViz}>
            <div className={styles.vizLabel}>텍스트가 토큰으로 쪼개지는 방식</div>
            <div className={styles.tokenRow}>
              {[
                { text: 'Claude', color: '#00e5cc' },
                { text: ' Code', color: '#ff6b35' },
                { text: '로', color: '#39d353' },
                { text: ' 바이브', color: '#a78bfa' },
                { text: ' 코딩', color: '#f59e0b' },
                { text: '하기', color: '#00e5cc' },
              ].map((t, i) => (
                <span key={i} className={styles.token} style={{ borderColor: t.color, color: t.color }}>
                  {t.text}
                </span>
              ))}
              <span className={styles.tokenCount}>≈ 8 tokens</span>
            </div>
          </div>
        </div>
      </section>

      {/* 컨텍스트 기초 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>02</span> 컨텍스트 윈도우
          </h2>

          {/* 컨텍스트 창 시각화 */}
          <div className={styles.ctxViz}>
            <div className={styles.ctxWindow}>
              <div className={styles.ctxLabel}>컨텍스트 윈도우 (200K tokens)</div>
              <div className={styles.ctxBar}>
                {contextBasics[0].visual.map(v => (
                  <div
                    key={v.label}
                    className={styles.ctxSegment}
                    style={{ width: `${v.size}%`, background: v.color }}
                    title={`${v.label}: ${v.size}%`}
                  >
                    {v.size >= 10 && (
                      <span className={styles.ctxSegLabel}>{v.label}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className={styles.ctxLegend}>
                {contextBasics[0].visual.map(v => (
                  <div key={v.label} className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: v.color }} />
                    <span>{v.label}</span>
                    <span className={styles.legendPct}>{v.size}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.cardRow}>
            {contextBasics.map(item => (
              <div key={item.icon} className={styles.basicCard} style={{ '--accent': item.accent }}>
                <div className={styles.basicIcon}>{item.icon}</div>
                <h3 className={styles.basicTitle}>{item.title}</h3>
                <p className={styles.basicDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 절약 팁 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>03</span> 토큰 절약 팁
          </h2>

          <div className={styles.tipGrid}>
            {tips.map((tip, i) => (
              <div
                key={tip.num}
                className={styles.tipCard}
                style={{ '--accent': tip.accent, animationDelay: `${i * 0.08}s` }}
              >
                <div className={styles.tipHeader}>
                  <span className={styles.tipIcon}>{tip.icon}</span>
                  <span className={styles.tipNum} style={{ color: tip.accent }}>{tip.num}</span>
                </div>
                <h3 className={styles.tipTitle}>{tip.title}</h3>
                <p className={styles.tipDesc}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
