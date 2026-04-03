const questions = [
  {
    dimension: "目标定义",
    title: "你在给 AI 提需求时，通常做到什么程度？",
    options: [
      { score: 1, text: "想到什么说什么，没有明确目标。" },
      { score: 2, text: "会说大概目标，但缺少结果标准。" },
      { score: 3, text: "目标较清晰，偶尔补充验收条件。" },
      { score: 4, text: "目标清晰，能描述交付格式和验收点。" },
      { score: 5, text: "目标、边界、验收标准完整且可执行。" },
    ],
  },
  {
    dimension: "目标定义",
    title: "当结果不符合预期时，你会怎么做？",
    options: [
      { score: 1, text: "直接重试，几乎不改需求。" },
      { score: 2, text: "只改一两句话，再试一次。" },
      { score: 3, text: "会指出问题点并让 AI 修改。" },
      { score: 4, text: "会拆分问题并逐步修正。" },
      { score: 5, text: "会反推目标定义并优化验收规则后再执行。" },
    ],
  },
  {
    dimension: "提示词与任务结构化",
    title: "你组织提示词的习惯更接近哪种？",
    options: [
      { score: 1, text: "一句话描述，结构随意。" },
      { score: 2, text: "有时列几点要求，但不固定。" },
      { score: 3, text: "会写背景、目标、约束三部分。" },
      { score: 4, text: "会固定模板（角色/任务/输入/输出/约束）。" },
      { score: 5, text: "会针对场景维护多套模板并持续迭代。" },
    ],
  },
  {
    dimension: "提示词与任务结构化",
    title: "你对输出格式的控制能力如何？",
    options: [
      { score: 1, text: "很少指定输出格式。" },
      { score: 2, text: "偶尔要求列表或表格。" },
      { score: 3, text: "常要求固定字段或格式。" },
      { score: 4, text: "可稳定要求 JSON/表格/文档结构。" },
      { score: 5, text: "可设计机器可读格式并用于后续自动化。" },
    ],
  },
  {
    dimension: "工作流设计",
    title: "你是否会把复杂任务拆成多步骤执行？",
    options: [
      { score: 1, text: "基本不会，通常一次性让 AI 完成。" },
      { score: 2, text: "会简单分两步，但不稳定。" },
      { score: 3, text: "能拆分为采集、处理、输出等阶段。" },
      { score: 4, text: "会设计固定流程并按阶段验收。" },
      { score: 5, text: "会设计多角色协作流程并定义交接规则。" },
    ],
  },
  {
    dimension: "工作流设计",
    title: "你对“上下文复用/记忆沉淀”有什么实践？",
    options: [
      { score: 1, text: "没有复用，都是临时对话。" },
      { score: 2, text: "会保存一些提示词文本。" },
      { score: 3, text: "有基础模板，可重复使用。" },
      { score: 4, text: "会维护规则库并跨任务复用。" },
      { score: 5, text: "有外置记忆系统并用于稳定执行标准。" },
    ],
  },
  {
    dimension: "评审与迭代",
    title: "你如何判断“这版可以交付”？",
    options: [
      { score: 1, text: "主观感觉差不多就行。" },
      { score: 2, text: "看起来不错就通过。" },
      { score: 3, text: "会对照几条检查项。" },
      { score: 4, text: "有明确的通过/不通过规则。" },
      { score: 5, text: "有量化评分和拦截机制，不达标不交付。" },
    ],
  },
  {
    dimension: "评审与迭代",
    title: "遇到多轮返工时，你通常怎么处理？",
    options: [
      { score: 1, text: "容易放弃或频繁改方向。" },
      { score: 2, text: "继续重试，但缺少复盘。" },
      { score: 3, text: "会记录问题点并逐步修复。" },
      { score: 4, text: "会总结规律并更新模板。" },
      { score: 5, text: "会形成审查闭环，直到全部通过。" },
    ],
  },
  {
    dimension: "系统化沉淀",
    title: "你是否将经验沉淀成可复用资产？",
    options: [
      { score: 1, text: "基本没有沉淀。" },
      { score: 2, text: "有零散笔记。" },
      { score: 3, text: "有固定模板和常用清单。" },
      { score: 4, text: "模板+规则+示例都在持续更新。" },
      { score: 5, text: "已形成 SOP，可规模化迁移到新任务。" },
    ],
  },
  {
    dimension: "系统化沉淀",
    title: "你对 AI 的使用目标更偏向哪种？",
    options: [
      { score: 1, text: "临时提效，想到就用。" },
      { score: 2, text: "解决局部问题。" },
      { score: 3, text: "稳定支持日常工作。" },
      { score: 4, text: "成为工作流核心工具之一。" },
      { score: 5, text: "把 AI 打造成可持续增长的生产系统。" },
    ],
  },
];

const levelRules = [
  { min: 10, max: 18, name: "初级", desc: "你已经开始使用 AI，但目前偏向临时调用。建议先建立固定提问模板。" },
  { min: 19, max: 26, name: "初中级", desc: "你有基本提问能力，下一步是把需求结构化并固定验收标准。" },
  { min: 27, max: 34, name: "中级", desc: "你已具备稳定输出能力。建议强化流程拆解与复盘机制。" },
  { min: 35, max: 42, name: "中高级", desc: "你在流程和质量控制上表现成熟，继续推进自动化与量化评审即可进阶。" },
  { min: 43, max: 50, name: "高级", desc: "你已具备系统化 AI 能力，能够将经验沉淀为可复制的高质量生产流程。" },
];

const suggestionMap = {
  初级: ["先固定一个提问模板：目标、输入、输出、约束。", "每次输出后写 3 条问题点再重试。", "不要一次要求过多任务，先分两步做。"],
  初中级: ["把“通过标准”写清楚（格式、字数、风格、是否可执行）。", "建立一个常用提示词库。", "开始记录每次失败原因并复盘。"],
  中级: ["把任务拆成固定阶段并逐段验收。", "增加质量检查清单，避免凭感觉交付。", "将高频任务模板化，降低返工率。"],
  中高级: ["将评审项量化（如字号、留白、是否越界等）。", "建立“不过不发”的双审核闭环。", "把规则库接入记忆系统，确保跨线程一致执行。"],
  高级: ["构建自动评分与自动拦截机制。", "按业务线沉淀可迁移 SOP。", "持续优化成本、速度与质量三者平衡。"],
};

const dimensionKeys = ["目标定义", "提示词与任务结构化", "工作流设计", "评审与迭代", "系统化沉淀"];

const state = {
  current: 0,
  answers: Array(questions.length).fill(null),
};

const introCard = document.getElementById("introCard");
const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const startBtn = document.getElementById("startBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const questionTitle = document.getElementById("questionTitle");
const dimension = document.getElementById("dimension");
const optionsWrap = document.getElementById("options");
const progress = document.getElementById("progress");
const totalScore = document.getElementById("totalScore");
const levelName = document.getElementById("levelName");
const levelDesc = document.getElementById("levelDesc");
const dimensionScores = document.getElementById("dimensionScores");
const suggestions = document.getElementById("suggestions");

function renderQuestion() {
  const q = questions[state.current];
  questionTitle.textContent = q.title;
  dimension.textContent = `维度：${q.dimension}`;
  progress.textContent = `${state.current + 1} / ${questions.length}`;
  optionsWrap.innerHTML = "";

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = `${index + 1}. ${opt.text}`;
    if (state.answers[state.current] === opt.score) {
      btn.classList.add("active");
    }
    btn.addEventListener("click", () => {
      state.answers[state.current] = opt.score;
      renderQuestion();
    });
    optionsWrap.appendChild(btn);
  });

  prevBtn.disabled = state.current === 0;
  nextBtn.textContent = state.current === questions.length - 1 ? "查看结果" : "下一题";
}

function calcResult() {
  const sum = state.answers.reduce((acc, v) => acc + (v || 0), 0);
  const level = levelRules.find((item) => sum >= item.min && sum <= item.max) || levelRules[0];
  const dimMap = new Map(dimensionKeys.map((key) => [key, 0]));

  questions.forEach((q, idx) => {
    dimMap.set(q.dimension, dimMap.get(q.dimension) + (state.answers[idx] || 0));
  });

  return { sum, level, dimMap };
}

function renderResult() {
  const { sum, level, dimMap } = calcResult();
  totalScore.textContent = String(sum);
  levelName.textContent = level.name;
  levelDesc.textContent = level.desc;

  dimensionScores.innerHTML = "";
  [...dimMap.entries()].forEach(([key, value]) => {
    const li = document.createElement("li");
    li.textContent = `${key}：${value} / 10`;
    dimensionScores.appendChild(li);
  });

  suggestions.innerHTML = "";
  (suggestionMap[level.name] || []).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    suggestions.appendChild(li);
  });
}

function showQuiz() {
  introCard.classList.add("hidden");
  resultCard.classList.add("hidden");
  quizCard.classList.remove("hidden");
  renderQuestion();
}

function showResult() {
  quizCard.classList.add("hidden");
  resultCard.classList.remove("hidden");
  renderResult();
}

startBtn.addEventListener("click", showQuiz);

prevBtn.addEventListener("click", () => {
  if (state.current > 0) {
    state.current -= 1;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  if (state.answers[state.current] === null) {
    alert("请先选择一个选项。");
    return;
  }
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
    return;
  }
  showResult();
});

restartBtn.addEventListener("click", () => {
  state.current = 0;
  state.answers = Array(questions.length).fill(null);
  resultCard.classList.add("hidden");
  introCard.classList.remove("hidden");
});
