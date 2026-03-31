// 에이전트 만들기 사용법 데이터
export const steps = [
  {
    num: '01',
    title: '스킬 디렉토리 생성',
    desc: '~/.claude/skills/ 아래에 스킬 이름으로 폴더를 만든다.',
    code: 'mkdir -p ~/.claude/skills/my-agent',
    detail: '스킬은 ~/.claude/skills/ 폴더에 위치해야 Claude Code가 인식한다. 폴더 이름이 곧 슬래시 커맨드 이름이 된다.',
    accent: '#00e5cc',
  },
  {
    num: '02',
    title: 'SKILL.md 작성',
    desc: '스킬 폴더 안에 SKILL.md 파일을 만들고 에이전트의 역할과 행동을 정의한다.',
    code: `---
name: my-agent
description: 이 에이전트가 무엇을 하는지 (트리거 조건 포함)
---

You are [에이전트 역할].

## When to Use
- [이 스킬을 쓰는 상황]

## What You Do
- [에이전트의 행동 정의]`,
    detail: 'description 필드가 중요하다. Claude가 언제 이 스킬을 자동 추천할지 이 설명을 보고 판단한다.',
    accent: '#ff6b35',
  },
  {
    num: '03',
    title: 'CLAUDE.md에 사용 규칙 등록',
    desc: '~/.claude/CLAUDE.md에 언제 이 스킬을 사용할지 규칙을 추가한다.',
    code: `# 스킬 사용 규칙
- [조건]이 오면 /my-agent 스킬을 먼저 실행할 것`,
    detail: 'CLAUDE.md는 모든 프로젝트에 적용되는 전역 규칙 파일이다. 여기에 명시해야 Claude가 자동으로 스킬을 선택한다.',
    accent: '#39d353',
  },
  {
    num: '04',
    title: '스킬 호출',
    desc: '대화에서 /my-agent 로 직접 호출하거나, CLAUDE.md 규칙에 따라 자동으로 실행된다.',
    code: '> /my-agent 새 기능 기획해줘',
    detail: '슬래시 커맨드로 직접 호출하거나, Skill 툴을 통해 다른 에이전트가 호출할 수도 있다. 팀처럼 연결해서 쓸 수 있는 게 핵심이다.',
    accent: '#a78bfa',
  },
  {
    num: '05',
    title: '핸드오프 프로토콜 설계',
    desc: '스킬 완료 후 다음 에이전트에게 무엇을 전달할지 명시한다.',
    code: `## Handoff Protocol
→ frontend-design: 어떤 UI를 만들어야 하는지
→ mcp-builder: 어떤 API가 필요한지
→ systemic-debugging: 무엇을 검증해야 하는지`,
    detail: '각 스킬의 산출물 끝에 다음 스킬로 넘길 내용을 명시하면, 여러 에이전트가 팀처럼 협력하는 워크플로우가 완성된다.',
    accent: '#f59e0b',
  },
]
