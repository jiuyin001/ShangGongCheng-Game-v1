(function (root) {
  'use strict';
  const fields = {};
  function copy(key, value, label, group) { fields[key] = { value, label, group }; return key; }
  const fixed = [
    ['brand','垃圾分类小达人','品牌名称','大厅'],
    ['nav.account','我的账户','账户按钮','顶栏'],['nav.settings','设置','设置按钮','顶栏'],['nav.history','历史记录','历史按钮','顶栏'],['nav.edit','编辑','管理员编辑按钮','顶栏'],
    ['hero.eyebrow','上海环保游乐园','欢迎区小标题','大厅'],['hero.title','每一次分类，\n都让城市更美一点。','欢迎区主标题','大厅'],
    ['hero.description','选一个喜欢的挑战，和小达人一起把环保变成好玩的日常。','欢迎区介绍','大厅'],['hero.greeting','你好，{name}！','问候语','大厅'],['hero.lesson','先去小课堂','欢迎区课堂按钮','大厅'],['hero.badge','准备好，一起出发！','吉祥物提示','大厅'],
    ['progress.title','我的环保之旅','进度标题','大厅'],['progress.description','四个挑战，各完成一次就点亮一枚环保徽章。','进度介绍','大厅'],['progress.count','已完成 {done} / 4','完成数量','大厅'],['progress.preview','效果演示','预览进度标记','大厅'],
    ['games.title','今天想玩哪一种？','游戏区标题','大厅'],['games.description','四种方式，让垃圾找到自己的家。','游戏区介绍','大厅'],['games.action','查看玩法','游戏按钮文字','大厅'],['games.done','已点亮','游戏完成标记','大厅'],['games.pending','等待探索','游戏未完成标记','大厅'],
    ['classroom.title','环保知识探索馆','课堂入口标题','课堂'],['classroom.description','自由探索垃圾处理与资源循环；完成知识挑战，赢取学习积分。','课堂入口介绍','课堂'],['classroom.tag','3 个探索展区','课堂入口标签','课堂'],['classroom.action','开始探索','课堂入口按钮','课堂'],['classroom.progress','已学完 {done} / 3 节','课堂学习数量','课堂'],
    ['footer','分类小行动，上海更美好。','页脚','大厅'],
    ['common.close','关闭','关闭按钮','系统文案'],['common.cancel','取消','取消按钮','系统文案'],['common.save','保存','保存按钮','系统文案'],['common.back','返回','返回按钮','系统文案'],['common.completed','已完成','通用完成标记','系统文案'],['common.previewLabel','玩法介绍 · 设计预览','玩法弹窗标签','玩法介绍'],
    ['intro.how','怎么玩？','玩法步骤标题','玩法介绍'],['intro.goal','你的环保任务','玩法目标标题','玩法介绍'],['intro.note','本轮先确认大厅和玩法介绍。可以预览一次完成反馈，看看进度条怎样变化。','玩法预览说明','玩法介绍'],['intro.preview','预览完成效果','进度演示按钮','玩法介绍'],['intro.already','已点亮这枚徽章','重复预览按钮','玩法介绍'],['intro.lesson','先学分类知识','玩法中的课堂按钮','玩法介绍'],
    ['lesson.title','环保知识探索馆','课堂弹窗标题','课堂'],['lesson.subtitle','展区自由开放；理解原理后挑战答题，获得一次性积分奖励。','课堂弹窗介绍','课堂'],['lesson.read','学完了，记一下','课堂完成按钮','课堂'],['lesson.readDone','这节已经学完啦','课堂重复完成按钮','课堂'],['lesson.tip','课堂学习单独记录，不占四个游戏的游玩进度。','课堂进度说明','课堂'],
    ['account.title','我的环保账户','账户标题','账户'],['account.note','昵称和记录保存在当前浏览器。','账户说明','账户'],['account.name','我的昵称','昵称字段','账户'],['account.badge','我的专属颜色','头像颜色标签','账户'],['account.games','游戏徽章','账户游戏统计','账户'],['account.lessons','学完的小课','账户课堂统计','账户'],['account.history','探索记录','账户记录统计','账户'],['account.save','保存我的资料','账户保存按钮','账户'],
    ['settings.title','让游乐园更适合你','设置标题','设置'],['settings.subtitle','声音、动画，都可以按自己的节奏来。','设置介绍','设置'],['settings.music','背景音乐','背景音乐设置','设置'],['settings.musicHint','点击开启，音乐会随大厅、课堂和不同游戏场景切换。','音乐说明','设置'],['settings.sfx','按钮音效','音效设置','设置'],['settings.sfxHint','每个小动作，都有一点轻快的回应。','音效说明','设置'],['settings.motion','减少动画','动画设置','设置'],['settings.motionHint','让跳动和装饰效果安静下来。','动画说明','设置'],['settings.volume','音乐音量','音量标签','设置'],['settings.reset','重置游玩进度','进度重置按钮','设置'],['settings.resetHint','清空四枚游戏徽章，保留课堂学习和历史记录。','重置说明','设置'],['settings.password','修改管理员密码','管理员密码设置','设置'],['settings.local','此阶段的账户、进度与文字修改保存在本机。','本机保存说明','设置'],
    ['reset.title','重新开始环保之旅？','重置弹窗标题','设置'],['reset.description','四个游戏的进度会回到 0%，课堂记录会保留。','重置确认说明','设置'],['reset.confirm','确认重置','重置确认按钮','设置'],
    ['history.title','我的探索足迹','历史记录标题','历史'],['history.subtitle','每一次学习、每一枚徽章，都值得记下来。','历史介绍','历史'],['history.all','全部','历史全部筛选','历史'],['history.games','玩法','历史玩法筛选','历史'],['history.lessons','课堂','历史课堂筛选','历史'],['history.progress','进度','历史进度筛选','历史'],['history.empty','第一条环保足迹，等你来留下。','历史空状态','历史'],['history.emptyAction','从小课堂开始','历史空状态按钮','历史'],['history.view','看了玩法介绍','查看玩法记录','历史'],['history.lessonDone','学完了小课堂','课堂完成记录','历史'],['history.demo','预览了完成效果','游戏预览记录','历史'],['history.gameDone','完成了游戏','游戏完成记录','历史'],['history.reset','重新开始了环保之旅','重置记录','历史'],
    ['admin.createTitle','设置管理员密码','首次管理员密码标题','管理员'],['admin.unlockTitle','管理员解锁','管理员解锁标题','管理员'],['admin.changeTitle','修改管理员密码','修改密码标题','管理员'],['admin.createNote','首次使用编辑功能，请设置至少 6 位密码。以后输入密码才能编辑文字。','首次密码说明','管理员'],['admin.unlockNote','输入管理员密码，即可修改大厅、按钮、玩法介绍和课堂文字。','管理员解锁说明','管理员'],['admin.changeNote','先验证原密码，再设置新的管理员密码。','修改密码说明','管理员'],['admin.password','管理员密码','管理员密码标签','管理员'],['admin.oldPassword','原密码','原密码标签','管理员'],['admin.newPassword','新密码','新密码标签','管理员'],['admin.confirmPassword','再输入一次','确认密码标签','管理员'],['admin.unlock','解锁编辑','解锁按钮','管理员'],['admin.create','设置并进入编辑','设置密码按钮','管理员'],['admin.change','确认修改','修改密码按钮','管理员'],['admin.local','密码用于此浏览器中的编辑解锁。','密码范围说明','管理员'],
    ['editor.title','页面文字编辑','文字编辑面板标题','管理员'],['editor.note','点击页面中的虚线文字，或从列表中选择。修改会立即预览。','编辑使用说明','管理员'],['editor.search','查找要编辑的文字…','编辑搜索提示','管理员'],['editor.value','修改这段文字','文字编辑标签','管理员'],['editor.save','保存并退出','编辑保存按钮','管理员'],['editor.discard','取消修改','编辑取消按钮','管理员'],['editor.restore','恢复这段默认文字','单段恢复按钮','管理员'],['editor.banner','管理员编辑中','编辑模式标记','管理员'],['editor.help','保存后会重新上锁；下次编辑需再次输入密码。','编辑保存说明','管理员'],
    ['toast.preview','已点亮一枚徽章，游玩进度增加 25%。','进度预览提示','系统文案'],['toast.duplicate','这枚徽章已经点亮，重复体验不会增加进度。','重复完成提示','系统文案'],['toast.lesson','小课堂记录已保存，继续保持！','课堂完成提示','系统文案'],['toast.profile','你好！资料已经更新。','资料保存提示','系统文案'],['toast.saved','页面文字已保存，编辑入口已上锁。','编辑保存提示','系统文案'],['toast.cancelled','已取消修改，回到之前的文字。','编辑取消提示','系统文案'],['toast.reset','游玩进度已回到 0%，可以重新出发啦。','重置提示','系统文案'],['toast.password','管理员密码已更新。','密码修改提示','系统文案'],['toast.wrongPassword','密码不正确，请再试一次。','密码错误提示','系统文案'],['toast.shortPassword','密码至少需要 6 位。','密码长度提示','系统文案'],['toast.mismatch','两次输入的密码不一致。','密码确认提示','系统文案'],['toast.music','浏览器需要你再次点击，才能开启音乐。','音乐未开启提示','系统文案'],['toast.name','请先填写一个昵称。','昵称校验提示','系统文案'],['toast.crypto','当前浏览器不支持密码验证，请使用新版 Chrome 或 Edge。','密码环境提示','系统文案'],['toast.storage','当前浏览器没有允许保存，关闭页面后变更可能丢失。','保存失败提示','系统文案'],['toast.quizUsed','这个账号已经参加过正式答题，不能再次参加；可以继续使用练习模式。','正式答题已用提示','系统文案']
  ];
  fixed.push(
    ['intro.successTitle','徽章点亮，快乐加分！','完成庆祝标题','玩法介绍'],
    ['intro.successAll','四枚徽章，全部集齐啦！','全部完成庆祝标题','玩法介绍'],
    ['intro.successBody','每种游戏只累计一次，继续探索其他挑战吧。','完成庆祝说明','玩法介绍']
  );
  fixed.forEach(args => copy(...args));
  const games = [
    { id: 'sorter', color: 'blue', art: 'bins', name: '垃圾分类小达人', tag: '拖一拖 · 分一分', description: '把垃圾送进正确的垃圾筐，成为分类小能手。', goal: '认识四类垃圾，让每一件垃圾回到正确的家。', steps: ['先看清垃圾的样子和名称。','按住垃圾，拖到对应颜色的垃圾筐上。','放对了收获鼓励，放错了就再试一次。'] },
    { id: 'ludo', color: 'orange', art: 'board', name: '垃圾分类飞行棋', tag: '掷骰子 · 向前走', description: '沿着环保路线前进，把分类知识带到终点。', goal: '在前进的路上认识分类知识，一步步走向终点。', steps: ['掷骰子决定前进步数，掷完直接进入答题。','随后直接回答垃圾分类问题，无需选择棋子。','答题结算后继续前进或轮到下一位玩家。'] },
    { id: 'runner', color: 'green', art: 'runner', name: '垃圾分类跑酷', tag: '跑起来 · 反应快', description: '跟小达人一起奔跑，收集垃圾，留心前方。', goal: '在轻快的奔跑中观察垃圾，练习正确选择。', steps: ['跟着小达人向前跑，观察道路上的物品。','及时避开障碍，收集出现的垃圾。','看清分类提示，完成这段环保小旅程。'] },
    { id: 'match', color: 'purple', art: 'match', name: '垃圾分类消消乐', tag: '找一找 · 连起来', description: '相同类型的垃圾连成一条线就能消除，越玩分类记得越牢。', goal: '把相同类别的垃圾连在一起，巩固分类记忆。', steps: ['观察方格中的垃圾。','交换相邻格子，让三个同类垃圾连成一条线。','达成关卡目标，让分类知识越玩越熟悉。'] }
  ];
  games.forEach(g => {
    const prefix = 'game.' + g.id + '.';
    copy(prefix+'title',g.name,g.name+'·名称','玩法介绍');
    copy(prefix+'tag',g.tag,g.name+'·小标签','玩法介绍');
    copy(prefix+'description',g.description,g.name+'·简介','玩法介绍');
    copy(prefix+'goal',g.goal,g.name+'·任务','玩法介绍');
    g.steps.forEach((text,i)=>copy(prefix+'step'+i,text,g.name+'·步骤'+(i+1),'玩法介绍'));
  });
  const categories = [
    { id:'blue', name:'可回收物', examples:'废纸、塑料瓶、玻璃瓶、金属罐等。', description:'适宜回收利用的生活废弃物。投放前尽量清洁、沥干；纸张平整，立体包装物清空、清洁并压扁。', hint:'先倒空内容物、简单清洁并沥干；纸张尽量平整，包装盒压扁。' },
    { id:'brown', name:'湿垃圾', examples:'剩菜剩饭、果皮果核、菜叶、茶渣等易腐食物残余。', description:'以易腐烂的食材废料、剩饭剩菜等为主。投放前应沥去多余水分，并将塑料袋、餐盒等外包装分开。', hint:'先沥去多余水分，取出塑料袋、餐盒等外包装；大骨头、硬果壳等要按干垃圾规则投放。' },
    { id:'red', name:'有害垃圾', examples:'废镍镉电池、氧化汞电池、废荧光灯管、过期药品等。', description:'对人体健康或自然环境可能造成直接或潜在危害、需要分类收集的生活废弃物。并非所有电池都属于有害垃圾，应按电池类型和当地指引判断。', hint:'单独投放，避免破损、泄漏；电池要看具体类型，不要把所有电池一概归为有害垃圾。' },
    { id:'black', name:'干垃圾', examples:'用过的餐巾纸、湿纸巾、陶瓷碎片、受污染的纸张等。', description:'除可回收物、有害垃圾、湿垃圾以外的其他生活垃圾。纸巾、湿巾等即使含有纸纤维，也通常按干垃圾投放。', hint:'注意污染和材质：用过的纸巾、湿巾通常投干垃圾；大骨头、硬果壳也不因来自食物就算湿垃圾。' }
  ];
  categories.forEach(c=>['name','examples','description','hint'].forEach(k=>copy('category.'+c.id+'.'+k,c[k],c.name+'·'+({name:'名称',examples:'举例',description:'介绍',hint:'提示'}[k]),'课堂')));
  const lessons = [
    {id:'types',title:'一份剩饭的奇妙旅行',description:'追踪湿垃圾如何经过处理，变成沼气等可利用资源。',eyebrow:'探索一 · 垃圾去哪儿'},
    {id:'prepare',title:'塑料瓶的第二次生命',description:'看看回收物怎样变成再生原料，以及污染为何会影响回收。',eyebrow:'探索二 · 资源循环'},
    {id:'daily',title:'垃圾减量从哪里开始',description:'理解源头减量、重复使用与分类回收之间的关系。',eyebrow:'探索三 · 生活选择'}
  ];
  lessons.forEach(l=>['title','description','eyebrow'].forEach(k=>copy('lesson.'+l.id+'.'+k,l[k],l.title+'·'+({title:'标题',description:'介绍',eyebrow:'标签'}[k]),'课堂')));
  const lessonCards = {
    prepare: [['先看清','先看物品的用途、材质和污染情况，不要只凭名称或是否来自厨房判断类别。'],['沥水去包装','湿垃圾先沥去多余水分，再把塑料袋、餐盒等外包装分开投放。'],['按指引投放','可回收物尽量清洁干燥；有害垃圾单独投放；用过的纸巾、大骨头和硬果壳按干垃圾规则处理。']],
    daily: [['在家里','吃完水果，把果皮与外包装分开收好。'],['在学校','废纸整理好再回收，用过的餐巾纸投干垃圾。'],['出门时','看到分类桶，先看标识，再给垃圾找对家。']]
  };
  Object.entries(lessonCards).forEach(([id,items])=>items.forEach(([title,text],i)=>{copy('lesson.'+id+'.card'+i+'.title',title,lessons.find(l=>l.id===id).title+'·小卡'+(i+1)+'标题','课堂');copy('lesson.'+id+'.card'+i+'.text',text,lessons.find(l=>l.id===id).title+'·小卡'+(i+1)+'正文','课堂');}));
  const economy={gameReward:100,version:1};
  const shop=[
    {id:'leaf-title',type:'title',cost:100,icon:'leaf',color:'mint',name:'绿叶守护者',description:'把环保称号挂在首页问候语旁，记录你的小小行动。'},
    {id:'sky-frame',type:'frame',cost:150,icon:'user',color:'sky',name:'天空蓝头像框',description:'给账户头像换上一圈清爽天蓝，首页也能看见。'},
    {id:'sun-frame',type:'frame',cost:150,icon:'spark',color:'sun',name:'阳光头像框',description:'亮黄色头像框，给每一次环保出发添一点阳光。'},
    {id:'captain-title',type:'title',cost:250,icon:'star',color:'orange',name:'环保小队长',description:'换上小队长称号，邀请更多人一起养成分类习惯。'}
  ];
  shop.forEach(item=>{copy('reward.'+item.id+'.name',item.name,item.name+'·名称','商城');copy('reward.'+item.id+'.description',item.description,item.name+'·介绍','商城')});
  [
    ['nav.shop','商城','商城按钮','顶栏'],['points.label','环保积分','积分名称','商城'],['points.short','积分','首页积分标签','商城'],
    ['points.gameRule','每种游戏首次完成奖励 {points} 积分，重复完成不再发分。','积分获得规则','商城'],['points.claimed','本玩法的首次积分奖励已领取。','积分已领取提示','商城'],['points.gained','本次获得 {points} 积分','完成积分提示','商城'],['points.balance','当前可用 {points} 积分','积分余额提示','商城'],
    ['shop.title','环保积分商城','商城标题','商城'],['shop.subtitle','玩出好习惯，把积分换成你喜欢的环保奖励。','商城介绍','商城'],['shop.all','全部奖励','商城全部筛选','商城'],['shop.owned','我的奖励','商城已兑换筛选','商城'],['shop.earned','累计获得','商城获得统计','商城'],['shop.spent','已兑换使用','商城消耗统计','商城'],['shop.available','可用积分','商城余额统计','商城'],
    ['shop.preview','设计预览积分','商城积分演示标记','商城'],['shop.local','当前为虚拟奖励与本机记录；玩法介绍中的完成预览可演示赚积分和兑换。','商城本机说明','商城'],['shop.price','{points} 积分','商城价格','商城'],['shop.redeem','兑换奖励','商品兑换按钮','商城'],['shop.insufficient','积分不足','积分不足按钮','商城'],['shop.use','使用这份奖励','商品使用按钮','商城'],['shop.active','正在使用','商品已使用按钮','商城'],['shop.ownedTag','已兑换','商品拥有标记','商城'],['shop.titleType','环保称号','称号类型','商城'],['shop.frameType','头像装饰','头像框类型','商城'],['shop.empty','还没有兑换奖励，先去点亮一个游戏徽章吧。','商城空状态','商城'],['shop.returnGames','去看看玩法','商城返回大厅按钮','商城'],
    ['redeem.title','兑换这份环保奖励？','兑换确认标题','商城'],['redeem.description','本次使用 {cost} 积分，兑换后剩余 {balance} 积分。奖励会自动使用。','兑换确认说明','商城'],['redeem.confirm','确认兑换','兑换确认按钮','商城'],['redeem.back','返回商城','兑换返回按钮','商城'],
    ['account.points','我的可用积分','账户积分标签','账户'],['account.rewards','查看我的奖励','账户商城入口','账户'],['account.titleLabel','我的环保称号','账户称号标签','账户'],['account.noTitle','还没有称号，去商城选一个吧。','账户无称号提示','账户'],
    ['history.wallet','积分与兑换','积分记录筛选','历史'],['history.points','首次完成奖励 +{points} 积分','积分获得记录','历史'],['history.redeem','兑换奖励，使用 {points} 积分','积分兑换记录','历史'],['history.equip','换上了这份奖励','奖励使用记录','历史'],
    ['toast.points','徽章已点亮，首次奖励 +{points} 积分！','积分获得提示','系统文案'],['toast.redeemed','兑换成功，奖励已经用上啦！','兑换成功提示','系统文案'],['toast.insufficient','积分不足，先完成其他游戏再来看看吧。','积分不足提示','系统文案'],['toast.owned','这份奖励已经兑换过，不会重复扣分。','重复兑换提示','系统文案'],['toast.equipped','奖励已经换上，回首页看看吧。','奖励使用提示','系统文案']
  ].forEach(args=>copy(...args));
  fields['settings.resetHint'].value='清空游戏徽章，保留积分、已兑换奖励和课堂记录。';
  fields['reset.description'].value='游戏进度会回到 0%，积分、奖励和课堂记录会保留。已领取的首次积分不会再次发放。';
  const api={fields,games,categories,lessons,lessonCards,economy,shop};
  root.EcoContent=api;
  if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
