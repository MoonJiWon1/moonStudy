import { useState } from 'react'
import { skillCategories } from '../data/skills'
import styles from './Skills.module.css'

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('dev')
  const [copied, setCopied] = useState(null)

  const current = skillCategories.find(c => c.id === activeCategory)

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
          <span className={styles.label}>// SKILLS</span>
          <h1 className={styles.title}>스킬 시스템</h1>
          <p className={styles.subtitle}>
            skills.sh에서 유형별 TOP 3 스킬을 골랐다.<br />
            설치 명령어를 복사해서 바로 쓸 수 있다.
          </p>
        </div>
      </section>

      {/* 탭 */}
      <div className={styles.tabs}>
        <div className={styles.tabInner}>
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              className={`${styles.tab} ${activeCategory === cat.id ? styles.tabActive : ''}`}
              style={{ '--accent': cat.accent }}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 스킬 카드 */}
      <section className={styles.content}>
        <div className={styles.inner}>
          <div className={styles.categoryLabel} style={{ color: current.accent }}>
            {current.icon} {current.label}
          </div>

          <div className={styles.skillGrid}>
            {current.skills.map((skill, i) => (
              <div
                key={skill.name}
                className={styles.skillCard}
                style={{ '--accent': current.accent, animationDelay: `${i * 0.1}s` }}
              >
                <div className={styles.skillHeader}>
                  <div>
                    <span className={styles.skillTag} style={{ borderColor: current.accent, color: current.accent }}>
                      {skill.tag}
                    </span>
                  </div>
                  <span className={styles.skillOwner}>by {skill.owner}</span>
                </div>

                <h3 className={styles.skillName}>/{skill.name}</h3>
                <p className={styles.skillDesc}>{skill.desc}</p>

                <div className={styles.installBlock}>
                  <code className={styles.installCode}>{skill.install}</code>
                  <button
                    className={styles.copyBtn}
                    onClick={() => handleCopy(skill.install, skill.name)}
                  >
                    {copied === skill.name ? '✓ 복사됨' : '복사'}
                  </button>
                </div>

                <div className={styles.cardGlow} />
              </div>
            ))}
          </div>

          {/* skills.sh 링크 */}
          <div className={styles.moreLink}>
            <span className={styles.moreDim}>더 많은 스킬은</span>
            <a
              href="https://skills.sh"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.moreAnchor}
            >
              skills.sh →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
