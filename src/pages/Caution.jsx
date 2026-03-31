import { useState } from 'react'
import { cautions } from '../data/caution'
import styles from './Caution.module.css'

const levelConfig = {
  critical: { label: '위험', color: '#ef4444' },
  warning: { label: '주의', color: '#f59e0b' },
  info: { label: '알아두기', color: '#3b82f6' },
}

export default function Caution() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all'
    ? cautions
    : cautions.filter(c => c.level === filter)

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// CAUTION</span>
          <h1 className={styles.title}>주의사항</h1>
          <p className={styles.subtitle}>
            Claude Code로 바이브 코딩할 때 자주 하는 실수들.<br />
            이것만 알아도 삽질을 절반으로 줄일 수 있다.
          </p>

          {/* 레벨 카운트 */}
          <div className={styles.levelSummary}>
            {Object.entries(levelConfig).map(([key, { label, color }]) => (
              <div key={key} className={styles.levelBadge} style={{ '--color': color }}>
                <span className={styles.levelDot} />
                <span>{label}</span>
                <span className={styles.levelCount}>
                  {cautions.filter(c => c.level === key).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 필터 */}
      <div className={styles.filterBar}>
        <div className={styles.inner}>
          {[
            { key: 'all', label: '전체' },
            { key: 'critical', label: '위험' },
            { key: 'warning', label: '주의' },
            { key: 'info', label: '알아두기' },
          ].map(({ key, label }) => (
            <button
              key={key}
              className={`${styles.filterBtn} ${filter === key ? styles.filterActive : ''}`}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* 주의사항 목록 */}
      <section className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.list}>
            {filtered.map((item, i) => {
              const lvl = levelConfig[item.level]
              return (
                <div
                  key={item.id}
                  className={styles.item}
                  style={{ '--accent': item.accent, animationDelay: `${i * 0.06}s` }}
                >
                  <div className={styles.itemLeft}>
                    <div className={styles.itemIcon}>{item.icon}</div>
                    <div
                      className={styles.itemLevel}
                      style={{ color: lvl.color, borderColor: lvl.color }}
                    >
                      {lvl.label}
                    </div>
                  </div>

                  <div className={styles.itemBody}>
                    <div className={styles.itemHeader}>
                      <span className={styles.itemId}>{item.id}</span>
                      <h3 className={styles.itemTitle}>{item.title}</h3>
                    </div>
                    <p className={styles.itemDesc}>{item.desc}</p>
                    <div className={styles.itemTip}>
                      <span className={styles.tipLabel}>→ 대처법</span>
                      <span>{item.tip}</span>
                    </div>
                  </div>

                  <div className={styles.itemBar} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
