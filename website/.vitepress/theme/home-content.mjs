const zh = {
  nav: { product: '产品', governance: '治理工程', docs: '文档', releases: '版本', download: '下载', language: 'EN' },
  hero: {
    eyebrow: '面向 Coding Agent 的治理工程',
    title: ['让 Coding Agent', '每一次改动，', '都有依据可查。'],
    definition: '把目标、约束、工程方法、行动判断与验证证据，编织进 Agent 的执行过程。',
    practical: '行动前参与判断，执行中改变下一步，交付时留下可复核事实与未知项。',
    download: '免费下载 Windows 版',
    platform: 'Windows x64 · 自行连接模型',
    demo: '40 秒真实任务',
    stages: ['行动前 · 治理影响', '执行中 · 完整轨迹', '交付时 · 治理记录'],
  },
  loop: [
    ['治理意图', '目标与约束'],
    ['行动判断', '发现与方法'],
    ['执行影响', '改变下一步'],
    ['证据记录', '事实与未知'],
  ],
  definition: {
    kicker: 'Governance Engineering',
    title: '什么是治理工程？',
    body: '治理不是任务结束后生成一份报告，而是在行动前参与判断，在执行中改变下一步，并在交付时留下可复核的事实与未知项。',
    steps: [
      ['01', '治理意图', '目标、约束与验收要求'],
      ['02', '行动判断', '发现、方法与影响范围'],
      ['03', '执行影响', '改变下一步操作与检查点'],
      ['04', '证据记录', '执行事实、结果与未知项'],
    ],
  },
  engineering: {
    title: '工程化，意味着它能够进入执行、留下证据、接受复核。',
    items: [
      ['可执行', '治理判断必须影响下一步，而不只是生成说明。'],
      ['可追溯', '从结果回到行动判断、工具调用与原始事实。'],
      ['可复核', '明确区分已确认事实、推断与尚未解决的未知。'],
    ],
    note: '规则不是贴在流程之外，而是成为 Agent 工作方式的一部分。',
  },
  methods: {
    title: '治理方法必须改变下一步。',
    finding: '发现：修改已完成，但尚无修改后的实际测试结果。',
    effect: '对操作的影响：运行原有测试，用真实输出判断是否修复。',
    items: [
      ['变更必要性', '避免为了修改而修改。'],
      ['系统诊断', '让下一步回应已观察到的原因。'],
      ['结构熵控制', '限制无关改动与重复实现。'],
      ['证据化交付', '区分做过什么与确认了什么。'],
    ],
  },
  evidence: {
    title: '一项改动，留下四层可复核依据。',
    body: '这些信息进入会话记录，可以从结果回到原始执行过程。',
    items: [
      ['目标与来源', '任务范围、验收要求、相关来源'],
      ['行动判断', '发现、采用的方法、对操作的影响'],
      ['执行事实', '工具调用、命令结果、文件观察'],
      ['交付记录', '结果、证据引用、未知项'],
    ],
  },
  trajectory: { title: '轨迹让执行过程可以回看。', body: '按轮次查看上下文、模型输出、工具调用、参数、结果与时间。', labels: ['请求上下文', '工具结果', '结果提交'] },
  record: { title: '治理页把分散事实组织成完整记录。', body: '从治理概览进入行动评估、检查点、执行事实与工作结果。', flow: '治理影响 → 检查点 → 执行事实 → 结果记录', note: '记录帮助复核，不等同于对任务正确性的保证。' },
  demo: { title: '40 秒，看完治理工程如何进入一次真实任务。', flow: ['发现问题', '形成治理影响', '执行修改', '运行原有检查', '记录结果'], label: '本次演示', facts: ['3 项失败 → 4 项通过', '1 个实现文件修改', '原有测试未改动'] },
  boundaries: {
    title: '治理之外，边界也必须清楚。',
    items: [
      ['权限模式', '决定 Agent 可以读取、修改或执行什么。'],
      ['模型连接', '使用受支持的账户或 API 配置。'],
      ['项目位置', '工作区在本机；模型请求可能发送相关上下文。'],
      ['会话记录', '任务、工具结果与治理事实可以回看。'],
    ],
  },
  start: { title: '开始一个可复核的任务。', steps: ['下载 Windows 客户端', '连接模型', '打开项目并描述目标与验收要求'], cost: '客户端免费，模型费用由所选服务商收取。', guide: '阅读快速开始' },
  faq: {
    title: '关于治理工程',
    items: [
      ['治理会让 Agent 变慢吗？', '治理只在相关决策点进入执行，并复用同一 Agent 与会话。具体成本取决于任务、模型和实际检查。'],
      ['治理记录是否等于结果正确？', '不会。治理记录说明依据、执行事实与未知项；它不替代用户验收，也不构成正确性保证。'],
      ['项目数据会发到哪里？', '工作区位于本机或你连接的 SSH 主机；模型请求可能向所选服务商发送相关上下文，具体取决于任务与配置。'],
      ['哪些操作需要授权？', '权限模式决定 Agent 可以读取、修改或执行什么；需要确认的操作会在执行前请求你的决定。'],
    ],
  },
  final: { title: '让下一次改动，都有依据可查。', docs: '阅读文档' },
  footer: { truth: '免费客户端 · 源码暂未公开 · 公开发布与反馈', security: '安全', privacy: '隐私', license: '许可' },
  alt: { impact: 'Autoloom 中文治理影响卡片', trajectory: 'Autoloom 中文轨迹页面', record: 'Autoloom 中文治理记录页面', result: 'Autoloom 中文真实任务结果' },
}

const en = {
  nav: { product: 'Product', governance: 'Governance Engineering', docs: 'Docs', releases: 'Releases', download: 'Download', language: '中文' },
  hero: {
    eyebrow: 'Governance Engineering for Coding Agents',
    title: ['Every change', 'made by a Coding Agent,', 'backed by inspectable evidence.'],
    definition: 'Weave goals, constraints, engineering methods, action judgments, and verification evidence into agent execution.',
    practical: 'Judge before acting, change the next step during execution, and retain reviewable facts and unknowns at delivery.',
    download: 'Download for Windows',
    platform: 'Windows x64 · Connect your own model',
    demo: '40-second real task',
    stages: ['Before · Governance impact', 'During · Full trajectory', 'Delivery · Governance record'],
  },
  loop: [['Governance intent', 'Goals and constraints'], ['Action judgment', 'Findings and methods'], ['Execution impact', 'Change the next step'], ['Evidence record', 'Facts and unknowns']],
  definition: {
    kicker: 'Governance Engineering',
    title: 'What is Governance Engineering?',
    body: 'Governance is not a report generated after the task. It participates before action, changes the next step during execution, and leaves reviewable facts and unknowns at delivery.',
    steps: [['01', 'Governance intent', 'Goals, constraints, acceptance'], ['02', 'Action judgment', 'Findings, methods, impact'], ['03', 'Execution impact', 'Change operations and checkpoints'], ['04', 'Evidence record', 'Execution facts, results, unknowns']],
  },
  engineering: {
    title: 'Engineering means governance can enter execution, leave evidence, and withstand review.',
    items: [['Executable', 'A governance judgment must affect the next step, not only produce prose.'], ['Traceable', 'Move from a result back to judgments, tool calls, and source facts.'], ['Reviewable', 'Separate confirmed facts, inferences, and unresolved unknowns.']],
    note: 'Rules become part of how the Agent works instead of sitting outside the workflow.',
  },
  methods: {
    title: 'A governance method must change the next step.',
    finding: 'Finding: the change is complete, but there is no actual post-change test result.',
    effect: 'Action effect: run the existing tests and use their output to decide whether the issue is fixed.',
    items: [['Change necessity', 'Avoid changing code for its own sake.'], ['Systematic diagnosis', 'Make the next step answer the observed cause.'], ['Structural entropy control', 'Limit unrelated changes and duplicate owners.'], ['Evidence-backed delivery', 'Separate what ran from what it established.']],
  },
  evidence: {
    title: 'One change leaves four layers of reviewable evidence.',
    body: 'These facts enter the Session record, connecting the result back to the original execution.',
    items: [['Goal and sources', 'Scope, acceptance, relevant sources'], ['Action judgment', 'Finding, method, action effect'], ['Execution facts', 'Tools, command results, file observations'], ['Delivery record', 'Result, evidence references, unknowns']],
  },
  trajectory: { title: 'Trajectory makes execution reviewable.', body: 'Inspect context, model output, tool calls, arguments, results, and timing by turn.', labels: ['Request context', 'Tool result', 'Result submission'] },
  record: { title: 'Governance organizes scattered facts into one record.', body: 'Move from the overview into action assessments, checkpoints, execution facts, and work results.', flow: 'Governance impact → Checkpoint → Execution facts → Result record', note: 'The record supports review; it is not a guarantee that the task is correct.' },
  demo: { title: 'See Governance Engineering enter a real task in 40 seconds.', flow: ['Find the issue', 'Form governance impact', 'Apply the change', 'Run existing checks', 'Record the result'], label: 'This demo', facts: ['3 failures → 4 passing', '1 implementation file changed', 'Existing tests unchanged'] },
  boundaries: {
    title: 'The boundaries must be as clear as the governance.',
    items: [['Permission mode', 'Determines what the Agent may read, change, or execute.'], ['Model connection', 'Uses a supported account or API configuration.'], ['Project location', 'The workspace is local; model requests may send relevant context.'], ['Session record', 'Tasks, tool results, and governance facts remain inspectable.']],
  },
  start: { title: 'Start a reviewable task.', steps: ['Download the Windows client', 'Connect a model', 'Open a project and describe the goal and acceptance'], cost: 'The client is free. Your selected provider charges for model usage.', guide: 'Read the quick start' },
  faq: {
    title: 'About Governance Engineering',
    items: [['Does governance slow the Agent down?', 'Governance enters only at relevant decision points and reuses the same Agent and Session. Actual cost depends on the task, model, and checks.'], ['Does a governance record mean the result is correct?', 'No. It records grounds, execution facts, and unknowns. It does not replace user acceptance or guarantee correctness.'], ['Where does project data go?', 'The workspace stays on your computer or connected SSH host. Model requests may send relevant context to the selected provider, depending on the task and configuration.'], ['Which actions need authorization?', 'Permission mode determines what the Agent may read, change, or execute. Actions that need confirmation ask before execution.']],
  },
  final: { title: 'Make the next change inspectable.', docs: 'Read the docs' },
  footer: { truth: 'Free client · Source not currently public · Public releases and feedback', security: 'Security', privacy: 'Privacy', license: 'License' },
  alt: { impact: 'Autoloom governance impact card in English', trajectory: 'Autoloom trajectory page in English', record: 'Autoloom governance record in English', result: 'Autoloom real task result in English' },
}

export const homeContent = { zh, en }
