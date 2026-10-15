(function(root){'use strict';const data={
  "items": [
    {
      "id": "newspaper",
      "name": "旧报纸",
      "category": "blue",
      "desc": "a folded old newspaper with black abstract printed lines and a curled corner, no readable text",
      "why": "废纸属于可回收物，保持清洁干燥。",
      "image": "assets/trash/newspaper.png"
    },
    {
      "id": "cardboard",
      "name": "纸箱",
      "category": "blue",
      "desc": "one empty open brown corrugated cardboard box with four flaps",
      "why": "清洁纸箱可以回收，投放前压扁。",
      "image": "assets/trash/cardboard.png"
    },
    {
      "id": "plastic-bottle",
      "name": "空塑料瓶",
      "category": "blue",
      "desc": "one empty clear PET drinks bottle with a blue cap and small blank blue wrapper",
      "why": "塑料瓶倒空后投可回收物。",
      "image": "assets/trash/plastic-bottle.png"
    },
    {
      "id": "glass-bottle",
      "name": "玻璃酒瓶",
      "category": "blue",
      "desc": "one empty green glass bottle, unbranded, slightly angled",
      "why": "玻璃瓶属于可回收物，轻投避免破碎。",
      "image": "assets/trash/glass-bottle.png"
    },
    {
      "id": "metal-can",
      "name": "易拉罐",
      "category": "blue",
      "desc": "one empty slightly crumpled silver aluminum drinks can with an orange blank band and open pull tab",
      "why": "金属饮料罐可以回收。",
      "image": "assets/trash/metal-can.png"
    },
    {
      "id": "shirt",
      "name": "旧衣服",
      "category": "blue",
      "desc": "one clean folded mint green short-sleeve T-shirt, unbranded",
      "why": "可再利用的旧衣物属于可回收物；内衣和严重污损衣物另行分类。",
      "image": "assets/trash/shirt.png"
    },
    {
      "id": "rechargeable-battery",
      "name": "废镍镉充电电池",
      "category": "red",
      "desc": "two used rechargeable cylindrical battery cells, green and silver, with visible plus terminals, no labels",
      "why": "图中的废镍镉等电池需单独投有害垃圾，不能把所有普通干电池一概算作有害垃圾。",
      "image": "assets/trash/rechargeable-battery.png"
    },
    {
      "id": "lamp-tube",
      "name": "废荧光灯管",
      "category": "red",
      "desc": "one intact slender white fluorescent lamp tube with metallic ends, diagonally centered",
      "why": "废荧光灯管属于有害垃圾，避免摔碎。",
      "image": "assets/trash/lamp-tube.png"
    },
    {
      "id": "expired-pills",
      "name": "过期药片",
      "category": "red",
      "desc": "one silver blister pack containing a few rounded pink and cream medicine tablets, one empty pocket",
      "why": "过期药品及相关包装按图中要求投有害垃圾。",
      "image": "assets/trash/expired-pills.png"
    },
    {
      "id": "paint-can",
      "name": "废油漆桶",
      "category": "red",
      "desc": "one small used metal paint can with a closed lid, blue blank band and visible orange dried paint drips",
      "why": "废油漆及其包装属于有害垃圾。",
      "image": "assets/trash/paint-can.png"
    },
    {
      "id": "thermometer",
      "name": "废水银温度计",
      "category": "red",
      "desc": "one thin old glass mercury thermometer with a silver bulb and short tiny tick marks but no numbers, placed diagonally",
      "why": "废水银温度计属于有害垃圾，避免破损。",
      "image": "assets/trash/thermometer.png"
    },
    {
      "id": "disinfectant",
      "name": "废消毒剂瓶",
      "category": "red",
      "desc": "one used blue disinfectant bottle with a red screw cap and a blank cream label, no text",
      "why": "图中的消毒剂及包装需要按有害垃圾单独投放。",
      "image": "assets/trash/disinfectant.png"
    },
    {
      "id": "apple-core",
      "name": "苹果核",
      "category": "brown",
      "desc": "one eaten red apple core with cream flesh, two brown seeds and a small green leaf at the stem",
      "why": "水果果核属于湿垃圾。",
      "image": "assets/trash/apple-core.png"
    },
    {
      "id": "banana-peel",
      "name": "香蕉皮",
      "category": "brown",
      "desc": "one discarded yellow banana peel opened into three curved strips, tiny natural brown speckles",
      "why": "水果果皮属于湿垃圾。",
      "image": "assets/trash/banana-peel.png"
    },
    {
      "id": "bread",
      "name": "剩余面包",
      "category": "brown",
      "desc": "one leftover partly eaten slice of golden brown toast bread with cream inside and soft crumbs attached, no separate objects",
      "why": "剩余食物中的面包属于湿垃圾。",
      "image": "assets/trash/bread.png"
    },
    {
      "id": "egg-shell",
      "name": "鸡蛋壳",
      "category": "brown",
      "desc": "two halves of one broken pale brown egg shell with visible cream interior and a few cracks",
      "why": "鸡蛋壳属于湿垃圾。",
      "image": "assets/trash/egg-shell.png"
    },
    {
      "id": "cabbage-leaf",
      "name": "菜叶",
      "category": "brown",
      "desc": "one discarded green cabbage leaf with a pale thick stem and gentle curved folds",
      "why": "菜叶等蔬菜废料属于湿垃圾。",
      "image": "assets/trash/cabbage-leaf.png"
    },
    {
      "id": "shrimp-shell",
      "name": "虾壳",
      "category": "brown",
      "desc": "one curled empty orange shrimp shell with a short tail and clear segment lines, no living animal or eyes",
      "why": "虾壳等图中鱼虾食物残余属于湿垃圾。",
      "image": "assets/trash/shrimp-shell.png"
    },
    {
      "id": "used-tissue",
      "name": "用过的餐巾纸",
      "category": "black",
      "desc": "one crumpled used white tissue with a few small beige food stains, softly folded rounded silhouette",
      "why": "用过的餐巾纸受污染且难回收，属于干垃圾。",
      "image": "assets/trash/used-tissue.png"
    },
    {
      "id": "ceramic-shard",
      "name": "陶瓷碎片",
      "category": "black",
      "desc": "three pieces of one broken white ceramic cup with a simple blue floral stripe and a handle fragment",
      "why": "破碎陶瓷属于干垃圾，不是玻璃可回收物。",
      "image": "assets/trash/ceramic-shard.png"
    },
    {
      "id": "cigarette-butt",
      "name": "烟蒂",
      "category": "black",
      "desc": "one extinguished short cigarette butt with tan filter and gray ash tip, no smoke, no brand",
      "why": "烟蒂属于干垃圾。",
      "image": "assets/trash/cigarette-butt.png"
    },
    {
      "id": "big-bone",
      "name": "大骨头",
      "category": "black",
      "desc": "one large pale cream pork leg bone with broad rounded knuckles, no meat and no gore",
      "why": "图中大骨头难以处理，应投干垃圾，不能把所有厨余都算作湿垃圾。",
      "image": "assets/trash/big-bone.png"
    },
    {
      "id": "corn-cob",
      "name": "玉米棒",
      "category": "black",
      "desc": "one whole yellow corn cob with plump kernels, green husk leaves and a few corn silks",
      "why": "玉米棒质地坚硬、难降解，按上海分类指引投干垃圾；不能因为它来自食物就按湿垃圾投放。",
      "image": "assets/trash/corn-cob.png"
    },
    {
      "id": "hard-shell",
      "name": "硬贝壳",
      "category": "black",
      "desc": "one thick hard beige clam shell with curved ridges and visible heavy rim, slightly open showing chalky interior",
      "why": "图中的硬贝壳属于干垃圾。",
      "image": "assets/trash/hard-shell.png"
    },
    {
      "id": "bandage",
      "name": "用过的创可贴",
      "category": "black",
      "desc": "one used beige adhesive bandage with dotted perforations and a small gray center pad, no blood",
      "why": "用过的创可贴属于干垃圾。",
      "image": "assets/trash/bandage.png"
    },
    {
      "id": "walnut-shell",
      "name": "核桃壳",
      "category": "black",
      "desc": "one whole brown walnut and one cracked walnut shell half with textured wrinkled surface",
      "why": "核桃壳质地坚硬、难降解，按上海分类指引投干垃圾。",
      "image": "assets/trash/walnut-shell.png"
    },
    {
      "id": "takeout-box",
      "name": "外卖盒",
      "category": "black",
      "desc": "one open white disposable plastic takeout box with leftover food scraps and oily stains",
      "why": "沾有食物残渣的一次性外卖盒难以回收，属于干垃圾；清洗干净且沥干后才可以考虑投放可回收物。",
      "image": "assets/trash/takeout-box.png"
    },
    {
      "id": "milk-tea-cup",
      "name": "奶茶杯",
      "category": "blue",
      "desc": "one empty rinsed clear plastic milk tea cup with a transparent lid, a white straw and a blank label area, no liquid or boba",
      "why": "塑料奶茶杯属低价值可回收物：喝完后倒空残液、简单冲洗沥干，投可回收物桶；杯内食物残渣（如珍珠）属湿垃圾，应倒出；若杯子污染较重无法洗净，则按干垃圾投放。",
      "image": "assets/trash/milk-tea-cup.png"
    },
    {
      "id": "led-bulb",
      "name": "LED灯泡",
      "category": "black",
      "desc": "one white plastic LED bulb with a yellow LED chip plate inside and a silver screw base",
      "why": "LED灯泡属于干垃圾；含汞的荧光灯管才属于有害垃圾，不要混投。",
      "image": "assets/trash/led-bulb.png"
    },
    {
      "id": "watermelon-rind",
      "name": "西瓜皮",
      "category": "brown",
      "desc": "one crescent watermelon rind slice with a little red flesh, white inner rind and dark green striped skin",
      "why": "西瓜皮等瓜皮果核属于湿垃圾。",
      "image": "assets/trash/watermelon-rind.png"
    },
    {
      "id": "leftover-noodles",
      "name": "剩面条",
      "category": "brown",
      "desc": "a small pile of leftover cooked noodles with a few sauce stains",
      "why": "剩饭剩菜等食物残余属于湿垃圾。",
      "image": "assets/trash/leftover-noodles.png"
    },
    {
      "id": "old-book",
      "name": "旧书",
      "category": "blue",
      "desc": "one closed old hardcover book with worn edges and layered page edges",
      "why": "旧书、旧报刊属于可回收物，保持清洁干燥后投放。",
      "image": "assets/trash/old-book.png"
    },
    {
      "id": "metal-hanger",
      "name": "金属衣架",
      "category": "blue",
      "desc": "one silver metal clothes hanger in triangle shape with a hook on top",
      "why": "金属衣架属于可回收物。",
      "image": "assets/trash/metal-hanger.png"
    },
    {
      "id": "button-battery",
      "name": "纽扣电池",
      "category": "red",
      "desc": "one round silver button battery with a smooth metallic face and thin layered edge",
      "why": "纽扣电池含有重金属，属于有害垃圾，应投入有害垃圾桶。",
      "image": "assets/trash/button-battery.png"
    },
    {
      "id": "expired-nail-polish",
      "name": "过期指甲油",
      "category": "red",
      "desc": "one small clear glass nail polish bottle with light pink liquid and a silver cap",
      "why": "指甲油含有机溶剂等化学成分，属于有害垃圾。",
      "image": "assets/trash/expired-nail-polish.png"
    }
  ],
  "categories": [
    {
      "id": "blue",
      "name": "可回收物",
      "color": "#1677d2",
      "logo": [
        49,
        205,
        54
      ]
    },
    {
      "id": "brown",
      "name": "湿垃圾",
      "color": "#8b5a2b",
      "logo": [
        49,
        699,
        54
      ]
    },
    {
      "id": "red",
      "name": "有害垃圾",
      "color": "#d9363e",
      "logo": [
        49,
        465,
        54
      ]
    },
    {
      "id": "black",
      "name": "干垃圾",
      "color": "#6b6f76",
      "logo": [
        49,
        966,
        54
      ]
    }
  ]
};const C=typeof module!=='undefined'?require('./content.js'):root.EcoContent;
for(const item of data.items){C.fields['trash.'+item.id+'.name']={value:item.name,label:item.name+'名称',group:'垃圾素材'};C.fields['trash.'+item.id+'.why']={value:item.why,label:item.name+'分类说明',group:'垃圾素材'};}
const texts={
'play.score':'本局得分','play.best':'最高得分','play.time':'剩余时间','play.pause':'暂停','play.resume':'继续游玩','play.exit':'返回大厅','play.start':'开始挑战','play.retry':'再玩一次','play.next':'下一关','play.finish':'本局结束','play.pass':'挑战完成！','play.fail':'继续练习，再来一次！','play.credit':'本局获得 {points} 商城积分','play.first':'首次完成奖励','play.reward':'本局成绩奖励','play.correct':'分类正确，+10分！','play.wrong':'正确类别：{cat}。','play.level':'第 {level} 关','play.endless':'无尽挑战','play.goal':'目标 {goal} 分','play.want':'我要{cat}','play.collectUp':'上道收集 · ↑','play.collectDown':'下道收集 · ↓','play.hint':'提示卡','play.hintActive':'分类色框提示生效中','play.sortRule':'拖到对应垃圾桶；也可点击桶或按1–4键。答对+10，答错−5，共12题，60分达标。','play.runnerRule':'三条道路（道路1 · 道路2吉祥物 · 道路3）都有垃圾，按键盘 ↑ / ↓ 或点击右侧道路按钮切换；吉祥物身体碰到垃圾即可收集，不再使用圆圈判定。四类垃圾混合出现、数量均衡：每次只接当前目标类别，正确+10、接错−10；提示道具显示8秒分类色框。前两关限时挑战；无尽挑战不限时，可随时结束。','play.matchRule':'交换相邻方块，横竖连成至少3个同类别垃圾就能消除，不要求图案完全相同。每块+10，错误交换−10；每局有2张提示卡，使用后盘面所有卡片显示所属分类颜色，方便你找到同类。前两关为30秒限时挑战；无尽挑战不限时，可随时结束。','play.ludoRule':'每位玩家只有1枚棋子。掷骰决定前进步数，经过环保知识格时答题；答错或超时不前进，答后显示解析并在5秒后自动继续。人机对战只有你和1名电脑，先到终点获胜。','play.sortDone':'已投放 {done} / 12 件','play.progressBonus':'首次通过使大厅进度增加25%，同一游戏不重复累计。','play.roundReward':'成绩按规则换商城积分；负分不扣已有钱包。','play.modeSingle':'单人对电脑','play.modeMulti':'同机多人','play.players':'真人玩家数量','play.chooseSeat':'我的分类队伍','play.roll':'掷骰子','play.choosePiece':'选择我的棋子','play.answerFirst':'答对目的地问题，棋子才会移动','play.turn':'{name}的回合','play.diceHistory':'骰子历史','play.rank':'第 {rank} 名','play.ludoPoints':'名次奖励：100 / 75 / 50 / 25积分。','play.shuffle':'重新洗牌 −10','play.showHint':'提示卡','play.selected':'选中一格，再点相邻格交换。','play.combo':'同类连消！+{points}分','play.noMatch':'没有连成3个同类，−10分','play.miss':'接错类别，−10分','play.pauseNote':'计时和棋局已经暂停，继续时从当前状态恢复。','play.ready':'准备出发','play.locked':'先完成上一关','play.loading':'素材加载中…','quiz.title':'分类知识小测验','quiz.subtitle':'从上海分类知识题库随机抽取10题，每题15秒，答后立即解析。','quiz.start':'去答题','quiz.locked':'随机抽取10题，每题15秒','quiz.done':'本次答对 {correct} / 10 题','quiz.explain':'看一看分类依据，再继续下一题。','quiz.pass':'分类知识掌握得不错！','quiz.fail':'回课堂复习，再试一次吧。','lesson.poster':'查看上海分类原图','lesson.special':'特殊垃圾的投放方式','lesson.specialNote':'大件、装修垃圾不能直接塞进四类垃圾桶。大型电器可联系回收或按大件要求投放，小型电子废弃物按可回收物要求投放。'
};for(const [key,value]of Object.entries(texts))C.fields[key]={value,label:value,group:key.startsWith('quiz.')?'课堂答题':key.startsWith('lesson.')?'课堂':'游戏界面'};
C.fields['category.red.examples'].value='废镍镉电池、废荧光灯管、过期药品等。';C.fields['lesson.daily.title'].value='特殊垃圾怎样投放';C.fields['lesson.daily.description'].value='认识大件垃圾、装修垃圾和电子废弃物的专门投放方式。';C.fields['lesson.daily.eyebrow'].value='第三节 · 特殊投放';
const upgrades={"play.multiAccount": "同一台设备轮流操作；每位玩家可填写昵称，按名次获得个人飞行棋积分，分别累计，不记入玩家1的商城钱包。", "lesson.sourceNote": "课堂展示的分类原图为2019版；本测验题库依据《上海市生活垃圾分类投放指引（2024版）》。", "quiz.sofa": "废旧沙发", "quiz.brick": "装修产生的碎砖块", "quiz.large": "大件垃圾", "quiz.decor": "装修垃圾", "quiz.sofaWhy": "原图将沙发列为大件垃圾：可以预约回收，或投放到大件垃圾管理责任人指定的场所。", "quiz.brickWhy": "碎砖块属于装修垃圾，应装袋后投放到指定的装修垃圾堆放场所。", "quiz.passRule": "答对8题及以上通过；答题只记录学习成绩，不增加四个游戏的进度。", "quiz.question": "第 {index} / 10 题", "quiz.correctCount": "已答对 {correct} 题", "quiz.ask": "应该怎样分类或投放？", "quiz.correct": "答对了！", "quiz.wrong": "记住正确的投放方式。", "quiz.next": "下一题", "quiz.results": "查看成绩", "history.run": "本局得分 {score}，成绩奖励 +{points} 积分", "history.quiz": "完成课堂测验，得分 {score}", "common.previewLabel": "玩法介绍 · 开始挑战", "intro.note": "现在可以开始完整挑战；通关后点亮徽章，成绩会换成商城积分。", "points.gameRule": "首次通关奖励 {points} 积分；本局成绩另计奖励：每10分折1积分，飞行棋按名次。", "points.claimed": "首次通关奖励已领取；继续游玩仍可获得成绩积分。", "intro.successBody": "本玩法徽章已点亮。重复游玩不会重复增加大厅进度。", "lesson.daily.card0.title": "大件垃圾", "lesson.daily.card0.text": "沙发、床垫、床、桌子等，可预约回收，或投放到大件垃圾管理责任人指定的场所。", "lesson.daily.card1.title": "装修垃圾", "lesson.daily.card1.text": "碎马桶、碎石块、碎砖块及废砂浆等，装袋后投放到指定的装修垃圾堆放场所。", "lesson.daily.card2.title": "电子废弃物", "lesson.daily.card2.text": "大型电器可联系电子废弃物回收企业，或按大件垃圾要求投放；小型电子产品按可回收物要求投放。", "play.sortHeadline": "让每件垃圾|找到自己的家", "play.ludoHeadline": "答对一题，|再往前一步", "play.runnerHeadline": "看准目标，|在节拍里接住它", "play.matchHeadline": "不同的垃圾，|也能成为同类搭档", "play.timedGoal": "{seconds}秒 · {goal}分达标", "play.endlessRule": "无倒计时，随时可结束；跑酷速度逐步提升并设有上限，消消乐可持续匹配。", "play.sortChip": "12 件垃圾", "play.correctChip": "答对 +10", "play.wrongChip": "答错 −5", "play.targetLabel": "达标分数", "play.turnTeam": "回合队伍", "play.rankLabel": "排名积分", "play.stageSub": "上海垃圾分类 · 边玩边学", "play.buddyAsk": "这件垃圾，|应该住在哪里？", "play.dragMe": "拖动我 ↓", "play.miniTipTitle": "分类小贴士", "play.miniTip": "不要只看材质，|还要考虑污染与用途。", "play.key": "{key} 键", "play.nextItem": "下一件垃圾准备好了。", "play.emptySeat": "空位", "play.humanTurn": "轮到你来操作", "play.cpuTurn": "电脑正在思考…", "play.takeoff": "起飞", "play.atFinish": "已到终点", "play.homeLane": "终点航道", "play.stepsWalked": "已走{steps}格", "play.pieceNumber": "{index}号", "play.historyRecent": "最近 {count} 次", "play.historyEmpty": "掷出第一颗骰子，记录将显示在这里。", "play.ludoMove": "答对，棋子前进！", "play.ludoJump": "答对，再回答跳格题。", "play.ludoCapture": "击回{count}枚对手棋子。", "play.targetChange": "目标每10秒切换", "play.hintIdle": "✦ 吃到提示卡，显示分类色框", "play.upper": "道路", "play.lower": "道路", "play.catchZone": "接住区", "play.catchInstruction": "吉祥物身体碰到垃圾即可收集|不必停留在某一道路", "play.catchWait": "看到目标类别垃圾，切换到对应道路，让吉祥物身体碰到它。", "play.belongs": "{item}是{cat}", "play.matchHeadlineSide": "看分类，|也看组合。", "play.matchExplain": "相同类别的垃圾就可以消除！横竖连成至少3个同类即可，物品可以长得不一样。", "play.matchExample": "＝ 同类 × 3", "play.matchTip": "横向或纵向，至少连成3格。|只要类别相同就能消除，不要求物品相同。", "play.cascade": " · {count}次连锁", "play.shuffled": "新棋盘已经准备好，−10分。", "play.hinted": "找一找闪亮的两格，−5分。", "play.peakResult": "本局最高分：{peak}，最终分数：{score}", "play.correctResult": "分类正确 {count} 次"};
for(const [key,value]of Object.entries(upgrades)){if(C.fields[key])C.fields[key].value=value;else C.fields[key]={value,label:value,group:key.startsWith('quiz.')?'课堂答题':key.startsWith('lesson.')?'课堂':key.startsWith('history.')?'历史':'游戏界面'};}
const gameIntros={"game.sorter.step2": "答对加10分，答错扣5分；12题后达到60分完成挑战。", "game.ludo.step0": "选择单人对电脑或2–4人同机；掷骰后展示点数3秒并自动进入答题，无需选择棋子，任意点数都可起飞。", "game.ludo.step1": "落地题和跳格题必须全部答对才能移动，答错棋子保持原位。", "game.ludo.step2": "四枚棋子到终点后按名次给积分，骰子历史随时可以查看。", "game.runner.goal": "看准头顶要的垃圾类别，在三道路上接住正确垃圾。", "game.runner.step0": "头顶显示目标类别，每10秒切换一次，先辨认来的是哪类垃圾。", "game.runner.step1": "吉祥物身体碰到所在道路垃圾即可完成收集，按键盘↑/↓或点击右侧按钮切换道路；正确加10分，错误扣10分。", "game.runner.step2": "吃到提示卡可显示8秒分类色框；完成两关限时挑战后解锁无尽，至−100分结束。", "game.match.step0": "观察6×6方格里的垃圾图片和名称，辨认它们所属的类别。", "game.match.step1": "交换相邻方块，横竖至少3个同类即可消除，图片可以不同。", "game.match.step2": "每格加10分，无效交换扣10分；先过两关限时挑战，再玩至−100分的无尽模式。"};for(const [key,value]of Object.entries(gameIntros))C.fields[key].value=value;
data.byId=Object.fromEntries(data.items.map(i=>[i.id,i]));data.forCategory=id=>data.items.filter(i=>i.category===id);data.category=id=>data.categories.find(c=>c.id===id);root.EcoTrash=data;if(typeof module!=='undefined')module.exports=data;
})(typeof window==='undefined'?globalThis:window);
