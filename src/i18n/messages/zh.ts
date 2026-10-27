// Chinese UI and engine strings — the reference catalog.
// en.ts is typed against this object, so every key added here must be added there too.

const STAT_LABEL = {
  funding: '资金',
  reputation: '声望',
  energy: '精力',
  energyDepletedCount: '精力耗尽次数',
  favor: '好感',
  happiness: '心情',
  projectProgress: '项目进度',
  theory: '理论',
  engineering: '工程',
  social: '社交',
};

export const zh = {
  stat: STAT_LABEL,

  // Funding is stored in 万元; Chinese shows the raw number with 万.
  money: (amount: number) => `${amount}万`,
  /** Compact form for the status bar, where Chinese shows the bare number. */
  moneyShort: (amount: number) => String(amount),
  /** Delta shown on stat-change pills ("+5" — Chinese pills never carried the unit). */
  moneyDelta: (delta: number) => (delta >= 0 ? `+${delta}` : `${delta}`),

  time: {
    full: (year: number, month: number) => `第 ${year} 年 ${month} 月`,
    compact: (year: number, month: number) => `第${year}年${month}月`,
    log: (year: number, month: number) => `第${year}年 ${month}月`,
    /** Status bar on narrow screens. */
    short: (year: number, month: number) => `第 ${year} 年 ${month} 月`,
  },

  list: (items: string[]) => items.join('、'),

  app: {
    title: '实验室模拟器',
    start: '开始游戏',
    continue: '继续',
    chooseFirst: '请先做出选择',
    fontSmaller: '缩小字体',
    fontLarger: '放大字体',
    gallery: '图鉴',
    openGallery: '打开图鉴',
    reset: '重置游戏',
    resetConfirm: '确定要重置游戏吗？当前进度将被清除，且无法恢复。',
    resetConfirmLabel: '重置',
    cancel: '取消',
    audioSettings: '音频设置',
    mute: '静音',
    unmute: '取消静音',
    bgm: 'BGM',
    sfx: '音效',
    switchLanguage: 'English',
    switchLanguageTitle: '切换语言 / Switch language',
  },

  status: {
    phaseWon: '毕业了',
    phaseOver: '结束了',
    projects: '项目',
    openProjects: '查看项目',
    closeProjects: '关闭项目面板',
    members: '成员',
    showMembers: '查看成员',
    hideMembers: '隐藏成员',
    // Stat chip labels on narrow screens (Chinese labels are already short).
    shortLabel: { funding: '资金', reputation: '声望', energy: '精力' },
    reputationDesc: [
      'Google搜你，前几条结果还不是你',
      '有几篇引用，大多是自引',
      '圈内有人偶尔听说过你',
      '同方向小有名气',
      '顶会常客，圈内大佬',
      '学术大牛，门生满天下',
    ],
  },

  intro: {
    welcome: '欢迎来到奇妙实验室模拟器！',
    premise: '你是一名刚刚入职计算机系的助理教授，拥有一间空实验室、一笔启动经费，以及一个没人知道会变成什么样的未来。',
    featuresHeading: '在接下来的六年里，你将有机会：',
    features: [
      '招募卷王、天才、摸鱼怪和未来创业家',
      '见证学生毕业、跑路、延毕或一夜成名',
      '申请经费、回复 Reviewer、拯救服务器',
      '调查到底是谁偷偷占满了全部 GPU',
    ],
    closingLead: '无论如何，',
    closingMain: '请努力活到 Tenure。',
    closingTail: '祝你好运！',
    feedback: '反馈',
    feedbackTitle: '感谢你玩这个游戏',
    feedbackBody: '如果你愿意，可以花两分钟填写一份简短的反馈问卷，帮助我们改进游戏。',
    feedbackGo: '去填写',
    feedbackLater: '下次再说',
  },

  log: {
    choice: '选择：',
  },

  event: {
    closeForNow: '暂时关闭',
    requiresServer: '🔒 需先购买服务器',
  },

  ending: {
    badgeWon: '六年结束',
    badgeOver: '游戏结束',
    reputation: (n: number) => `声望 ${n}`,
    funding: (money: string) => `资金 ${money}`,
    ideas: (n: number) => `灵感 ${n}`,
    started: (n: number) => `立项 ${n}`,
    completed: (n: number) => `完成 ${n}`,
    students: '学生',
    newGame: '重新开始',
  },

  studentStatus: {
    graduated: '已毕业',
    left: '已离组',
    active: '在读',
  },

  trait: {
    aria: (name: string) => `天赋：${name}`,
    effectLabel: '天赋效果',
  },

  achievement: {
    unlocked: '解锁成就：',
  },

  admission: {
    portraitAlt: (name: string) => `${name} 立绘`,
    admittedTitle: '已录取一名新生',
    askSecond: '是否继续招募本年度第二名学生？',
    noMoreCandidates: '候选人已全部看过，无法再招募第二名。',
    notEnoughFunding: (money: string) => `资金不足（需${money}）`,
    recruitSecond: '继续招募第二名',
    endAdmissions: '结束本年招生',
    seasonTitle: (year: number) => `第 ${year} 年招生季`,
    roundTitle: (round: number) => `第 ${round} 轮候选`,
    costHint: (money: string) => `录取费：${money}/人`,
    prompt: '两份申请材料摆在面前，选一位加入实验室：',
    admit: (name: string) => `录取 ${name}`,
    refreshNoPool: '候选人已不足，无法换批',
    refreshNoEnergy: (n: number) => `精力不足（需${n}点）`,
    refreshHint: (n: number) => `消耗${n}点精力，换一批候选人`,
    refresh: '换一批',
    skipYear: '今年不招了',
  },

  members: {
    title: '实验室成员',
    you: '你',
    anotherLine: '换一句',
    viewDetail: '查看角色详情',
    yearBadge: (year: number) => `博${year}`,
    favorTitle: '好感度',
    favorChip: (n: number) => `好感:${n}`,
    moodChip: (n: number) => `心情:${n}`,
    piBios: [
      '实验室头号保姆',
      '有偿情感支持提供者',
      '背锅侠（兼义务审稿员）',
      '经费的掘墓人',
      '每周计划写论文，每周成功开会',
      '帮学生改论文，顺便改人生',
      '坐拥服务器，身无三篇文',
      '组里唯一读懂审稿意见的人（存疑）',
      '理想状态：学者。实际状态：客服',
      '热爱科研，恐惧填表',
    ],
  },

  detail: {
    close: '关闭',
    yearStatus: (year: number) => `博士 ${year} 年级`,
    favor: '好感',
    mood: '心　情',
    currentProject: '当前项目',
    noCurrentProject: '暂无进行中的项目',
    completedProjects: '已完成项目',
    noCompletedProjects: '暂未完成任何项目',
    graduatedAt: (year: number, month: number) => `毕业于第 ${year} 年 ${month} 月`,
    tagline: (t: string) => `「${t}」`,
  },

  projects: {
    title: '项目管理',
    ideas: '灵感库',
    ideasEmpty: '还没有任何研究灵感。推进剧情事件，说不定会有收获。',
    active: '进行中',
    activeEmpty: '暂无进行中的项目。立项后项目会在这里出现。',
    completed: '已完成',
    gradeAria: (grade: string) => `${grade}级项目`,
    costEnergy: (n: number) => `精力 -${n}`,
    costFunding: (money: string) => `资金 -${money}`,
    costSeparator: '，',
    needEnergy: (n: number) => `精力不足（需 ${n}）`,
    needFunding: (money: string) => `资金不足（需 ${money}）`,
    launch: (cost: string) => `立项（${cost}）`,
    chooseLead: '选择负责人',
    piDisabledTitle: '精力为 0，无法亲自负责项目',
    piSelf: '你（亲自负责）',
    piOutOfEnergy: '精力耗尽，无法接手项目',
    piDetail: (progress: string) => `每月消耗精力 15，效率 ×1.00，月推进 ${progress}%`,
    current: '当前',
    busy: '已有项目',
    studentDetail: (mult: string, progress: string) => `效率 ×${mult}，月推进 ${progress}%`,
    notQualified: '属性不足，无法分配',
    swapFree: (name: string, trait: string) => `${name}的天赋「${trait}」，进度不会回退。`,
    swapPenaltyBefore: '当前进度 ',
    swapPenaltyMiddle: ' 将回退至 ',
    swapPenaltyAfter: '（-30%）。',
    confirm: '确认',
    cancel: '取消',
    leadLabel: '负责人：',
    monthly: (progress: string) => `月推进 ${progress}%`,
    stalled: '⏸ 停滞中',
    collapse: '收起',
    changeLead: '换人',
    assignLead: '分配负责人',
    removeLeadTitle: '解除负责人，项目停滞',
    removeLead: '解除',
    completedMeta: (leader: string, money: string, rep: number) => `负责人：${leader}　奖励：+${money} / 声望+${rep}`,
    unassigned: '未分配',
    pi: 'PI',
  },

  gallery: {
    tabEndings: '结局',
    tabCharacters: '角色',
    tabProjects: '项目',
    tabAchievements: '成就',
    closeAria: '关闭图鉴',
    close: '关闭',
    endingsEmpty: '尚未达成任何结局。',
    endingsEmptyHint: '完成一局游戏后，结局将永久记录在此。',
    endingsStat: (n: number) => ['已达成 ', String(n), ' 个结局'] as const,
    charactersStat: (n: number) => ['已收录 ', String(n), ' 位成员'] as const,
    unknownCharacter: '未知角色',
    unknownName: '？？？',
    unknownPortrait: '？',
    projectsEmpty: '尚未立项任何项目。',
    projectsEmptyHint: '在游戏中立项后，项目将永久记录在此。',
    projectsStat: (started: number, done: number) =>
      ['已立项 ', String(started), ' 个项目，完成 ', String(done), ' 个'] as const,
    completed: '已完成',
    incomplete: '未完成',
    achievementsStat: (n: number, total: number) => ['已解锁 ', String(n), ` / ${total} 个成就`] as const,
    lockedCriteria: '？',
    tabBackup: '备份',
    backupIntro: '图鉴和成就只保存在当前浏览器里。换浏览器、换设备或清理浏览器数据，都可能让记录消失。建议偶尔导出一次存档码，存进备忘录里。',
    exportHeading: '导出存档码',
    exportHint: '这串文字包含你目前全部的图鉴和成就记录。',
    copyCode: '复制存档码',
    copied: '已复制。',
    copyFailed: '无法自动复制，请手动选中上面的文字复制。',
    importHeading: '导入存档码',
    importHint: '导入会和当前记录合并，不会覆盖或删除已有内容。',
    importPlaceholder: '在这里粘贴存档码',
    importButton: '导入',
    importResult: {
      merged: '导入成功，图鉴已更新。',
      unchanged: '存档码里的记录这里都已经有了。',
      invalid: '无法识别这段存档码，请确认复制完整。',
    },
  },

  // Text the engine writes into the story log (rendered in every language at once).
  // Student names passed in are the reference form (nameOf → "Jamie" in English), except
  // admitTitle/admitNarrative, which introduce a new student by full name.
  engine: {
    unknownMonths: '数',
    statFor: (name: string, stat: string) => `${name}·${stat}`,
    everyone: (stat: string) => `全体·${stat}`,
    graduated: (name: string) => `${name}·毕业`,
    left: (name: string) => `${name}·离组`,
    traitGain: (name: string, stat: string) => `${name}天赋·${stat}`,
    traitGainOther: (name: string, target: string, stat: string) => `${name}天赋·${target}${stat}`,
    everyoneMood: '全员心情',
    firstIdeaHint: '💡 点击右上角的"项目"可以查看灵感，并安排学生推进研究项目。',
    summaryTitle: '六年总结',
    admitTitle: (name: string) => `${name} 加入实验室`,
    admitNarrative: (name: string, tagline: string) => `${name}正式入组。${tagline}`,
    firstStudentHint: '💡 点击右上角的"成员"可以随时查看实验室所有成员的状态。',

    monthlyLab: (money: string, rep: number, energy: number) => `资金 ${money} · 声望 ${rep} · 精力 ${energy}。`,
    monthlyMember: (name: string, favor: number, mood: number) => `${name}（好感 ${favor}，心情 ${mood}）`,
    monthlyMembers: (lines: string[]) => `在读成员：${lines.join('；')}。`,
    monthlyProject: (name: string, progress: number, leader: string) => `${name}（${progress}%，${leader}）`,
    monthlyProjects: (lines: string[]) => `进行中项目：${lines.join('；')}。`,
    leaderUnassigned: '待分配',
    leaderYou: '你',
    leaderUnknown: '未知',
    monthlyGraduated: (names: string) => `${names} 已毕业`,

    noFundsTitle: '招生季',
    noFundsNarrative: (money: string) => `九月招生季到来，但实验室账面资金不足${money}，今年无法招募新生了。等经费充裕了再说吧。`,
    memberChangeTitle: '成员动态',
    memberGraduated: (name: string) => `${name} 完成学业，正式毕业。`,
    memberLeft: (name: string) => `${name} 离开了实验室。`,
    memberStalledProjects: (names: string[]) => `进行中项目《${names.join('》《')}》因负责人变动暂停，请重新分配负责人。`,

    piStallTitle: (project: string) => `「${project}」你的精力耗尽`,
    piStallNarrative: (project: string, progress: number) =>
      `你的精力耗尽，「${project}」本月完成推进后，项目负责人自动解除，进度回退至 ${progress}%。请重新分配负责人。`,

    summary: {
      opening: '六年走完了。',
      finalLab: (rep: number, money: string) => `实验室最终状态：声望 ${rep} · 资金余额 ${money}。`,
      graduated: (count: number, names: string) => `已毕业的学生（${count}人）：\n${names}`,
      avgDuration: (years: number) => `平均毕业时长：${years} 年。`,
      avgLong: '将近五年才出去——你的学生是在实验室生根发芽了吗？业界流传"进了这个组，出来就是化石"。',
      avgMedium: '平均多修炼了一年。学生私下管这叫"导师炼丹期"，你本人毫不知情。',
      avgShort: '三年，教科书式的学制。当然，你的头发也做出了相应的贡献。',
      noneGraduated: '这六年里没有学生完成毕业——留下了一些遗憾。',
      activeStudent: (name: string, year: number) => `${name}（在读第${year}年）`,
      active: (count: number, lines: string[]) => `尚在读的学生（${count}人）：\n${lines.join('\n')}`,
      left: (names: string) => `中途离组的学生：${names}。`,
      projects: (started: number, done: number, rate: number) => `项目：立项${started}个，完成${done}个，成果转化率${rate}%。`,
      projectGrade: (grade: string, names: string[]) => `${grade}级（${names.length}）：${names.join('、')}`,
      projectGradesJoin: (parts: string[]) => parts.join('；\n\n') + '。',
      projectsNoneDone: (started: number) => `项目：立项${started}个，暂无完成项目。`,
      closing: '以上是你的六年。',
    },
  },
};

type Widen<T> =
  T extends string ? string
  : T extends readonly string[] ? readonly string[]
  : T extends (...args: infer A) => infer R ? (...args: A) => Widen<R>
  : T extends object ? { [K in keyof T]: Widen<T[K]> }
  : T;

/** Shape every language catalog must match. */
export type Messages = Widen<typeof zh>;
