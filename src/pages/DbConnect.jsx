import { useState } from 'react'
import styles from './DbConnect.module.css'

// 파이프라인 흐름 노드
const pipeline = [
  {
    id: 'code',
    icon: '💻',
    label: '코드 작성',
    sub: 'Claude Code + 에디터',
    color: '#a78bfa',
    desc: '바이브 코딩으로 기능 구현',
  },
  {
    id: 'github',
    icon: '🐙',
    label: 'GitHub',
    sub: 'git push',
    color: '#e2e8f0',
    desc: '코드의 중심 저장소',
  },
  {
    id: 'vercel',
    icon: '▲',
    label: 'Vercel',
    sub: '자동 빌드 & 배포',
    color: '#00e5cc',
    desc: '배포를 대신 해주는 친구',
  },
  {
    id: 'db',
    icon: '🗄️',
    label: 'PostgreSQL',
    sub: '데이터 저장소',
    color: '#f59e0b',
    desc: '실제 데이터가 사는 곳',
  },
  {
    id: 'user',
    icon: '👤',
    label: '사용자',
    sub: '브라우저',
    color: '#39d353',
    desc: '최종 서비스 이용자',
  },
]

// 세 가지 역할 상세 설명
const roles = [
  {
    icon: '🐙',
    name: 'GitHub',
    tagline: '코드의 중심',
    color: '#e2e8f0',
    points: [
      '모든 것의 출발점. 코드 변경의 기준',
      'git push → Vercel에 자동 배포 신호 전송',
      'main 브랜치 → 프로덕션 배포',
      'PR 생성 → 프리뷰 URL 자동 생성',
      '브랜치 전략으로 개발/운영 환경 분리',
    ],
    tip: 'main에 바로 push하지 말고, PR → 리뷰 → 머지 습관을 들이면 실수가 줄어요.',
  },
  {
    icon: '▲',
    name: 'Vercel',
    tagline: '배포를 대신 해주는 친구',
    color: '#00e5cc',
    points: [
      'GitHub push 감지 → 알아서 빌드 & 배포',
      '환경변수로 DB 연결 정보 안전하게 보관',
      '앱 서버(API Route / Edge Function) 역할',
      'main push → 프로덕션 자동 반영',
      'PR → 독립 프리뷰 URL 자동 생성',
    ],
    tip: '환경변수는 절대 코드에 직접 넣지 마세요. Vercel 대시보드 → Settings → Environment Variables에 저장하세요.',
  },
  {
    icon: '🗄️',
    name: 'PostgreSQL',
    tagline: '데이터 저장소',
    color: '#f59e0b',
    points: [
      'Vercel 앱이 실제 데이터를 읽고 쓰는 곳',
      '테이블 구조(스키마)는 개발자가 직접 설계',
      'Vercel Postgres / Supabase / Neon 등으로 연결',
      '연결 정보(DATABASE_URL)를 Vercel 환경변수에 등록',
      '로컬 개발 시 .env 파일로 별도 관리',
    ],
    tip: 'DB는 직접 서버를 띄우지 않아도 돼요. Supabase나 Neon 같은 서비스를 쓰면 클릭 몇 번으로 PostgreSQL을 쓸 수 있어요.',
  },
]

// DB 서비스 비교
const dbServices = [
  {
    name: 'Vercel Postgres',
    icon: '▲',
    color: '#00e5cc',
    badge: 'Vercel 네이티브',
    badgeColor: '#00e5cc',
    when: 'Vercel에서 가장 빠르게 연결하고 싶을 때',
    pros: [
      'Vercel 대시보드에서 클릭 한 번으로 생성',
      '환경변수 자동 주입 (설정 거의 없음)',
      'Edge Network와 가장 가까이 위치',
    ],
    cons: [
      '무료 플랜 용량이 작음 (256MB)',
      'Vercel 프로젝트 밖에서 쓰기 불편',
    ],
    fit: ['소규모 프로젝트', 'Vercel 올인', '빠른 프로토타입'],
  },
  {
    name: 'Supabase',
    icon: '⚡',
    color: '#39d353',
    badge: '풀스택 BaaS',
    badgeColor: '#39d353',
    when: 'DB 외에 인증·스토리지·실시간 기능도 필요할 때',
    pros: [
      'Auth(소셜로그인 포함) 기본 제공',
      '파일 스토리지, 실시간 구독 기능',
      '대시보드 UI가 뛰어나고 직관적',
      '무료 플랜 넉넉 (500MB + 1GB 스토리지)',
    ],
    cons: [
      '기능이 많아 처음엔 복잡하게 느껴질 수 있음',
      '무료 플랜은 7일 미사용 시 일시정지',
    ],
    fit: ['로그인 기능 필요', '미디어 파일 업로드', '중규모 이상'],
  },
  {
    name: 'Neon',
    icon: '✦',
    color: '#a78bfa',
    badge: '서버리스 특화',
    badgeColor: '#a78bfa',
    when: '서버리스 환경에서 비용 효율적으로 쓰고 싶을 때',
    pros: [
      '사용한 만큼만 과금 (Serverless 최적화)',
      'DB 브랜칭 기능 — 개발/테스트 DB를 코드 브랜치처럼 관리',
      '무료 플랜 가장 넉넉 (0.5GB, 비활성 시 자동 슬립)',
      '콜드 스타트 빠름',
    ],
    cons: [
      '상대적으로 신생 서비스',
      'Supabase처럼 Auth·Storage는 없음',
    ],
    fit: ['서버리스 앱', 'Next.js + API Route', '개인 프로젝트'],
  },
]

export default function DbConnect() {
  const [activeRole, setActiveRole] = useState(0)

  return (
    <div className={styles.page}>

      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// DB 연결</span>
          <h1 className={styles.title}>GitHub · Vercel · PostgreSQL</h1>
          <p className={styles.subtitle}>
            바이브 코딩의 세 가지 기둥.<br />
            코드를 짜면 자동으로 배포되고, 데이터는 클라우드에 저장된다.
          </p>
        </div>
      </section>

      {/* 파이프라인 플로우 다이어그램 */}
      <section className={styles.flowSection}>
        <div className={styles.inner}>
          <p className={styles.flowLabel}>// 전체 흐름</p>

          <div className={styles.pipeline}>
            {pipeline.map((node, i) => (
              <div key={node.id} className={styles.pipelineItem}>
                <div className={styles.pipelineNode} style={{ '--node-color': node.color }}>
                  <span className={styles.nodeIcon}>{node.icon}</span>
                  <span className={styles.nodeLabel}>{node.label}</span>
                  <span className={styles.nodeSub}>{node.sub}</span>
                </div>
                {i < pipeline.length - 1 && (
                  <div className={styles.pipelineArrow}>
                    <div className={styles.arrowLine} style={{ '--node-color': node.color }} />
                    <span className={styles.arrowHead} style={{ color: node.color }}>›</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 한 줄 요약 */}
          <div className={styles.summary}>
            <span className={styles.summaryIcon}>🚀</span>
            <p>
              코드 짜고 → <strong>GitHub</strong>에 올리면 →{' '}
              <strong>Vercel</strong>이 자동 배포 →{' '}
              <strong>PostgreSQL</strong>에서 데이터 가져와 → 사용자에게 보여줌
            </p>
          </div>
        </div>
      </section>

      {/* 세 가지 역할 */}
      <section className={styles.rolesSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 각 서비스의 역할</p>

          {/* 탭 버튼 */}
          <div className={styles.roleTabs}>
            {roles.map((r, i) => (
              <button
                key={r.name}
                className={`${styles.roleTab} ${activeRole === i ? styles.roleTabActive : ''}`}
                style={{ '--role-color': r.color }}
                onClick={() => setActiveRole(i)}
              >
                <span>{r.icon}</span>
                <span>{r.name}</span>
              </button>
            ))}
          </div>

          {/* 탭 상세 */}
          <div className={styles.roleDetail} key={activeRole}>
            <div className={styles.roleDetailHeader} style={{ '--role-color': roles[activeRole].color }}>
              <span className={styles.roleDetailIcon}>{roles[activeRole].icon}</span>
              <div>
                <h2 className={styles.roleDetailName}>{roles[activeRole].name}</h2>
                <p className={styles.roleDetailTagline}>{roles[activeRole].tagline}</p>
              </div>
            </div>

            <ul className={styles.rolePoints}>
              {roles[activeRole].points.map((p, i) => (
                <li key={i} className={styles.rolePoint} style={{ '--role-color': roles[activeRole].color }}>
                  <span className={styles.rolePointDot} />
                  {p}
                </li>
              ))}
            </ul>

            <div className={styles.roleTip} style={{ '--role-color': roles[activeRole].color }}>
              <span className={styles.roleTipIcon}>💡</span>
              <p>{roles[activeRole].tip}</p>
            </div>
          </div>
        </div>
      </section>

      {/* DB 서비스 비교 */}
      <section className={styles.dbSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// PostgreSQL 호스팅 서비스 비교</p>
          <h2 className={styles.dbSectionTitle}>어떤 DB 서비스를 써야 할까?</h2>

          <div className={styles.dbGrid}>
            {dbServices.map((db) => (
              <div key={db.name} className={styles.dbCard} style={{ '--db-color': db.color }}>

                {/* 카드 헤더 */}
                <div className={styles.dbCardHead}>
                  <span className={styles.dbIcon} style={{ color: db.color }}>{db.icon}</span>
                  <div>
                    <h3 className={styles.dbName}>{db.name}</h3>
                    <span className={styles.dbBadge} style={{ color: db.badgeColor, borderColor: db.badgeColor }}>
                      {db.badge}
                    </span>
                  </div>
                </div>

                {/* 언제 쓰나 */}
                <div className={styles.dbWhen}>
                  <span className={styles.dbWhenLabel}>이럴 때 선택</span>
                  <p>{db.when}</p>
                </div>

                {/* 장점 */}
                <div className={styles.dbPros}>
                  <span className={styles.dbListLabel} style={{ color: db.color }}>+ 장점</span>
                  <ul>
                    {db.pros.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>

                {/* 단점 */}
                <div className={styles.dbCons}>
                  <span className={styles.dbListLabel} style={{ color: '#ff6b6b' }}>− 주의</span>
                  <ul>
                    {db.cons.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* 추천 상황 */}
                <div className={styles.dbFit}>
                  {db.fit.map((f) => (
                    <span key={f} className={styles.dbFitTag} style={{ borderColor: db.color, color: db.color }}>
                      {f}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* 빠른 선택 가이드 */}
          <div className={styles.quickGuide}>
            <p className={styles.quickGuideLabel}>// 빠른 선택 가이드</p>
            <div className={styles.quickGuideGrid}>
              <div className={styles.quickItem}>
                <span className={styles.quickQ}>Vercel로 간단히 시작하고 싶다</span>
                <span className={styles.quickA} style={{ color: '#00e5cc' }}>→ Vercel Postgres</span>
              </div>
              <div className={styles.quickItem}>
                <span className={styles.quickQ}>로그인, 파일 업로드가 필요하다</span>
                <span className={styles.quickA} style={{ color: '#39d353' }}>→ Supabase</span>
              </div>
              <div className={styles.quickItem}>
                <span className={styles.quickQ}>서버리스, 비용 최소화가 중요하다</span>
                <span className={styles.quickA} style={{ color: '#a78bfa' }}>→ Neon</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
