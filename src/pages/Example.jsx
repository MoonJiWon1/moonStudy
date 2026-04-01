import { useState } from 'react'
import styles from './Example.module.css'

// 전체 5단계 타임라인 데이터
const timeline = [
  { id: 1, label: 'STEP 1', name: 'BMAD로 기획', color: '#a78bfa', short: 'PLAN' },
  { id: 2, label: 'STEP 2', name: '프로젝트 셋업', color: '#00e5cc', short: 'SETUP' },
  { id: 3, label: 'STEP 3', name: '기능 구현', color: '#39d353', short: 'BUILD' },
  { id: 4, label: 'STEP 4', name: '디버깅 & 검증', color: '#ff6b35', short: 'DEBUG' },
  { id: 5, label: 'STEP 5', name: 'Vercel 배포', color: '#f59e0b', short: 'SHIP' },
]

// 각 단계별 상세 데이터
const steps = [
  {
    id: 1,
    label: 'STEP 1',
    title: 'BMAD로 기획',
    color: '#a78bfa',
    input: `> /bmad Todo 앱 만들고 싶어.
  할 일 추가, 완료 체크, 삭제 기능 필요해.
  React + Vite 쓸 거야.`,
    inputLang: '// Claude Code 입력',
    output: 'PRD 문서, 유저스토리 3개, 컴포넌트 구조, 작업 목록 생성됨',
    outputItems: [
      'PRD — 무엇을 만들지, 왜 만드는지 정리',
      'User Stories — "사용자로서 할 일을 추가할 수 있다" 등 3개',
      '컴포넌트 구조 — TodoApp / TodoInput / TodoList / TodoItem',
      'Task List — 우선순위 순서로 작업 목록 분해',
    ],
  },
  {
    id: 2,
    label: 'STEP 2',
    title: '프로젝트 셋업',
    color: '#00e5cc',
    input: `> npm create vite@latest my-todo -- --template react
> cd my-todo && npm install
> Claude Code를 열고 프로젝트 폴더 지정`,
    inputLang: '// 터미널',
    input2: `> BMAD에서 나온 구조대로
  기본 파일 구조 잡아줘`,
    input2Lang: '// Claude Code 입력',
    output: 'Vite + React 프로젝트 초기화 완료. BMAD 산출물 기반으로 파일 구조 자동 생성',
    outputItems: [
      'src/components/TodoApp.jsx 생성',
      'src/components/TodoInput.jsx 생성',
      'src/components/TodoList.jsx 생성',
      'src/components/TodoItem.jsx 생성',
    ],
  },
  {
    id: 3,
    label: 'STEP 3',
    title: '기능 구현',
    color: '#39d353',
    input: `> TodoInput 컴포넌트 만들어줘.
  엔터 치면 추가되고, 빈 값은 무시해.

> TodoItem에 완료 토글이랑 삭제 버튼 추가해줘.
  완료된 항목은 취소선 스타일.

> localStorage에 저장해서 새로고침해도 유지되게 해줘.`,
    inputLang: '// Claude Code 입력 (순서대로)',
    output: '기능 하나씩 완성하며 커밋. 각 구현 후 브라우저에서 직접 확인',
    outputItems: [
      'TodoInput — 엔터 입력, 빈 값 방어 처리',
      'TodoItem — 완료 토글(취소선), 삭제 버튼',
      'localStorage — useEffect로 자동 저장/복원',
    ],
  },
  {
    id: 4,
    label: 'STEP 4',
    title: '디버깅 & 검증',
    color: '#ff6b35',
    input: `> 새로고침하면 데이터가 사라져.
  콘솔 에러: SyntaxError: Unexpected token u in JSON

> /systemic-debugging 실행해줘`,
    inputLang: '// Claude Code 입력',
    output: 'JSON.parse(null) 오류 발견 → localStorage 초기값 처리 수정',
    outputItems: [
      '원인: localStorage에 값 없을 때 null 반환 → JSON.parse(null) 에러',
      '수정: JSON.parse(localStorage.getItem(\'todos\') || \'[]\') 로 초기값 처리',
      'systemic-debugging으로 엣지케이스 3가지 추가 검증',
    ],
  },
  {
    id: 5,
    label: 'STEP 5',
    title: 'Vercel 배포',
    color: '#f59e0b',
    input: `> git init && git add . && git commit -m "feat: Todo 앱 완성"
> git remote add origin https://github.com/username/my-todo.git
> git push -u origin main
# Vercel에서 GitHub 저장소 연결 → 자동 배포`,
    inputLang: '// 터미널 + Vercel 연결',
    output: '배포 완료. GitHub push마다 자동으로 Vercel 재배포 트리거',
    outputItems: [
      'GitHub 저장소 연결 (무료)',
      'Vercel Import → Framework: Vite 자동 감지',
      '배포 URL 즉시 발급 — https://my-todo.vercel.app',
    ],
  },
]

// 핵심 팁 3개
const tips = [
  {
    num: '01',
    title: '한 번에 하나씩',
    desc: '한 번에 너무 많이 요청하지 마라. 기능 하나씩 완성하고 커밋한 뒤 다음 단계로.',
    color: '#00e5cc',
  },
  {
    num: '02',
    title: '에러 전체 붙여넣기',
    desc: '에러가 나면 에러 메시지 전체를 Claude에게 붙여넣어라. 요약하면 놓치는 정보가 생긴다.',
    color: '#ff6b35',
  },
  {
    num: '03',
    title: 'Git 롤백 포인트',
    desc: '잘 되는 시점마다 git commit — 언제든 돌아올 수 있는 롤백 포인트를 만들어 둬라.',
    color: '#f59e0b',
  },
]

export default function Example() {
  // 열려 있는 스텝 ID (null이면 모두 닫힘)
  const [activeStep, setActiveStep] = useState(1)

  const toggle = (id) => {
    setActiveStep((prev) => (prev === id ? null : id))
  }

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <section className={styles.header}>
        <div className={styles.inner}>
          <span className={styles.label}>// 실전 예시</span>
          <h1 className={styles.title}>처음부터 끝까지</h1>
          <p className={styles.subtitle}>
            Claude Code로 간단한 Todo 앱을 만드는 실제 워크플로우.<br />
            기획부터 배포까지.
          </p>
        </div>
      </section>

      {/* 섹션 1: 전체 흐름 타임라인 */}
      <section className={styles.timelineSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 전체 흐름</p>
          <div className={styles.timeline}>
            {timeline.map((t, i) => (
              <div key={t.id} className={styles.timelineItem}>
                {/* 스텝 노드 */}
                <button
                  className={`${styles.timelineNode} ${activeStep === t.id ? styles.timelineNodeActive : ''}`}
                  style={{ '--step-color': t.color }}
                  onClick={() => toggle(t.id)}
                >
                  <span className={styles.timelineShort}>{t.short}</span>
                  <span className={styles.timelineNum}>{t.label}</span>
                  <span className={styles.timelineName}>{t.name}</span>
                </button>
                {/* 연결 선 (마지막 제외) */}
                {i < timeline.length - 1 && (
                  <div className={styles.timelineConnector}>
                    <div className={styles.timelineLine} />
                    <span className={styles.timelineArrow}>›</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 섹션 2: 단계별 아코디언 */}
      <section className={styles.accordionSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 단계별 상세</p>
          <div className={styles.accordion}>
            {steps.map((step) => {
              const isOpen = activeStep === step.id
              return (
                <div
                  key={step.id}
                  className={`${styles.accordionItem} ${isOpen ? styles.accordionOpen : ''}`}
                  style={{ '--step-color': step.color }}
                >
                  {/* 아코디언 헤더 */}
                  <button
                    className={styles.accordionHeader}
                    onClick={() => toggle(step.id)}
                  >
                    <span className={styles.accordionLabel}>{step.label}</span>
                    <span className={styles.accordionTitle}>{step.title}</span>
                    <span className={styles.accordionIndicator}>{isOpen ? '−' : '+'}</span>
                  </button>

                  {/* 아코디언 내용 */}
                  {isOpen && (
                    <div className={styles.accordionBody}>
                      {/* 입력 코드 블록 */}
                      <div className={styles.codeWrap}>
                        <div className={styles.codeHeader}>
                          <span className={styles.codeLang}>{step.inputLang}</span>
                        </div>
                        <pre className={styles.codeBlock}>{step.input}</pre>
                      </div>

                      {/* 두 번째 코드 블록 (셋업 단계) */}
                      {step.input2 && (
                        <div className={styles.codeWrap}>
                          <div className={styles.codeHeader}>
                            <span className={styles.codeLang}>{step.input2Lang}</span>
                          </div>
                          <pre className={styles.codeBlock}>{step.input2}</pre>
                        </div>
                      )}

                      {/* 출력 결과 */}
                      <div className={styles.outputWrap}>
                        <p className={styles.outputTitle}>
                          <span style={{ color: step.color }}>→</span> {step.output}
                        </p>
                        <ul className={styles.outputList}>
                          {step.outputItems.map((item, i) => (
                            <li key={i} className={styles.outputItem}>
                              <span className={styles.outputDot} style={{ background: step.color }} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 섹션 3: 핵심 팁 */}
      <section className={styles.tipsSection}>
        <div className={styles.inner}>
          <p className={styles.sectionLabel}>// 핵심 팁</p>
          <div className={styles.tipsGrid}>
            {tips.map((tip) => (
              <div
                key={tip.num}
                className={styles.tipCard}
                style={{ '--tip-color': tip.color }}
              >
                <span className={styles.tipNum}>{tip.num}</span>
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
