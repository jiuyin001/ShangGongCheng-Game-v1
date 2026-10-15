/* ===== 默认游戏配置（可在游戏内「编辑」面板修改并持久化） ===== */

const DEFAULT_CONFIG = {
  bins: [
    { id: 'recyclable', name: '可回收物', color: '#3B82F6', desc: '纸张、塑料、金属、玻璃等', mark: 'assets/marks/mark-recyclable-new.jpg' },
    { id: 'kitchen', name: '厨余垃圾', color: '#8B5E3C', desc: '剩菜剩饭、瓜果皮核等', mark: 'assets/marks/mark-wet-new.jpg' },
    { id: 'hazardous', name: '有害垃圾', color: '#E5484D', desc: '电池、药品、灯管等', mark: 'assets/marks/mark-hazardous-new.jpg' },
    { id: 'other', name: '其他垃圾', color: '#3D3A37', desc: '以上三类以外的垃圾', mark: 'assets/marks/mark-dry-new.jpg' }
  ],

  /* R64：物品数据模型（四模式共用同一池 config.items —— 飞行棋/跑酷/小达人/消消乐均从此取图取分类，
     故编辑面板改物品图/分类后四模式自动同步）。
     每个物品可选字段 q = { q, bin }：该物品绑定的专属问题（R64 反馈5/21）。
       - q   题干文字，建议「<物品名>属于哪类垃圾？」
       - bin 正确分类 id（recyclable/kitchen/hazardous/other）；选项由 config.bins 顺序自动生成
       - 缺省（无 q）时运行时随机出题；新增物品同样可带可不带 q。 */
  items: [
    // 可回收物
    { id: 'r-newspaper', name: '旧报纸',   img: 'assets/items/recyclable-0.png', bin: 'recyclable', points: 10, q: { q: '旧报纸属于哪类垃圾？', bin: 'recyclable' } },
    { id: 'r-can',       name: '易拉罐',   img: 'assets/items/recyclable-1.png', bin: 'recyclable', points: 10, q: { q: '易拉罐属于哪类垃圾？', bin: 'recyclable' } },
    { id: 'r-bottle',    name: '塑料瓶',   img: 'assets/items/recyclable-2.png', bin: 'recyclable', points: 10, q: { q: '塑料瓶属于哪类垃圾？', bin: 'recyclable' } },
    { id: 'r-glass',     name: '玻璃瓶',   img: 'assets/items/recyclable-3.png', bin: 'recyclable', points: 10, q: { q: '玻璃瓶属于哪类垃圾？', bin: 'recyclable' } },
    { id: 'r-box',       name: '旧纸箱',   img: 'assets/items/recyclable-4.png', bin: 'recyclable', points: 10, q: { q: '旧纸箱属于哪类垃圾？', bin: 'recyclable' } },
    { id: 'r-clothes',   name: '旧衣服',   img: 'assets/items/recyclable-5.png', bin: 'recyclable', points: 10, q: { q: '旧衣服属于哪类垃圾？', bin: 'recyclable' } },
    // 厨余垃圾
    { id: 'k-banana',    name: '香蕉皮',   img: 'assets/items/kitchen-0.png',     bin: 'kitchen', points: 10, q: { q: '香蕉皮属于哪类垃圾？', bin: 'kitchen' } },
    { id: 'k-apple',     name: '苹果核',   img: 'assets/items/kitchen-1.png',     bin: 'kitchen', points: 10, q: { q: '苹果核属于哪类垃圾？', bin: 'kitchen' } },
    { id: 'k-fishbone',  name: '鱼骨头',   img: 'assets/items/kitchen-2.png',     bin: 'kitchen', points: 10, q: { q: '鱼骨头属于哪类垃圾？', bin: 'kitchen' } },
    { id: 'k-leftover',  name: '剩菜剩饭', img: 'assets/items/kitchen-3.png',     bin: 'kitchen', points: 10, q: { q: '剩菜剩饭属于哪类垃圾？', bin: 'kitchen' } },
    { id: 'k-egg',       name: '鸡蛋壳',   img: 'assets/items/kitchen-4.png',     bin: 'kitchen', points: 10, q: { q: '鸡蛋壳属于哪类垃圾？', bin: 'kitchen' } },
    { id: 'k-leaf',      name: '菜叶',     img: 'assets/items/kitchen-5.png',     bin: 'kitchen', points: 10, q: { q: '菜叶属于哪类垃圾？', bin: 'kitchen' } },
    // 有害垃圾
    { id: 'h-battery',   name: '废电池',   img: 'assets/items/hazardous-0.png',   bin: 'hazardous', points: 10, q: { q: '废电池属于哪类垃圾？', bin: 'hazardous' } },
    { id: 'h-medicine',  name: '过期药品', img: 'assets/items/hazardous-1.png',   bin: 'hazardous', points: 10, q: { q: '过期药品属于哪类垃圾？', bin: 'hazardous' } },
    { id: 'h-lamp',      name: '废灯管',   img: 'assets/items/hazardous-2.png',   bin: 'hazardous', points: 10, q: { q: '废灯管属于哪类垃圾？', bin: 'hazardous' } },
    { id: 'h-paint',     name: '油漆桶',   img: 'assets/items/hazardous-3.png',   bin: 'hazardous', points: 10, q: { q: '油漆桶属于哪类垃圾？', bin: 'hazardous' } },
    { id: 'h-pesticide', name: '杀虫剂',   img: 'assets/items/hazardous-4.png',   bin: 'hazardous', points: 10, q: { q: '杀虫剂属于哪类垃圾？', bin: 'hazardous' } },
    { id: 'h-thermometer', name: '温度计', img: 'assets/items/hazardous-5.png',   bin: 'hazardous', points: 10, q: { q: '水银温度计属于哪类垃圾？', bin: 'hazardous' } },
    // 其他垃圾
    { id: 'o-cig',       name: '烟头',     img: 'assets/items/other-0.png',       bin: 'other', points: 10, q: { q: '烟头属于哪类垃圾？', bin: 'other' } },
    { id: 'o-bone',      name: '大棒骨',   img: 'assets/items/other-1.png',       bin: 'other', points: 10, q: { q: '大棒骨属于哪类垃圾？', bin: 'other' } },
    { id: 'o-ceramic',   name: '陶瓷碎片', img: 'assets/items/other-2.png',       bin: 'other', points: 10, q: { q: '陶瓷碎片属于哪类垃圾？', bin: 'other' } },
    { id: 'o-tissue',    name: '用过的纸巾', img: 'assets/items/other-3.png',     bin: 'other', points: 10, q: { q: '用过的纸巾属于哪类垃圾？', bin: 'other' } },
    { id: 'o-mealbox',   name: '一次性餐盒', img: 'assets/items/other-4.png',     bin: 'other', points: 10, q: { q: '一次性餐盒属于哪类垃圾？', bin: 'other' } },
    { id: 'o-shoe',      name: '旧皮鞋',   img: 'assets/items/other-5.png',       bin: 'other', points: 10, q: { q: '旧皮鞋属于哪类垃圾？', bin: 'other' } }
  ],

  /* 商城：实物商品（兑换即扣分+记录+次数限制）；顶部称号固定为“环保小卫士” */
  /* img 字段：商品图片，可编辑；留空时显示默认图标 */
  mall: [
    { id: 'bag',        type: 'item', name: '环保帆布袋',   desc: '循环利用，买菜装书都行', price: 300,  icon: 'bag',   img: '', maxBuys: 1 },
    { id: 'cup',        type: 'item', name: '保温杯',       desc: '少用一次性杯子',         price: 500,  icon: 'cup',   img: '', maxBuys: 1 },
    { id: 'plant',      type: 'item', name: '桌面绿植',     desc: '让桌面多一抹绿',         price: 260,  icon: 'leaf',  img: '', maxBuys: 2 },
    { id: 'notebook',   type: 'item', name: '环保笔记本',   desc: '再生纸制成，记录好习惯', price: 150,  icon: 'book',  img: '', maxBuys: 5 },
    { id: 'cutlery',    type: 'item', name: '餐具套装',     desc: '自带餐具，少用一次性',   price: 400,  icon: 'fork',  img: '', maxBuys: 1 },
    { id: 'badge',      type: 'item', name: '环保徽章',     desc: '戴上它，做环保小达人',   price: 120,  icon: 'star',  img: '', maxBuys: 5 }
  ],

  settings: {
    roundSize: 8,
    /* R63 新增：小达人（classic）答对得分，整数 1~100 */
    pointsPerCorrect: 10,
    /* R63 新增：小达人单账号局数限制，整数，0=不限制 */
    classicRoundLimit: 0,
    badgeTitle: '环保小卫士',
    heroTitle: '垃圾分一分<br>地球美十分',
    heroSub: '把垃圾拖进正确的桶，答对加分，答错不加分并看答案',
    steps: [
      '拖动垃圾卡片，放到对应颜色的垃圾桶上',
      '答对得 10 分，答错不加分并看正确答案',
      '积分可在商城兑换环保好物'
    ]
  },

  /* 引导形象（小程系列：动作图为设计后的版本，可编辑切换） */
  avatar: {
    name: '橘子头套引导员（点我换话）',
    img: 'assets/avatar/candy/guide-candy-final.png',
    cheer: 'assets/avatar/candy/cheer-candy.png',
    oops: 'assets/avatar/candy/oops-candy.png',
    /* 引导员对话框：开局和游戏内显示，点击引导员切换下一条，可编辑 */
    dialogues: [
      'hi，我是小程，让我们一起探索垃圾是如何分类的吧~',
      '你知道吗？旧报纸、易拉罐、塑料瓶都是可回收垃圾哦！',
      '剩菜剩饭、香蕉皮、鸡蛋壳属于厨余垃圾，可以变废为宝！',
      '废电池、过期药品、废灯管是有害垃圾，一定要单独投放！',
      '大棒骨、烟头、陶瓷碎片是其他垃圾，别投错啦！'
    ]
  },

  /* 加载页底部知识文字：加载条下方显示，点击可切换（管理员可编辑） */
  loadingTips: [
    '可回收垃圾是：旧报纸、易拉罐、塑料瓶等',
    '厨余垃圾是：剩菜剩饭、香蕉皮、鸡蛋壳等',
    '有害垃圾是：废电池、过期药品、废灯管等',
    '其他垃圾是：烟头、大棒骨、陶瓷碎片等',
    '果皮菜叶放厨余，变废为宝再利用！',
    '易拉罐、塑料瓶回收后可以再造成新物品哦！'
  ],

  /* 角落水印：默认不显示（游戏内不带水印），可在编辑面板自行开启 */
  corner: {
    enabled: true,
    img: 'assets/brand/brand-name.jpg',
    text: '上海工程技术大学',
    scale: 1
  },

  /* 顶部标题旁的图标：可编辑替换 */
  titleImg: '',

  /* 分类游戏：答错扣分（可编辑）；答对得分沿用 pointsPerCorrect */
  settingsExtra: {
    wrongDeduct: 5
  },

  /* R63 新增：加载界面配置（可编辑） */
  loading: {
    /* 加载页标题（显示在人和垃圾上方），建议 8~12 字以内，过长会换行 */
    title: '垃圾分类小达人',
    /* 垃圾分类小动画：是否启用 + 套数（至少 3 套，一套约 15s） */
    animation: { enabled: true, setCount: 3 },
    /* 橘子跑酷彩蛋（仿谷歌小恐龙）：是否启用 */
    runnerEgg: { enabled: true }
  },

  /* R63 新增：首页配置（可编辑） */
  home: {
    /* 首页红框三行默认话术（按四玩法重新设计），每行建议 20 字以内 */
    redBoxLines: [
      '分类小达人 · 飞行棋 · 跑酷 · 消消乐，四大玩法等你来战！',
      '答对闯关赢积分，集齐环保徽章兑换好礼',
      '垃圾分类人人参与，地球美十分从你我做起'
    ],
    /* 右侧蓝色 UI 块红字标题，建议 8 字以内 */
    randomTitle: '随机游戏！',
    /* 蓝色 UI 块绿字按钮文案，建议 6 字以内 */
    randomCta: '来一把！',
    /* 「来一把」随机跳转范围，可选 classic/flychess/runner/matches */
    randomModules: ['matches', 'flychess', 'runner', 'classic']
  },

  /* R63 新增：选择项目页红框游戏名（可编辑），建议 10 字以内 */
  moduleNames: {
    classic: '垃圾分类小达人',
    flychess: '垃圾分类飞行棋',
    runner: '垃圾分类跑酷',
    matches: '垃圾消消乐'
  },

  /* R63 新增：选择项目页绿框游戏简介（可编辑），建议 20 字以内 */
  moduleIntros: {
    classic: '拖拽分类，答对加分',
    flychess: '掷骰子答题，冲向终点',
    runner: '边跑边吃，对号入座',
    matches: '同品类相连即可消除'
  },

  /* 垃圾分类飞行棋 */
  flychess: {
    name: '垃圾分类飞行棋',
    /* 排名积分：第1/2/3/4名依次获得（可编辑） */
    rankPoints: [30, 20, 10, 5],
    /* 棋盘格数（蛇形路径，四角放四类标识） */
    cellCount: 28,
    /* R63 新增：单账号游玩次数限制，整数，0=不限制 */
    perAccountLimit: 0,
    /* 题库：每次投骰子后答一题，答对前进，答错原地。
       R64 反馈5：每题新增 itemId —— 指向 config.items 中对应物品，使「格内垃圾图」与「题目」一一对应
       （格=苹果 → 问「苹果核属于哪类垃圾？」）。fcBuildBoard 据此取该物品图渲染格内素材；
       itemId 缺省时回退为按 ans 分类随机取图（兼容旧数据）。牛奶盒无对应物品图，留空回退随机。 */
    questions: [
      { q: '旧报纸属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-newspaper' },
      { q: '易拉罐属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-can' },
      { q: '香蕉皮属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-banana' },
      { q: '废电池属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-battery' },
      { q: '大棒骨属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-bone' },
      { q: '塑料瓶属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-bottle' },
      { q: '剩菜剩饭属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-leftover' },
      { q: '过期药品属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-medicine' },
      { q: '陶瓷碎片属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-ceramic' },
      { q: '旧衣服属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-clothes' },
      { q: '鸡蛋壳属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-egg' },
      { q: '废灯管属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-lamp' },
      { q: '烟头属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-cig' },
      { q: '玻璃瓶属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-glass' },
      { q: '苹果核属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-apple' },
      { q: '杀虫剂属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-pesticide' },
      { q: '用过的纸巾属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-tissue' },
      { q: '旧纸箱属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0, itemId: 'r-box' },
      { q: '鱼骨头属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-fishbone' },
      { q: '油漆桶属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-paint' },
      { q: '一次性餐盒属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-mealbox' },
      { q: '牛奶盒属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 0 /* 无对应物品图，itemId 留空回退随机 */ },
      { q: '菜叶属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 1, itemId: 'k-leaf' },
      { q: '水银温度计属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 2, itemId: 'h-thermometer' },
      { q: '旧皮鞋属于哪类垃圾？', opts: ['可回收物', '厨余垃圾', '有害垃圾', '其他垃圾'], ans: 3, itemId: 'o-shoe' }
    ]
  },

  /* 垃圾分类跑酷 */
  runner: {
    name: '垃圾分类跑酷',
    /* 游玩时长（秒，可编辑） */
    duration: 60,
    /* 吃到目标垃圾加分 / 吃错扣分（可编辑） */
    goodPoints: 10,
    badPoints: 5,
    /* 顶部目标提示切换间隔（毫秒，可编辑） */
    targetChangeMs: 8000,
    /* 整体速度倍率（0.3~3，可编辑） */
    speed: 0.7,
    /* 角色形象：留空则用小程形象；动作图可分别指定 */
    img: '',
    actions: {
      run: 'assets/runner/run.png',    /* 奔跑 */
      power: 'assets/runner/power.png',  /* 吃到道具 */
      good: 'assets/runner/good.png',   /* 吃到正确 */
      bad: 'assets/runner/bad.png',    /* 吃到错误 */
      finish: 'assets/runner/finish.png'  /* 到达终点 */
    },
    /* R63 新增：难度表（时间秒数+奖励积分可编辑；free 模式无积分）
       R65 新增两字段（反馈8 跑酷加速 / 反馈11 每难度次数限制）：
       - maxSpeed：该难度本局「渐进加速」后的速度封顶值。单位=app.js 跑酷前进速度 v 的同量纲
         （世界单位/秒；现网公式 v=(boost?13:7.5)*speedMul*accel，accel 随局时由 1 渐增到 2.6）。
         约定：填正数=封顶速度；填 null 或缺省/undefined=无上限（free 模式用 null）。
         Agent-A 兜底：typeof lv.maxSpeed!=='number' 时按无上限(Infinity)处理，旧存档无此字段不崩。
         参考区间：简单 3~5 / 普通 5~7 / 困难 7~9 / 超级困难 9~12。
       - limit：该难度「每日」游玩次数限制，整数；0=不限制（沿用 perAccountLimit 语义，按模块+难度计数）。
         Agent-A 兜底：缺省按 0=不限制处理，旧存档无此字段不崩。 */
    levels: [
      { id: 'easy',   name: '简单',     time: 60,  reward: 10, maxSpeed: 4,  limit: 0 },
      { id: 'normal', name: '普通',     time: 75,  reward: 20, maxSpeed: 6,  limit: 0 },
      { id: 'hard',   name: '困难',     time: 90,  reward: 30, maxSpeed: 8,  limit: 0 },
      { id: 'super',  name: '超级困难', time: 120, reward: 50, maxSpeed: 11, limit: 0 },
      { id: 'free',   name: '自由模式', time: 0,   reward: 0, free: true, maxSpeed: null, limit: 0 }
    ],
    /* R63 新增：单账号游玩次数限制，整数，0=不限制 */
    perAccountLimit: 0
  },

  /* 垃圾消消乐：同品类相连即可消除 */
  matches: {
    name: '垃圾消消乐',
    /* 棋盘背景图（可编辑；默认橙子乐园，assets 会在离线包内联） */
    bg: 'assets/mm-bg.jpg',
    /* 消除一格得分（可编辑） */
    perMatch: 10,
    /* 棋盘行列 */
    rows: 6,
    cols: 6,
    /* 关卡：简单/普通/困难/超级困难 有达标分数与时间；自由模式仅玩耍无积分
       free=true 时达标分/时间仅作展示；通关积分与可通关次数可编辑 */
    levels: [
      { id: 'easy', name: '简单', target: 300, time: 120, reward: 10, maxRewards: 5, limit: 0 },
      { id: 'normal', name: '普通', target: 600, time: 120, reward: 20, maxRewards: 5, limit: 0 },
      { id: 'hard', name: '困难', target: 900, time: 150, reward: 30, maxRewards: 5, limit: 0 },
      { id: 'super', name: '超级困难', target: 1500, time: 180, reward: 50, maxRewards: 5, limit: 0 },
      { id: 'free', name: '自由模式', target: 0, time: 0, reward: 0, maxRewards: 0, free: true, limit: 0 }
    ],
    /* R63 新增：单账号游玩次数限制，整数，0=不限制 */
    perAccountLimit: 0
  },

  /* R58 去学习：垃圾分类科普课堂
     内容依据《上海市生活垃圾分类投放指南》2025 版（上海市绿化和市容管理局发布，依据《上海市生活垃圾管理条例》2019-07-01 施行）
     官方称谓：湿垃圾=厨余(游戏内 id kitchen)、干垃圾=其他(游戏内 id other)
     tips：管理员可编辑的开场科普语，每行一条「分类id::文案」；未填写时用 intro 默认文案 */
  learn: {
    intro: {
      recyclable: {
        name: '可回收物',
        alias: '可回收物',
        color: '#3B82F6',
        mark: 'assets/marks/mark-recyclable-new.jpg',
        def: '指废纸张、废塑料、废玻璃制品、废金属、废织物等适宜回收、可循环利用的生活废弃物。',
        items: ['报纸','纸箱','书本','纸袋','信封','纸铝塑复合包装','塑料瓶','塑料玩具','油桶','乳液罐','食品保鲜盒','泡沫塑料','塑料衣架','酒瓶','玻璃放大镜','玻璃杯','窗玻璃','碎玻璃','易拉罐','锅','螺丝刀','刀','指甲钳','刀片','皮鞋','衣服','床单枕头','包','毛绒玩具'],
        note: '投放时保持清洁干燥，避免污染：废纸保持平整；立体包装物清空内容物、清洁后压扁投放；玻璃制品轻放，有尖锐边角的包裹后投放。'
      },
      kitchen: {
        name: '厨余垃圾',
        alias: '湿垃圾（易腐垃圾）',
        color: '#8B5E3C',
        mark: 'assets/marks/mark-wet-new.jpg',
        def: '即易腐垃圾，指食材废料、剩菜剩饭、过期食品、瓜皮果核、花卉绿植、中药药渣等易腐的生物质生活废弃物。',
        items: ['剩菜剩饭','火锅汤底','鱼骨','碎骨','茶叶渣','咖啡渣','糕饼','糖果','风干食品','粉末类食品','宠物饲料','水果果肉','水果果皮','水果茎枝','果实','家养绿植','花卉','花瓣','枝叶','中药药渣','鸡蛋及蛋壳','面包','鸡肉','干果仁','蔬菜','蛋糕饼干','动物内脏','苹果核','鱼虾','大米及豆类'],
        note: '投放时应与其他品种垃圾分开；有包装物的去除包装物后分类投放，包装物投放到对应的可回收物或干垃圾收集容器中。'
      },
      hazardous: {
        name: '有害垃圾',
        alias: '有害垃圾',
        color: '#E5484D',
        mark: 'assets/marks/mark-hazardous-new.jpg',
        def: '指废电池、废灯管、废药品、废油漆及其容器等对人体健康或者自然环境造成直接或者潜在危害的生活废弃物。',
        items: ['充电电池','镉镍电池','铅酸电池','蓄电池','纽扣电池','荧光灯','节能灯','卤素灯','过期药物','药品包装','染发剂壳','废油漆桶','洗甲水','过期指甲油','水银血压计','水银体温计','消毒剂','老鼠药','杀虫喷雾','X光片等感光胶片','相片底片'],
        note: '投放时注意轻放：废灯管等易破损的连带包装或包裹后投放；废弃药品宜连带包装一并投放；压力罐装容器排空内容物后投放。'
      },
      other: {
        name: '其他垃圾',
        alias: '干垃圾（其它垃圾）',
        color: '#3D3A37',
        mark: 'assets/marks/mark-dry-new.jpg',
        def: '即其它垃圾，指除可回收物、有害垃圾、湿垃圾以外的其它生活废弃物。',
        items: ['餐巾纸','卫生间用纸','尿不湿','狗尿垫','猫砂','烟蒂','污损纸张','干燥剂','污损塑料','尼龙制品','编织袋','防碎气泡膜','大骨头','硬贝壳','毛发','泥土','太空沙','陶瓷花盆','带胶制品','旧毛巾','一次性餐具','镜子','陶瓷制品','竹制品','笔','胶带','创可贴','眼镜','内衣裤','污损塑料袋','橡皮泥','灰土'],
        note: '以上三类以外的其它生活废弃物，投入干垃圾桶即可。'
      }
    },
    /* 易混淆提醒（海报事实）：大骨头/贝壳/榴莲壳/粽叶/玉米芯/无汞干电池 → 干垃圾，玉米棒 → 湿垃圾 */
    tricky: [
      { name: '大骨头', bin: 'other' },
      { name: '贝壳', bin: 'other' },
      { name: '榴莲壳', bin: 'other' },
      { name: '粽叶', bin: 'other' },
      { name: '玉米芯', bin: 'other' },
      { name: '无汞干电池', bin: 'other' },
      { name: '玉米棒', bin: 'kitchen' }
    ],
    /* 考考你：趣味判断题题池（物品 → 正确分类，取自海报） */
    quiz: [
      { name: '报纸', bin: 'recyclable' },
      { name: '塑料瓶', bin: 'recyclable' },
      { name: '玻璃杯', bin: 'recyclable' },
      { name: '易拉罐', bin: 'recyclable' },
      { name: '泡沫塑料', bin: 'recyclable' },
      { name: '旧衣服', bin: 'recyclable' },
      { name: '充电电池', bin: 'hazardous' },
      { name: '过期药品', bin: 'hazardous' },
      { name: '节能灯', bin: 'hazardous' },
      { name: '油漆桶', bin: 'hazardous' },
      { name: '水银体温计', bin: 'hazardous' },
      { name: '杀虫喷雾', bin: 'hazardous' },
      { name: '剩菜剩饭', bin: 'kitchen' },
      { name: '鱼骨', bin: 'kitchen' },
      { name: '苹果核', bin: 'kitchen' },
      { name: '茶叶渣', bin: 'kitchen' },
      { name: '鸡蛋及蛋壳', bin: 'kitchen' },
      { name: '花卉绿植', bin: 'kitchen' },
      { name: '餐巾纸', bin: 'other' },
      { name: '烟蒂', bin: 'other' },
      { name: '大骨头', bin: 'other' },
      { name: '硬贝壳', bin: 'other' },
      { name: '陶瓷花盆', bin: 'other' },
      { name: '旧毛巾', bin: 'other' },
      { name: '一次性餐具', bin: 'other' },
      { name: '玉米棒', bin: 'kitchen' },
      { name: '榴莲壳', bin: 'other' },
      { name: '无汞干电池', bin: 'other' }
    ],
    /* 管理员可编辑科普语：{ recyclable: '...', kitchen: '...', hazardous: '...', other: '...' } */
    tips: {},
    /* R63 新增：考考你答对得分，整数 1~100 */
    pointsPerCorrect: 10,
    /* R63 新增：考考你每组题数，整数 1~50 */
    questionCount: 5,
    /* R63 新增：单账号题数限制，整数，0=不限制 */
    perAccountLimit: 0
  },

  /* R63 新增、R64 扩展：顶部称号段位表（按 min 积分升序）。
     R64 反馈19：数组结构 [{min, name}]，编辑面板「文案设置」可增删段位行（ensureConfig 老存档兜底合并）。
     R64 默认新增两档：环保之星 / 环保大使。 */
  badges: [
    { min: 0,    name: '环保小卫士' },
    { min: 200,  name: '环保小先锋' },
    { min: 500,  name: '环保小达人' },
    { min: 1000, name: '环保大师' },
    { min: 2000, name: '环保之星' },
    { min: 5000, name: '环保大使' }
  ]
};

/* ===== R63 编辑面板尺寸/格式标注数据源（供 Agent-D3 渲染每项旁的要求说明） =====
   路径用点分；数组项用 [] 通配（如 mall[].img）。覆盖全部可编辑项。 */
const EDIT_HINTS = {
  /* ---- 垃圾桶 bins ---- */
  'bins[].id': '分类标识：固定 recyclable/kitchen/hazardous/other，勿改',
  'bins[].name': '桶名：建议 4~6 字以内（如 可回收物/厨余垃圾）',
  'bins[].color': '桶色：#RRGGBB，四分类固定 可回收#3B82F6 厨余#8B5E3C 有害#E5484D 其他#3D3A37',
  'bins[].desc': '桶描述：建议 15 字以内，结尾可带"等"字',
  'bins[].mark': '桶上标识图：用标准标识 mark-{recyclable-new,wet-new,hazardous-new,dry-new}.png，勿自造',

  /* ---- 垃圾物品 items ---- */
  'items[].id': '物品唯一 id：小写连字符，勿与其他重复',
  'items[].name': '物品名：建议 4~8 字以内',
  'items[].img': '物品图：建议 200×200 以内透明 PNG/JPG，assets/items/ 下',
  'items[].bin': '所属分类：recyclable/kitchen/hazardous/other 之一，须与官方口径一致',
  'items[].points': '答对得分：整数 1~100',
  'items[].q': '【R64】该物品绑定的专属问题（可空）：{ q: 题干, bin: 正确分类id }；留空则运行时随机出题。飞行棋格内图=该物品时，问此题',

  /* ---- 商城 mall ---- */
  'mall[].id': '商品唯一 id：小写连字符，勿重复',
  'mall[].type': '商品类型：目前统一填 item',
  'mall[].name': '商品名：建议 6~10 字以内',
  'mall[].desc': '商品描述：建议 20 字以内',
  'mall[].price': '兑换所需积分：整数，建议 50~1000',
  'mall[].icon': '默认图标：bag/cup/leaf/book/fork/star 之一（自定义 img 后可不填）',
  'mall[].img': '商品图：建议 400×400 以内 PNG/JPG，留空则用 icon',
  'mall[].maxBuys': '每人最多兑换次数：整数 1~10，0 视为不可兑',

  /* ---- settings（小达人 + 首页） ---- */
  'settings.roundSize': '单局出现物品数量：整数 4~12',
  'settings.pointsPerCorrect': '小达人答对得分：整数 1~100',
  'settings.classicRoundLimit': '小达人单账号局数限制：整数，0=不限制',
  'settings.badgeTitle': '默认称号：建议 6 字以内',
  'settings.heroTitle': '首页大标题：可含 <br> 换行，建议每行 8 字以内',
  'settings.heroSub': '首页副标题：建议 25 字以内',
  'settings.steps[]': '操作说明：共 3 条，每条建议 20 字以内',

  /* ---- settingsExtra ---- */
  'settingsExtra.wrongDeduct': '小达人答错扣分：整数 0~50',

  /* ---- loading（R63 新增） ---- */
  'loading.title': '加载页标题：建议 8~12 字以内，过长会换行',
  'loading.animation.enabled': '是否播放垃圾分类小动画：true/false（仅电脑显示）',
  'loading.animation.setCount': '动画套数：整数 3~6，每套约 15s',
  'loading.runnerEgg.enabled': '是否开启橘子跑酷彩蛋：true/false（仅电脑显示）',

  /* ---- home（R63 新增） ---- */
  'home.redBoxLines[]': '首页红框话术：共 3 行，每行建议 20 字以内',
  'home.randomTitle': '随机游戏红字标题：建议 8 字以内',
  'home.randomCta': '随机游戏绿字按钮：建议 6 字以内',
  'home.randomModules[]': '「来一把」随机范围：classic/flychess/runner/matches 子集',

  /* ---- moduleNames / moduleIntros（R63 新增） ---- */
  'moduleNames.classic': '小达人游戏名：建议 10 字以内',
  'moduleNames.flychess': '飞行棋游戏名：建议 10 字以内',
  'moduleNames.runner': '跑酷游戏名：建议 10 字以内',
  'moduleNames.matches': '消消乐游戏名：建议 10 字以内',
  'moduleIntros.classic': '小达人简介：建议 20 字以内',
  'moduleIntros.flychess': '飞行棋简介：建议 20 字以内',
  'moduleIntros.runner': '跑酷简介：建议 20 字以内',
  'moduleIntros.matches': '消消乐简介：建议 20 字以内',

  /* ---- 引导员 avatar ---- */
  'avatar.name': '引导员称呼：建议 6 字以内',
  'avatar.img': '引导员形象：建议 512×512 透明 PNG，橘子头套+橙衣白肚皮+白围裙',
  'avatar.cheer': '开心图：五指欢呼动作，建议 512×512 透明 PNG',
  'avatar.oops': '沮丧图：握拳动作，建议 512×512 透明 PNG',
  'avatar.dialogues[]': '引导语：每条建议 30 字以内，点引导员切换下一条',

  /* ---- loadingTips ---- */
  'loadingTips[]': '加载页知识文字：每条建议 25 字以内，勿改官方分类口径',

  /* ---- corner 水印 ---- */
  'corner.enabled': '是否显示角标水印：true/false',
  'corner.img': '角标图：建议 400×400 PNG/JPG',
  'corner.text': '角标文字：建议 10 字以内',
  'corner.scale': '角标缩放：小数 0.5~2',

  /* ---- titleImg ---- */
  'titleImg': '顶部标题旁图标：建议 120×120 透明 PNG，留空不显示',

  /* ---- learn 小课堂 ---- */
  'learn.intro.recyclable.name': '可回收物类名：建议 6 字以内',
  'learn.intro.recyclable.alias': '可回收物别名：建议 10 字以内',
  'learn.intro.recyclable.color': '可回收物色：#3B82F6，勿改',
  'learn.intro.recyclable.mark': '可回收物标识：mark-recyclable-new.png，勿自造',
  'learn.intro.recyclable.def': '可回收物定义：建议 60 字以内，依上海指南口径',
  'learn.intro.recyclable.items[]': '可回收物示例：每条 4~8 字，依官方指南',
  'learn.intro.recyclable.note': '可回收物投放提示：建议 40 字以内',
  'learn.intro.kitchen.name': '厨余类名：建议 6 字以内',
  'learn.intro.kitchen.alias': '厨余别名：建议 10 字以内',
  'learn.intro.kitchen.color': '厨余色：#8B5E3C，勿改',
  'learn.intro.kitchen.mark': '厨余标识：mark-wet-new.png，勿自造',
  'learn.intro.kitchen.def': '厨余定义：建议 60 字以内',
  'learn.intro.kitchen.items[]': '厨余示例：每条 4~8 字，依官方指南',
  'learn.intro.kitchen.note': '厨余投放提示：建议 40 字以内',
  'learn.intro.hazardous.name': '有害类名：建议 6 字以内',
  'learn.intro.hazardous.alias': '有害别名：建议 10 字以内',
  'learn.intro.hazardous.color': '有害色：#E5484D，勿改',
  'learn.intro.hazardous.mark': '有害标识：mark-hazardous-new.png，勿自造',
  'learn.intro.hazardous.def': '有害定义：建议 60 字以内',
  'learn.intro.hazardous.items[]': '有害示例：每条 4~8 字，依官方指南',
  'learn.intro.hazardous.note': '有害投放提示：建议 40 字以内',
  'learn.intro.other.name': '其他类名：建议 6 字以内',
  'learn.intro.other.alias': '其他别名：建议 10 字以内',
  'learn.intro.other.color': '其他色：#3D3A37，勿改',
  'learn.intro.other.mark': '其他标识：mark-dry-new.png，勿自造',
  'learn.intro.other.def': '其他定义：建议 60 字以内',
  'learn.intro.other.items[]': '其他示例：每条 4~8 字，依官方指南',
  'learn.intro.other.note': '其他投放提示：建议 40 字以内',
  'learn.tricky[].name': '易混淆物品名：建议 6 字以内',
  'learn.tricky[].bin': '易混淆正确分类：recyclable/kitchen/hazardous/other',
  'learn.quiz[].name': '考考你物品名：建议 6 字以内',
  'learn.quiz[].bin': '考考你正确分类：recyclable/kitchen/hazardous/other',
  'learn.tips': '开场科普语对象：{ recyclable,kitchen,hazardous,other } 各一条，留空用默认',
  'learn.pointsPerCorrect': '考考你答对得分：整数 1~100',
  'learn.questionCount': '每组题数：整数 1~50',
  'learn.perAccountLimit': '单账号题数限制：整数，0=不限制',

  /* ---- flychess 飞行棋 ---- */
  'flychess.name': '飞行棋名称：建议 10 字以内',
  'flychess.rankPoints[]': '名次积分：数组 4 项（第1~4名），整数，建议递减',
  'flychess.cellCount': '棋盘格数：整数，建议 20~40',
  'flychess.questions[].q': '题目：建议 15 字以内，物品与格内素材对应',
  'flychess.questions[].opts[]': '选项：固定 4 项，依次 可回收/厨余/有害/其他',
  'flychess.questions[].ans': '正确选项下标：0/1/2/3',
  'flychess.questions[].itemId': '【R64】该题绑定的物品 id（对应 config.items[].id）：使格内垃圾图与题目一一对应；留空回退按 ans 分类随机取图',
  'flychess.perAccountLimit': '单账号局数限制：整数，0=不限制',

  /* ---- runner 跑酷 ---- */
  'runner.name': '跑酷名称：建议 10 字以内',
  'runner.duration': '默认时长（秒）：整数 30~180',
  'runner.goodPoints': '吃到目标垃圾得分：整数 1~100',
  'runner.badPoints': '吃错垃圾扣分：整数 0~50',
  'runner.targetChangeMs': '目标切换间隔（毫秒）：整数 3000~15000',
  'runner.speed': '速度倍率：小数 0.3~3',
  'runner.img': '角色形象图：留空用引导员，建议 300×300 透明 PNG',
  'runner.actions.run': '奔跑动作图：建议 300×300 透明 PNG',
  'runner.actions.power': '吃道具动作图：建议 300×300 透明 PNG',
  'runner.actions.good': '吃对动作图：建议 300×300 透明 PNG',
  'runner.actions.bad': '吃错动作图：建议 300×300 透明 PNG',
  'runner.actions.finish': '到终点动作图：建议 300×300 透明 PNG',
  'runner.levels[].id': '难度 id：easy/normal/hard/super/free，勿改',
  'runner.levels[].name': '难度名：建议 6 字以内',
  'runner.levels[].time': '该难度时长（秒）：整数 0~300，free=0',
  'runner.levels[].reward': '通关奖励积分：整数 0~500，free 必须 0',
  'runner.levels[].free': '是否自由模式：true 时无积分，仅 free 这一条填 true',
  'runner.perAccountLimit': '单账号局数限制：整数，0=不限制',

  /* ---- matches 消消乐 ---- */
  'matches.name': '消消乐名称：建议 10 字以内',
  'matches.bg': '棋盘背景图：建议 1024×1024 JPG/PNG',
  'matches.perMatch': '消除一格得分：整数 1~50',
  'matches.rows': '棋盘行数：整数 4~10',
  'matches.cols': '棋盘列数：整数 4~10',
  'matches.levels[].id': '难度 id：easy/normal/hard/super/free，勿改',
  'matches.levels[].name': '难度名：建议 6 字以内',
  'matches.levels[].target': '达标分：整数 0~5000，free=0',
  'matches.levels[].time': '限时（秒）：整数 0~300，free=0',
  'matches.levels[].reward': '通关奖励积分：整数 0~500，free=0',
  'matches.levels[].maxRewards': '最多可领奖励次数：整数 0~20，free=0',
  'matches.levels[].free': '是否自由模式：true 时无积分，仅 free 这一条填 true',
  'matches.perAccountLimit': '单账号局数限制：整数，0=不限制',

  /* ---- badges 称号段位（R63 新增；R64 反馈19：编辑面板可增删段位行） ---- */
  'badges[].min': '段位最低积分：整数，按升序，相邻段位递增',
  'badges[].name': '段位称号：建议 6 字以内（如 环保小卫士）',
  'badges[]': '【R64】段位数组：可整行新增/删除（默认已含 6 档：小卫士/小先锋/小达人/大师/之星/大使）',

  /* ---- R64 废弃字段核查（反馈20①） ----
     逐项核对 app.js 引用：titleImg / loadingTips / settings.steps / corner.scale /
     settingsExtra.soundOn / settingsExtra.moduleClassicName / settings.badgeTitle 均有 UI 与运行时引用，
     判定仍在使用，不删除。本轮 data.js 未发现确定无 UI 引用的废弃配置字段。 */
};
