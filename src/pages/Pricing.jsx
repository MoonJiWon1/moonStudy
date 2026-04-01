import { useState } from 'react'
import styles from './Pricing.module.css'

// 비교 테이블 행 데이터
const tableRows = [
  {
    feature: '월 비용',
    pro: '$20 / 월 (약 28,000원)',
    api: '사용량에 따라 변동',
  },
  {
    feature: '사용량 제한',
    pro: '있음 (5시간마다 리셋)',
    api: '없음',
  },
  {
    feature: '과금 방식',
    pro: '정액제',
    api: '토큰 종량제',
  },
  {
    feature: 'Claude Code 포함',
    pro: '포함',
    api: '별도 키 필요',
  },
  {
    feature: '추천 대상',
    pro: '개인 개발자, 입문자',
    api: '팀, 집중 개발자',
  },
]

// 비용 절약 팁 3개
const savingTips = [
  {
    num: '01',
    title: '컨텍스트 관리',
    desc: '/clear로 대화를 초기화하면 다음 요청부터 토큰 소모가 줄어든다. 새 작업을 시작할 때 습관적으로 실행해라.',
    color: '#00e5cc',
    cmd: '/clear',
  },
  {
    num: '02',
    title: '핵심만 질문',
    desc: '불필요한 설명 요청을 줄여라. "자세히 설명해줘" 대신 바로 코드를 요청하면 출력 토큰이 크게 줄어든다.',
    color: '#a78bfa',
    cmd: null,
  },
  {
    num: '03',
    title: 'Pro 제한 활용',
    desc: '5시간 제한에 걸리면 잠깐 쉬고 재시작. 작업을 청크로 나눠 제한 내에서 효율적으로 사용하는 습관을 들여라.',
    color: '#f59e0b',
    cmd: null,
  },
]

export default function Pricing() {
  // 선택된 플랜 (모바일 카드 강조용)
  const [selected, setSelected] = useState('pro')

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// 비용 & 요금</span>
          <h1 className={styles.title}>얼마나 드나요?</h1>
          <p className={styles.subtitle}>
            Claude Code는 두 가지 방식으로 쓸 수 있어요.<br />
            사용 패턴에 따라 선택하세요.
          </p>
        </div>
      </section>

      {/* 섹션 1: 두 가지 방식 비교 카드 */}
      <section className={styles.cardsSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 두 가지 방식</p>
          <div className={styles.cardsGrid}>

            {/* 카드 1: Pro 플랜 */}
            <div
              className={`${styles.planCard} ${selected === 'pro' ? styles.planCardSelected : ''}`}
              style={{ '--plan-color': '#00e5cc' }}
              onClick={() => setSelected('pro')}
            >
              {/* 추천 배지 */}
              <span className={styles.recommendBadge}>추천</span>

              <div className={styles.planHeader}>
                <span className={styles.planType}>Claude.ai</span>
                <h2 className={styles.planName}>Pro 플랜</h2>
              </div>

              <div className={styles.planPrice}>
                <span className={styles.priceAmount}>$20</span>
                <span className={styles.priceUnit}>/ 월</span>
              </div>
              <p className={styles.priceNote}>약 28,000원</p>

              <ul className={styles.planFeatures}>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#00e5cc' }}>✓</span>
                  Claude Code 포함 (별도 요금 없음)
                </li>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#00e5cc' }}>✓</span>
                  사용량 제한 있음 (5시간마다 리셋)
                </li>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#00e5cc' }}>✓</span>
                  claude.ai 웹 & 앱 모두 사용 가능
                </li>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#00e5cc' }}>✓</span>
                  고정 월정액 — 예측 가능한 비용
                </li>
              </ul>
            </div>

            {/* 카드 2: API 키 방식 */}
            <div
              className={`${styles.planCard} ${selected === 'api' ? styles.planCardSelected : ''}`}
              style={{ '--plan-color': '#a78bfa' }}
              onClick={() => setSelected('api')}
            >
              <div className={styles.planHeader}>
                <span className={styles.planType}>Anthropic</span>
                <h2 className={styles.planName}>API 키 방식</h2>
              </div>

              <div className={styles.planPrice}>
                <span className={styles.priceAmount} style={{ fontSize: '1.6rem' }}>토큰 종량</span>
              </div>
              <p className={styles.priceNote}>사용한 만큼만 과금</p>

              <ul className={styles.planFeatures}>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#a78bfa' }}>✓</span>
                  입력 토큰: $3 / 1M (Claude Sonnet 4.5)
                </li>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#a78bfa' }}>✓</span>
                  출력 토큰: $15 / 1M
                </li>
                <li className={styles.planFeatureItem}>
                  <span className={styles.featureCheck} style={{ color: '#a78bfa' }}>✓</span>
                  사용량 제한 없음
                </li>
                <li className={styles.planFeatureWarning}>
                  <span className={styles.featureWarn}>!</span>
                  코드 많이 짜면 비용 급증 가능
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 섹션 2: 상세 비교 테이블 */}
      <section className={styles.tableSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 상세 비교</p>

          {/* 데스크탑 테이블 */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thFeature}>항목</th>
                  <th className={styles.thPro}>
                    <span style={{ color: '#00e5cc' }}>Pro 플랜</span>
                  </th>
                  <th className={styles.thApi}>
                    <span style={{ color: '#a78bfa' }}>API 키</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} className={styles.tableRow}>
                    <td className={styles.tdFeature}>{row.feature}</td>
                    <td className={styles.tdPro}>{row.pro}</td>
                    <td className={styles.tdApi}>{row.api}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 모바일 카드형 테이블 */}
          <div className={styles.mobileTable}>
            {tableRows.map((row, i) => (
              <div key={i} className={styles.mobileRow}>
                <p className={styles.mobileFeature}>{row.feature}</p>
                <div className={styles.mobileCols}>
                  <div className={styles.mobileCol}>
                    <span className={styles.mobileColLabel} style={{ color: '#00e5cc' }}>Pro</span>
                    <span className={styles.mobileColVal}>{row.pro}</span>
                  </div>
                  <div className={styles.mobileColDivider} />
                  <div className={styles.mobileCol}>
                    <span className={styles.mobileColLabel} style={{ color: '#a78bfa' }}>API</span>
                    <span className={styles.mobileColVal}>{row.api}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 3: 어떤 걸 골라야 할까? */}
      <section className={styles.choiceSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 어떤 걸 골라야 할까?</p>
          <div className={styles.choiceGrid}>

            {/* Pro 추천 */}
            <div className={styles.choiceCard} style={{ '--choice-color': '#00e5cc' }}>
              <div className={styles.choiceCardHeader}>
                <span className={styles.choicePlan}>Pro 플랜 추천</span>
              </div>
              <ul className={styles.choiceList}>
                <li>처음 시작하는 사람</li>
                <li>월 $20 고정 비용이 편한 사람</li>
                <li>claude.ai 웹/앱도 같이 쓰는 사람</li>
                <li>하루 2~3시간 이내로 사용하는 사람</li>
              </ul>
            </div>

            {/* API 키 추천 */}
            <div className={styles.choiceCard} style={{ '--choice-color': '#a78bfa' }}>
              <div className={styles.choiceCardHeader}>
                <span className={styles.choicePlan}>API 키 추천</span>
              </div>
              <ul className={styles.choiceList}>
                <li>하루 종일 붙어서 집중 개발하는 사람</li>
                <li>기업 / 팀 단위 사용</li>
                <li>정확한 비용 추적이 필요한 경우</li>
                <li>이미 Anthropic API를 쓰고 있는 경우</li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 섹션 4: 비용 절약 팁 */}
      <section className={styles.savingSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 비용 절약 팁</p>
          <div className={styles.savingGrid}>
            {savingTips.map((tip) => (
              <div
                key={tip.num}
                className={styles.savingCard}
                style={{ '--saving-color': tip.color }}
              >
                <div className={styles.savingTop}>
                  <span className={styles.savingNum}>{tip.num}</span>
                  {tip.cmd && (
                    <code className={styles.savingCmd}>{tip.cmd}</code>
                  )}
                </div>
                <h3 className={styles.savingTitle}>{tip.title}</h3>
                <p className={styles.savingDesc}>{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 5: 안내 박스 */}
      <section className={styles.noticeSection}>
        <div className={styles.inner}>
          <div className={styles.noticeBox}>
            <span className={styles.noticeIcon}>ℹ</span>
            <p className={styles.noticeText}>
              요금 정보는 Anthropic 정책에 따라 변경될 수 있습니다.
              최신 정보는{' '}
              <a
                href="https://anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.noticeLink}
              >
                anthropic.com
              </a>
              에서 확인하세요.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
