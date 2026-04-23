export type LayerId =
  | "demand"
  | "model"
  | "silicon"
  | "network"
  | "packaging"
  | "systems"
  | "power";

export type NodeMetric = {
  label: string;
  value: string;
};

export type MapNode = {
  id: string;
  title: string;
  short: string;
  layer: LayerId;
  x: number;
  y: number;
  description: string;
  valueCapture: string;
  upstream: string[];
  downstream: string[];
  watchpoints: string[];
  companies: string[];
  metrics: NodeMetric[];
};

export type MapEdge = {
  from: string;
  to: string;
  label: string;
  type: "demand" | "bottleneck" | "capex" | "substitute" | "pricing";
  strength: "high" | "medium" | "low";
};

export const layers: { id: LayerId; title: string; subtitle: string }[] = [
  { id: "demand", title: "下游需求", subtitle: "谁在付钱，谁在拉动扩容" },
  { id: "model", title: "模型与平台", subtitle: "价值如何从模型流向平台与 API" },
  { id: "silicon", title: "芯片与内存", subtitle: "GPU、ASIC、HBM、CPU 主机复合体" },
  { id: "network", title: "互联与扩展", subtitle: "交换机、光模块、AEC、机柜级 IO" },
  { id: "packaging", title: "制造与封装测试", subtitle: "Foundry、CoWoS、OSAT、检测" },
  { id: "systems", title: "服务器与机房", subtitle: "整机、液冷、电源、配电" },
  { id: "power", title: "电力与能源", subtitle: "电网、燃气、核电、长期 PPA" },
];

export const nodes: MapNode[] = [
  {
    id: "consumer-apps",
    title: "消费级 AI 应用",
    short: "应用",
    layer: "demand",
    x: 120,
    y: 96,
    description: "Chatbot、搜索、创作和个人助理，是用户最直观感受到的 AI 入口。",
    valueCapture: "如果产品层能形成分发优势和黏性，价值会停留在应用层；否则利润会被模型与基础设施吸走。",
    upstream: ["基础模型", "云 API", "推理编排"],
    downstream: ["订阅收入", "广告变现", "Agent 工作流"],
    watchpoints: ["MAU/DAU 与留存", "ARPU 与广告加载率", "单位 token 收入是否下滑"],
    companies: ["OpenAI", "Meta", "Google", "Perplexity"],
    metrics: [
      { label: "关键问题", value: "用户时间份额" },
      { label: "价值锚点", value: "分发与品牌" },
    ],
  },
  {
    id: "enterprise-agents",
    title: "企业 Agent 与 Copilot",
    short: "企业",
    layer: "demand",
    x: 420,
    y: 96,
    description: "企业预算是更持久的需求源，决定推理负载能否从 demo 走向长期合同。",
    valueCapture: "价值更可能由工作流嵌入最深的平台、SaaS 或集成商获取，而不是单一模型厂商。",
    upstream: ["基础模型", "向量数据库", "工作流编排", "安全与权限"],
    downstream: ["SaaS 重定价", "席位扩张", "自动化外包"],
    watchpoints: ["付费席位增长", "seat 到 usage 的计费转变", "企业部署从试点走向全员"],
    companies: ["Microsoft", "Salesforce", "ServiceNow", "Palantir"],
    metrics: [
      { label: "关键问题", value: "ROI 是否可量化" },
      { label: "价值锚点", value: "嵌入现有流程" },
    ],
  },
  {
    id: "foundation-models",
    title: "基础模型",
    short: "模型",
    layer: "model",
    x: 210,
    y: 250,
    description: "模型层决定能力上限，但如果模型持续商品化，超额利润会下移到平台、分发或上移到稀缺硬件。",
    valueCapture: "能力领先时可收取溢价；一旦差距缩小，价格战会压缩利润。",
    upstream: ["GPU/ASIC", "训练数据", "模型工程工具"],
    downstream: ["应用层", "云 API", "企业 Agent"],
    watchpoints: ["模型能力差距", "单位 token 价格", "开源替代速度"],
    companies: ["OpenAI", "Anthropic", "Google DeepMind", "xAI"],
    metrics: [
      { label: "关键问题", value: "差异化能维持多久" },
      { label: "价值锚点", value: "领先能力与品牌" },
    ],
  },
  {
    id: "ai-cloud",
    title: "AI 云与推理平台",
    short: "平台",
    layer: "model",
    x: 540,
    y: 250,
    description: "把模型、算力、开发框架和计费系统打包出售，是把技术能力转化为可复用收入的关键层。",
    valueCapture: "平台层如果同时掌握客户关系和算力调度，通常比单纯模型层更容易留下利润。",
    upstream: ["基础模型", "GPU/ASIC", "网络与服务器"],
    downstream: ["企业 Agent", "消费级 AI 应用"],
    watchpoints: ["推理毛利率", "GPU 利用率", "开发者留存"],
    companies: ["Amazon", "Microsoft", "Google", "CoreWeave"],
    metrics: [
      { label: "关键问题", value: "利用率与议价权" },
      { label: "价值锚点", value: "客户关系与调度能力" },
    ],
  },
  {
    id: "accelerators",
    title: "GPU / 定制 ASIC",
    short: "加速器",
    layer: "silicon",
    x: 120,
    y: 420,
    description: "当前价值最集中的节点之一。训练和推理都围绕加速器效率、软件栈和 TCO 展开。",
    valueCapture: "当性能领先叠加软件生态领先时，价值高度集中；若 ASIC 成熟，价值会部分外溢。",
    upstream: ["HBM", "先进制程", "先进封装", "供电与散热"],
    downstream: ["模型训练", "推理平台", "服务器整机"],
    watchpoints: ["TCO per token", "CUDA/软件生态粘性", "ASIC 替代进度"],
    companies: ["NVIDIA", "AMD", "Broadcom", "Marvell"],
    metrics: [
      { label: "关键问题", value: "性能/TCO 曲线" },
      { label: "价值锚点", value: "软件生态 + 供给稀缺" },
    ],
  },
  {
    id: "hbm-memory",
    title: "HBM 与高性能内存",
    short: "HBM",
    layer: "silicon",
    x: 390,
    y: 420,
    description: "HBM 是 AI 芯片性能兑现的核心瓶颈之一，决定每一代 GPU/ASIC 的上限和出货节奏。",
    valueCapture: "当供给少、验证慢、良率受限时，HBM 厂商和相关测试环节拥有超额议价权。",
    upstream: ["DRAM 制造", "封装测试", "设备与检测"],
    downstream: ["GPU/ASIC", "服务器 BOM", "推理成本"],
    watchpoints: ["堆层升级", "验证节奏", "供需缺口"],
    companies: ["SK Hynix", "Micron", "Samsung"],
    metrics: [
      { label: "关键问题", value: "供给缺口持续时间" },
      { label: "价值锚点", value: "验证门槛与良率" },
    ],
  },
  {
    id: "cpu-host",
    title: "CPU / Host Complex",
    short: "CPU",
    layer: "silicon",
    x: 660,
    y: 420,
    description: "Agent 和复杂推理把 CPU、内存层级、PCIe/CXL 重新推回瓶颈位置，不再只是配角。",
    valueCapture: "如果工作负载转向多步骤编排和数据搬运，CPU 与 IO 价值会抬升。",
    upstream: ["先进制程", "主板与互联", "服务器设计"],
    downstream: ["推理平台", "机柜级系统"],
    watchpoints: ["CPU 占比回升", "PCIe/CXL 升级", "复杂 Agent 负载"],
    companies: ["Intel", "AMD", "Astera Labs"],
    metrics: [
      { label: "关键问题", value: "Agent 是否抬升主机占比" },
      { label: "价值锚点", value: "IO 与调度复杂度" },
    ],
  },
  {
    id: "switch-fabric",
    title: "交换机与 Scale-Out Fabric",
    short: "交换机",
    layer: "network",
    x: 170,
    y: 585,
    description: "大集群时代不是单卡性能，而是整网吞吐与延迟决定模型训练和推理的有效效率。",
    valueCapture: "网络标准和交换芯片如果形成锁定，价值会从单卡进一步迁移到整机柜和整集群架构。",
    upstream: ["交换 ASIC", "光学引擎", "连接器"],
    downstream: ["集群效率", "推理延迟", "机柜级设计"],
    watchpoints: ["集群规模扩大", "以太网/InfiniBand 竞争", "拥塞与利用率"],
    companies: ["NVIDIA", "Broadcom", "Arista"],
    metrics: [
      { label: "关键问题", value: "集群扩展效率" },
      { label: "价值锚点", value: "标准与系统锁定" },
    ],
  },
  {
    id: "optical",
    title: "光模块 / AEC / CPO",
    short: "光互联",
    layer: "network",
    x: 510,
    y: 585,
    description: "随着带宽需求激增，价值从 pluggable optics 逐步向更深的光电集成和机柜级互联迁移。",
    valueCapture: "过渡期 AEC、DSP、光模块都会受益；若 CPO 真正放量，价值会重排。",
    upstream: ["激光器", "硅光", "封装工艺", "连接器"],
    downstream: ["交换机", "机柜系统", "集群功耗"],
    watchpoints: ["800G/1.6T 渗透", "CPO 商业化节奏", "功耗收益是否兑现"],
    companies: ["Credo", "Coherent", "Lumentum", "Broadcom"],
    metrics: [
      { label: "关键问题", value: "CPO 是否真放量" },
      { label: "价值锚点", value: "带宽瓶颈与能耗改善" },
    ],
  },
  {
    id: "foundry-packaging",
    title: "先进制程 / CoWoS / OSAT",
    short: "Foundry",
    layer: "packaging",
    x: 240,
    y: 760,
    description: "真正的物理上限常常出现在这里。先进制程和先进封装的可用产能决定谁能出货、何时出货。",
    valueCapture: "只要供给持续偏紧，价值就会停留在最稀缺的制造环节，而不是设计公司想象中的全部利润。",
    upstream: ["EUV/WFE", "材料", "封装设备"],
    downstream: ["GPU/ASIC", "HBM 集成", "服务器交付"],
    watchpoints: ["CoWoS 扩产", "N3/N2 产能紧张度", "OSAT 验证速度"],
    companies: ["TSMC", "ASE", "Amkor", "BESI"],
    metrics: [
      { label: "关键问题", value: "谁卡产能" },
      { label: "价值锚点", value: "稀缺产能与认证周期" },
    ],
  },
  {
    id: "inspection-test",
    title: "检测 / 测试 / 量测",
    short: "测试",
    layer: "packaging",
    x: 570,
    y: 760,
    description: "HBM、先进封装和高复杂度 AI 芯片把测试和检测从配套环节推成了关键路径。",
    valueCapture: "每一代堆层提升、封装复杂度提升，测试时长和必要性都在上升，价值弹性很高。",
    upstream: ["HBM", "封装", "量测设备"],
    downstream: ["良率释放", "交付节奏", "资本开支传导"],
    watchpoints: ["KGSD 测试时长", "HBM 代际更替", "检测瓶颈"],
    companies: ["Advantest", "Teradyne", "Onto Innovation"],
    metrics: [
      { label: "关键问题", value: "测试时长是否持续翻倍" },
      { label: "价值锚点", value: "不可替代的流程位置" },
    ],
  },
  {
    id: "servers",
    title: "AI 服务器 / ODM / 机柜系统",
    short: "服务器",
    layer: "systems",
    x: 180,
    y: 930,
    description: "价值开始从单板卡走向整柜、整列，谁能把加速器、电源、液冷和网络集成得更好，谁就更占优势。",
    valueCapture: "整机厂商通常利润率不如芯片，但在订单爆发阶段会分享 Capex 扩张带来的 beta。",
    upstream: ["GPU/ASIC", "CPU/主板", "交换机", "液冷"],
    downstream: ["云平台", "企业私有部署", "机房建设"],
    watchpoints: ["机柜功率密度", "NVL72/NVL144 等柜级架构", "ODM 订单可见度"],
    companies: ["Supermicro", "Dell", "HPE", "Celestica"],
    metrics: [
      { label: "关键问题", value: "价值从板卡转向整柜" },
      { label: "价值锚点", value: "集成效率与交付能力" },
    ],
  },
  {
    id: "cooling-power",
    title: "液冷 / UPS / 配电",
    short: "冷却电源",
    layer: "systems",
    x: 510,
    y: 930,
    description: "AI 集群的功率密度持续抬升，散热与供电从后台配角变成前台瓶颈。",
    valueCapture: "如果 GPU 性能继续上行，液冷和配电会从配套预算成长为战略 Capex 项目。",
    upstream: ["压缩机与冷却系统", "电气设备", "机房设计"],
    downstream: ["机柜上架速度", "PUE", "长期扩容能力"],
    watchpoints: ["单柜功率密度", "液冷渗透率", "PUE 改善"],
    companies: ["Vertiv", "Eaton", "Schneider Electric"],
    metrics: [
      { label: "关键问题", value: "功率密度能否继续爬升" },
      { label: "价值锚点", value: "硬约束下的必需支出" },
    ],
  },
  {
    id: "grid-power",
    title: "电网 / 长协电力 / 发电资产",
    short: "电力",
    layer: "power",
    x: 330,
    y: 1100,
    description: "当数据中心从百兆瓦走向吉瓦级别，真正的终极瓶颈常常不是芯片，而是能否拿到电。",
    valueCapture: "如果电力变成建设速度的约束，价值会进一步迁移到电网接入、长期 PPA 和发电资产。",
    upstream: ["电网审批", "天然气", "核电", "输配电"],
    downstream: ["数据中心选址", "机房利用率", "云平台扩容"],
    watchpoints: ["并网周期", "PPA 价格", "核电/燃气/储能配比"],
    companies: ["Talen Energy", "Constellation Energy", "Vistra", "Oklo"],
    metrics: [
      { label: "关键问题", value: "拿电速度" },
      { label: "价值锚点", value: "稀缺电力与选址权" },
    ],
  },
];

export const edges: MapEdge[] = [
  { from: "consumer-apps", to: "foundation-models", label: "能力需求", type: "demand", strength: "medium" },
  { from: "enterprise-agents", to: "ai-cloud", label: "企业预算", type: "demand", strength: "high" },
  { from: "foundation-models", to: "accelerators", label: "训练需求", type: "demand", strength: "high" },
  { from: "ai-cloud", to: "accelerators", label: "推理扩容", type: "capex", strength: "high" },
  { from: "ai-cloud", to: "switch-fabric", label: "集群扩展", type: "capex", strength: "high" },
  { from: "enterprise-agents", to: "cpu-host", label: "复杂编排", type: "demand", strength: "medium" },
  { from: "accelerators", to: "hbm-memory", label: "内存瓶颈", type: "bottleneck", strength: "high" },
  { from: "accelerators", to: "foundry-packaging", label: "产能依赖", type: "bottleneck", strength: "high" },
  { from: "accelerators", to: "servers", label: "整机集成", type: "capex", strength: "medium" },
  { from: "cpu-host", to: "servers", label: "主机复合体", type: "capex", strength: "medium" },
  { from: "hbm-memory", to: "inspection-test", label: "测试时长", type: "bottleneck", strength: "medium" },
  { from: "switch-fabric", to: "optical", label: "带宽升级", type: "pricing", strength: "high" },
  { from: "optical", to: "servers", label: "机柜互联", type: "capex", strength: "medium" },
  { from: "foundry-packaging", to: "inspection-test", label: "良率释放", type: "bottleneck", strength: "medium" },
  { from: "foundry-packaging", to: "accelerators", label: "供给约束", type: "pricing", strength: "high" },
  { from: "servers", to: "cooling-power", label: "功率密度", type: "bottleneck", strength: "high" },
  { from: "cooling-power", to: "grid-power", label: "电力接入", type: "bottleneck", strength: "high" },
  { from: "grid-power", to: "ai-cloud", label: "站点扩容上限", type: "pricing", strength: "medium" },
  { from: "optical", to: "switch-fabric", label: "CPO 替代路径", type: "substitute", strength: "low" },
];

export const layerColors: Record<LayerId, string> = {
  demand: "#f97316",
  model: "#ef4444",
  silicon: "#2563eb",
  network: "#0f766e",
  packaging: "#7c3aed",
  systems: "#4f46e5",
  power: "#65a30d",
};
