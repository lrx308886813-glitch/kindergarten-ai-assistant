import type {
  ChildProfile,
  DashboardStat,
  GenerationOption,
  GenerationType,
  RecentGeneration,
} from "@/lib/types";

export const childProfiles: ChildProfile[] = [
  {
    id: "c-001",
    name: "安安",
    gender: "女",
    age: 4,
    className: "小二班",
    status: "适应稳定",
    tags: ["语言表达", "同伴互动"],
    recentObservation: "区域活动时主动邀请同伴搭建积木，并能说明自己的想法。",
    parentContact: "安安妈妈",
    updatedAt: "2026-05-01",
  },
  {
    id: "c-002",
    name: "乐乐",
    gender: "男",
    age: 5,
    className: "中一班",
    status: "需要关注",
    tags: ["情绪调节", "午睡"],
    recentObservation: "午睡前需要教师陪伴，听到熟悉的故事后能逐步安静下来。",
    parentContact: "乐乐爸爸",
    updatedAt: "2026-04-30",
  },
  {
    id: "c-003",
    name: "朵朵",
    gender: "女",
    age: 6,
    className: "大三班",
    status: "表现积极",
    tags: ["美术创作", "任务坚持"],
    recentObservation: "完成春天主题画时能持续观察花瓣细节，并主动补充背景。",
    parentContact: "朵朵妈妈",
    updatedAt: "2026-04-29",
  },
  {
    id: "c-004",
    name: "小宇",
    gender: "男",
    age: 4,
    className: "小一班",
    status: "逐步适应",
    tags: ["生活自理", "规则意识"],
    recentObservation: "洗手环节能按步骤完成，但排队时仍需要教师轻声提醒。",
    parentContact: "小宇奶奶",
    updatedAt: "2026-04-28",
  },
];

export const generationOptions: GenerationOption[] = [
  {
    value: "dailyObservation",
    label: "每日观察记录",
    description: "面向班级日常记录，突出行为、情绪和支持策略。",
  },
  {
    value: "parentMessage",
    label: "家长沟通文案",
    description: "语气温和，适合发送给家长的简短反馈。",
  },
  {
    value: "growthPortfolio",
    label: "成长档案",
    description: "整理为阶段性成长记录，便于归档。",
  },
  {
    value: "activitySummary",
    label: "主题活动总结",
    description: "提炼活动目标、过程表现和后续延伸。",
  },
  {
    value: "lessonDraft",
    label: "教案初稿",
    description: "生成活动目标、准备、过程和观察要点。",
  },
];

export const dashboardStats: DashboardStat[] = [
  {
    label: "幼儿档案",
    value: "4",
    helper: "mock 档案总数",
    tone: "teal",
  },
  {
    label: "今日生成",
    value: "7",
    helper: "前端模拟记录",
    tone: "amber",
  },
  {
    label: "待关注",
    value: "1",
    helper: "需要持续观察",
    tone: "rose",
  },
  {
    label: "可用模板",
    value: "5",
    helper: "生成类型数量",
    tone: "slate",
  },
];

export const recentGenerations: RecentGeneration[] = [
  {
    id: "g-001",
    type: "家长沟通文案",
    childName: "乐乐",
    createdAt: "今天 09:42",
    summary: "围绕午睡适应和情绪安抚生成家园沟通内容。",
  },
  {
    id: "g-002",
    type: "每日观察记录",
    childName: "安安",
    createdAt: "今天 08:20",
    summary: "记录区域游戏中的主动表达和合作行为。",
  },
  {
    id: "g-003",
    type: "主题活动总结",
    childName: "朵朵",
    createdAt: "昨天 16:18",
    summary: "整理春天主题美术活动中的观察亮点。",
  },
];

export function getGenerationLabel(type: GenerationType) {
  return generationOptions.find((option) => option.value === type)?.label ?? "";
}

export function generateMockResult(
  type: GenerationType,
  observation: string,
  childName: string
) {
  const child = childName || "幼儿";
  const detail = observation.trim();

  const templates: Record<GenerationType, string> = {
    dailyObservation: `【每日观察记录】\n观察对象：${child}\n观察内容：${detail}\n\n行为表现：${child}在活动中展现出真实、具体的行为线索，能够在教师支持下参与当前环节。\n\n教师分析：该表现反映出${child}在情绪状态、同伴互动或任务投入方面的阶段性特点，后续可继续结合一日生活进行观察。\n\n支持建议：教师可提供明确提示、温和回应和可选择的任务材料，帮助${child}稳定参与并积累成功经验。`,
    parentMessage: `亲爱的家长，您好：\n\n今天我们观察到${child}：${detail}\n\n整体来看，孩子在园状态真实自然，也在尝试用自己的方式参与活动。我们会继续给予稳定陪伴和积极引导。家庭中可以用轻松的方式和孩子聊聊今天的活动，鼓励孩子表达自己的感受。\n\n如有新的情况，我们会及时和您沟通。`,
    growthPortfolio: `【成长档案记录】\n幼儿：${child}\n记录要点：${detail}\n\n成长亮点：${child}在近期活动中呈现出值得记录的进步，能够在熟悉情境中表达想法、尝试合作或坚持完成任务。\n\n发展解读：该表现说明孩子正在积累自我管理、语言表达和社会交往经验。\n\n后续支持：继续通过游戏、生活环节和小组活动提供练习机会，鼓励孩子在稳定关系中展示更多主动性。`,
    activitySummary: `【主题活动总结】\n主题表现：${detail}\n\n活动成效：孩子们在活动中通过观察、表达和操作加深了对主题内容的体验。${child}的表现为后续观察提供了具体线索。\n\n教师反思：活动材料和提问方式能够支持幼儿参与，但仍需关注不同孩子的节奏差异。\n\n延伸方向：可在区域活动中继续投放相关材料，引导幼儿用绘画、建构或讲述延续经验。`,
    lessonDraft: `【教案初稿】\n活动名称：基于观察的延伸活动\n适用对象：幼儿园班级活动\n\n一、活动目标\n1. 鼓励幼儿围绕已有经验进行表达。\n2. 支持幼儿在操作和互动中发展观察能力。\n3. 引导幼儿学习倾听同伴并尝试合作。\n\n二、活动准备\n相关操作材料、记录纸、展示区域。\n\n三、活动过程\n1. 导入：教师根据观察内容引出话题：${detail}\n2. 探索：幼儿自主操作，教师巡回观察并记录语言和行为。\n3. 分享：邀请幼儿讲述发现，教师进行积极回应。\n4. 延伸：将材料投放到区域中，支持持续探索。\n\n四、观察重点\n关注${child}的参与意愿、表达方式、情绪状态和同伴互动。`,
  };

  return templates[type];
}
