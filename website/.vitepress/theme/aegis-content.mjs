const zh = {
  hero: {
    eyebrow: '开源治理工程方法包',
    title: ['让 Agent', '在行动前，', '先形成工程判断。'],
    body: 'Aegis 把基线优先、变更必要性、系统化诊断、反熵与证据化交付带进你已经使用的 Coding Agent。',
    practical: '少一点返工，少一点盲信“已完成”，让简单任务保持简单。',
    github: '在 GitHub 查看 Aegis',
    install: '快速安装',
    meta: 'MIT License · Runtime-ready method pack',
    flow: [['01', '理解基线'], ['02', '判断必要性'], ['03', '约束行动'], ['04', '证据收尾']],
  },
  value: {
    kicker: 'Why Aegis',
    title: '把工程判断放进 Agent 的工作方式。',
    body: 'Prompt 可以描述目标，却很难持续维护项目事实、变更边界和完成证据。Aegis 把这些要求组织成按需进入的工程方法。',
    items: [
      ['减少返工', '修改前对齐项目真实基线、owner 与约束，减少凭猜测展开的工作。'],
      ['控制变更风险', '先判断变更是否必要，再限制影响范围并追踪需要退役的旧路径。'],
      ['以证据结束', '用新鲜检查、覆盖范围和残余风险支持完成结论。'],
      ['保持轻量', '简单任务走快速路径，只有风险和复杂度需要时才展开治理。'],
    ],
  },
  methods: {
    kicker: 'Method Pack',
    title: '一组可以组合的工程方法。',
    body: 'Aegis 根据任务触发相关方法，不要求每个任务执行同一套固定仪式。',
    items: [
      ['基线优先', '先读取目标、约束、owner 与验收要求，再决定如何行动。'],
      ['变更必要性', '确认修改能解决实际问题，避免为了改动而改动。'],
      ['反熵治理', '减少重复 owner、遗留 fallback 和无序扩张。'],
      ['系统化诊断', '从可观察事实定位原因，再选择最小有效修复。'],
      ['证据化交付', '区分执行过的操作、验证建立的事实和仍然未知的内容。'],
      ['长任务连续性', '用持久目标、计划和上下文保持跨轮次工作不偏离。'],
    ],
  },
  hosts: {
    kicker: 'Across Hosts',
    title: '方法跟随项目，而不是绑定一个 Agent。',
    body: 'Aegis 面向支持 Skills 或可安装方法包的 Coding Agent Host。Codex 与 OpenCode 有当前方法包范围内的新鲜证据；其他 Host 的安装与验证状态以兼容矩阵为准。',
    hosts: ['Codex', 'OpenCode', 'Claude Code', 'DeepSeek Harness', 'Kimi Code CLI', 'GitHub Copilot'],
    matrix: '查看 Host 兼容矩阵',
  },
  evidence: {
    kicker: 'Public Evidence',
    title: '公开方法、测试和有边界的基准证据。',
    body: 'Aegis 仓库公开方法包、安装验证、Host 指南和冻结的 A/B 基准。基准用于说明特定版本与条件下的观察结果，不构成普遍正确性或完成授权。',
    benchmark: '阅读基准与方法',
    source: '查看源代码与测试',
  },
  relationship: {
    kicker: 'Aegis × Autoloom',
    title: '方法包与产品运行时，各自解决不同一层问题。',
    aegis: { label: 'Aegis', title: '把方法带到现有 Host', body: '适合希望在 Codex、OpenCode 等已有工具中采用治理工程方法的开发者。安装、升级、兼容状态和完整文档由 Aegis 仓库维护。' },
    autoloom: { label: 'Autoloom', title: '把治理编织进执行过程', body: '适合需要治理 checkpoint、完整轨迹、结构化记录和 Windows 桌面工作流的用户。Autoloom 已集成相关能力，无需另行安装 Aegis。' },
    autoloomCta: '了解 Autoloom',
  },
  boundaries: {
    title: '能力边界保持清楚。',
    items: [
      ['不是 Agent 运行时', 'Aegis 不执行模型请求、文件操作或后台任务。'],
      ['不授予权限', '实际权限、沙箱和工具能力始终由当前 Host 与用户配置决定。'],
      ['不保证正确', '方法和证据帮助复核，但不替代测试、用户验收或专业判断。'],
      ['项目规则优先', '用户指令和目标项目的规则高于 Aegis 的通用方法指导。'],
    ],
  },
  final: { title: '让你的 Agent 少一点猜测，多一点依据。', github: '在 GitHub 查看 Aegis', install: '开始安装' },
}

const en = {
  hero: {
    eyebrow: 'Open-source Governance Engineering Method Pack',
    title: ['Give your Agent', 'engineering judgment', 'before action.'],
    body: 'Aegis brings baseline-first work, change necessity, systematic diagnosis, anti-entropy, and evidence-backed delivery into the Coding Agent you already use.',
    practical: 'Reduce rework, rely less on blind “done” claims, and keep simple tasks simple.',
    github: 'View Aegis on GitHub',
    install: 'Quick install',
    meta: 'MIT License · Runtime-ready method pack',
    flow: [['01', 'Read the baseline'], ['02', 'Test necessity'], ['03', 'Bound the action'], ['04', 'Close with evidence']],
  },
  value: {
    kicker: 'Why Aegis',
    title: 'Put engineering judgment into how the Agent works.',
    body: 'A prompt can state a goal, but it rarely maintains project facts, change boundaries, and completion evidence over time. Aegis organizes those needs into engineering methods that enter only when relevant.',
    items: [
      ['Fewer reworks', 'Align with the real project baseline, owners, and constraints before editing instead of expanding from guesses.'],
      ['Safer changes', 'Test whether a change is needed, bound its impact, and track old paths that must retire.'],
      ['Proof before done', 'Support completion with fresh checks, covered scope, and residual risk.'],
      ['Simple stays simple', 'Keep trivial work on a fast path and expand governance only when risk or complexity warrants it.'],
    ],
  },
  methods: {
    kicker: 'Method Pack',
    title: 'Composable engineering methods, selected by the work.',
    body: 'Aegis routes to relevant methods instead of forcing every task through one fixed ceremony.',
    items: [
      ['Baseline first', 'Read goals, constraints, owners, and acceptance before deciding how to act.'],
      ['Change necessity', 'Confirm that a modification solves the observed problem instead of changing code for its own sake.'],
      ['Anti-entropy governance', 'Reduce duplicate owners, retired fallbacks, and uncontrolled expansion.'],
      ['Systematic diagnosis', 'Use observable facts to find causes before selecting the smallest effective repair.'],
      ['Evidence-backed delivery', 'Separate actions that ran, facts established by verification, and remaining unknowns.'],
      ['Long-task continuity', 'Keep multi-turn work aligned through durable goals, plans, and context.'],
    ],
  },
  hosts: {
    kicker: 'Across Hosts',
    title: 'Methods follow the project instead of one Agent.',
    body: 'Aegis targets Coding Agent hosts that support Skills or installable method packs. Codex and OpenCode have fresh evidence for the current method-pack scope; use the compatibility matrix for the current status of other hosts.',
    hosts: ['Codex', 'OpenCode', 'Claude Code', 'DeepSeek Harness', 'Kimi Code CLI', 'GitHub Copilot'],
    matrix: 'View the host compatibility matrix',
  },
  evidence: {
    kicker: 'Public Evidence',
    title: 'Open methods, tests, and bounded benchmark evidence.',
    body: 'The Aegis repository publishes the method pack, install verification, host guides, and a frozen A/B benchmark. The benchmark reports observations for stated versions and conditions; it is not a universal correctness or completion-authority claim.',
    benchmark: 'Read the benchmark and method',
    source: 'View source and tests',
  },
  relationship: {
    kicker: 'Aegis × Autoloom',
    title: 'A method pack and a product runtime solve different layers.',
    aegis: { label: 'Aegis', title: 'Bring methods to an existing host', body: 'For developers who want Governance Engineering in tools such as Codex or OpenCode. The Aegis repository owns installation, updates, compatibility status, and complete documentation.' },
    autoloom: { label: 'Autoloom', title: 'Weave governance into execution', body: 'For users who need governance checkpoints, full trajectory, structured records, and a Windows desktop workflow. Autoloom includes the integration; no separate Aegis installation is needed.' },
    autoloomCta: 'Explore Autoloom',
  },
  boundaries: {
    title: 'Keep the capability boundaries clear.',
    items: [
      ['Not an Agent runtime', 'Aegis does not execute model requests, file operations, or background jobs.'],
      ['Does not grant permission', 'The active host and user configuration still own permissions, sandboxing, and tool access.'],
      ['Does not guarantee correctness', 'Methods and evidence support review; they do not replace tests, user acceptance, or professional judgment.'],
      ['Project rules take precedence', 'User instructions and target-project rules outrank general Aegis guidance.'],
    ],
  },
  final: { title: 'Give your Agent fewer guesses and better grounds.', github: 'View Aegis on GitHub', install: 'Start installing' },
}

export const aegisContent = { zh, en }
