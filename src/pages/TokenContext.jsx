import { tokenBasics, contextBasics, tips, models } from '../data/tokenContext'
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

      {/* 모델 가이드 */}
      <section className={styles.section}>
        <div className={styles.inner}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionNum}>04</span> Claude 모델 가이드
          </h2>
          <p className={styles.modelIntro}>
            같은 Claude지만 모델마다 속도·비용·성능이 다르다.
            바이브 코딩 작업에 따라 적합한 모델을 선택하면 효율이 달라진다.
          </p>

          {/* 모델 카드 3개 */}
          <div className={styles.modelGrid}>
            {models.map(m => (
              <div
                key={m.id}
                className={`${styles.modelCard} ${m.recommended ? styles.modelCardRecommended : ''}`}
                style={{ '--model-accent': m.accent }}
              >
                {m.recommended && (
                  <span className={styles.modelBadge}>추천</span>
                )}
                <div className={styles.modelHead}>
                  <span className={styles.modelIcon} style={{ color: m.accent }}>{m.icon}</span>
                  <div>
                    <h3 className={styles.modelName}>{m.name}</h3>
                    <span className={styles.modelVersion}>v{m.version}</span>
                  </div>
                  <span className={styles.modelTier} style={{ color: m.tierColor, borderColor: m.tierColor }}>
                    {m.tier}
                  </span>
                </div>

                <p className={styles.modelDesc}>{m.desc}</p>

                {/* 컨텍스트 & 가격 */}
                <div className={styles.modelStats}>
                  <div className={styles.modelStat}>
                    <span className={styles.modelStatLabel}>컨텍스트</span>
                    <span className={styles.modelStatVal} style={{ color: m.accent }}>{m.context}</span>
                  </div>
                  <div className={styles.modelStat}>
                    <span className={styles.modelStatLabel}>입력</span>
                    <span className={styles.modelStatVal}>{m.inputPrice}</span>
                  </div>
                  <div className={styles.modelStat}>
                    <span className={styles.modelStatLabel}>출력</span>
                    <span className={styles.modelStatVal}>{m.outputPrice}</span>
                  </div>
                </div>
                <span className={styles.modelStatUnit}>{m.priceUnit}</span>

                {/* 잘하는 것 */}
                <div className={styles.modelStrengths}>
                  {m.strengths.map(s => (
                    <span key={s} className={styles.modelStrengthTag} style={{ borderColor: m.accent, color: m.accent }}>{s}</span>
                  ))}
                </div>

                {/* 바이브 코딩 추천 */}
                <div className={styles.modelVibe} style={{ borderColor: m.accent }}>
                  <span className={styles.modelVibeLabel}>바이브 코딩</span>
                  <p style={{ color: m.accent }}>{m.vibeCoding}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 컨텍스트 크기 비교 바 */}
          <div className={styles.ctxCompare}>
            <p className={styles.ctxCompareLabel}>// 모델별 컨텍스트 윈도우 비교</p>
            {models.map(m => (
              <div key={m.id} className={styles.ctxCompareRow}>
                <span className={styles.ctxCompareName} style={{ color: m.accent }}>{m.name}</span>
                <div className={styles.ctxCompareBarWrap}>
                  <div className={styles.ctxCompareBar} style={{ background: m.accent }} />
                </div>
                <span className={styles.ctxCompareVal}>{m.context} tokens</span>
              </div>
            ))}
            <p className={styles.ctxCompareNote}>세 모델 모두 200K 컨텍스트 윈도우 지원 — 약 15만 단어, 코드 수천 줄을 한 번에 처리 가능</p>
          </div>

        </div>
      </section>
    </div>
  )
}
